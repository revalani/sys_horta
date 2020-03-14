from flask import Flask, render_template, request, jsonify, json

from extencoes.BancodeDados import BancodeDados as bd
from extencoes.defs import *

app = Flask(__name__)


# rotas de acesso
@app.route("/")
def main():
    return render_template("main.html", titulo="Painel de Controle")


@app.route("/graficos")
def graficos():
    return render_template("graficos.html", titulo="Graficos")

# #arduino
# @app.cli.command()
# def arduino():


# API
@app.route('/consulta/<consulta>', methods=['GET', 'POST'])
def consulta(consulta):
    cursor = bd()
    cursor.execute(consulta)

    res = (cursor.fetchall())
    res = fortamaConsulta(res)

    # print(res)
    # for y in res:
    #     print(y)
    #     for x in y:
    #         print(x)
    return jsonify(res)


@app.route('/status_estufas/<estufa>', methods=['GET'])
def statos_estufas(estufa):
    cursor = bd()

    # estufas
    #
    #  media esta retornando com problemas
    #
    #
    cursor.execute("SELECT estufa.id_estufa, estufa.cultura, estufa.estatus, estufa_dado.tipo_sensor, estufa_dado.datatime, ROUND( AVG(estufa_dado.dado_sensor), 2 ) AS 'dado/hora' FROM estufa_dado, estufa WHERE estufa.id_estufa = estufa_dado.id_estufa AND estufa.id_estufa = '" +
                   estufa+"' AND estufa_dado.datatime =( SELECT MAX(estufa_dado.datatime) FROM `estufa_dado` WHERE estufa.id_estufa='" +
                   estufa+"') GROUP BY estufa_dado.tipo_sensor")


    resposta = cursor.fetchall()
    resposta = fortamaConsulta(resposta)
    print(resposta)
    return jsonify(resposta)


@app.route('/qlive/', methods=['GET'])
def qlive():
    cursor = bd()

    # estufas
    cursor.execute("select id_estufa, cultura from estufa")
    estufa = fortamaConsulta(cursor.fetchall())

    # #varviação paradrão
    """ 
    proponho uma logica diferente para indicar avisos ... pense melhor
    """
    # cursor.execute("select id_estufa, tipo_sensor, valor_padrao, variacao_padrao from estufa_sensores")
    # estufa_sensores = fortamaConsulta(cursor.fetchall())

    dados = []
    for x in estufa:
        cursor.execute(
            "SELECT tipo_sensor,dado_sensor,datatime FROM `estufa_dado` WHERE datatime = (SELECT MAX(datatime) FROM `estufa_dado`)  and id_estufa ="+str(x[0]))

        # contruindo request
        n_estufa = x[0]
        aux = (cursor.fetchall())
        # print(aux)
        aux = fortamaConsulta(aux)
        if aux == []:
            continue
        dados.append({'estufa': n_estufa,
                      'cultura': x[1],
                      'termometro': aux[0][1],
                      'umidade_ar': aux[1][1],
                      'luximetro': aux[2][1],
                      #   'co2': aux[3][1]
                      })

    return jsonify(dados)


@app.route('/qgrafco/', methods=['get', 'post'])
def qgrafco():
    a = (request.data).decode()
    a = json.loads(a)

    estufa = a['estufa']
    tipo_sensor = a['sensor']
    data = a['data']
    # estufa = '1'
    # tipo_sensor = 'termometro'
    # data = '2020-01-01'
    print(data)

    query = "SELECT id_estufa, tipo_sensor, ROUND(AVG(dado_sensor), 2) AS 'dado/hora', datatime FROM `estufa_dado` WHERE id_estufa ="+estufa+" and tipo_sensor = '"+tipo_sensor + \
        "' AND datatime between '"+data+" 00-00-00' and '"+data + \
            " 23-59-59' GROUP BY DATE(datatime), HOUR(datatime) ORDER BY `estufa_dado`.`datatime` ASC"

    cursor = bd()
    cursor.execute(query)
    aux = (cursor.fetchall())
    aux = fortamaConsulta(aux)
    # print(aux[1])

    return jsonify(aux)


if __name__ == "__main__":

    app.run(debug=True)
