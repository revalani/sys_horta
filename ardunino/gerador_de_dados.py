"""
teoricamente deveria ler entrada serial USB e levar ao DB
https://pythonhosted.org/pyserial/

import serial
ser = serial.Serial('/dev/ttyUSB0')     
ser.write(b'hello')     # write a string
"""

import random
import time
import json
import ast
import sys
from datetime import datetime, timedelta

from BancodeDados import BancodeDados as bd

# sys.path.append("~/testes/essenciais/BancodeDados.py")

# from ..essenciais import BancodeDados as bd
# from .essenciais import BancodeDados as bd
# from BancodeDados import BancodeDados as bd


def geradorDadoSensor(qtds, arquivo):

    f = open(arquivo, "w")
    x = qtds
    for x in range(qtds):
        temp = (random.randint(-100, 200)+300)/10
        umi = random.randint(-15, 15)+80
        lux = random.randint(-1800, 1800)+14000
        co2 = random.randint(-300, 300)+1000
        x = x-1
        linha = {'e': 1, 't': temp, 'u': umi, 'l': lux, 'c': co2}

        # linha = {'e':1,'t':temp}
        # print(str(linha))
        f.write(str(linha)+'\n')

    f.close()


def insertSensorBanco(arquivo):
    delete = "DELETE FROM `estufa_dado`"
    mycursor.execute(delete)
    mycursor.commit()

    sql = "INSERT INTO `estufa_dado`(`id_estufa`, `tipo_sensor`, `dado_sensor`, `datatime`) VALUES (%s,%s,%s,%s)"
    incersoes = []
    a = datetime(2020, 1, 1, 6, 0, 0, 0)

    extencao = {'e': 'estufa', 't': 'termometro',
                'u': 'umidade_ar', 'c': 'carbono_ar', 'l': 'luximetro'}

    incercao = []

    with open('dados.txt') as arquivo:
        for linha in arquivo:
            aux = linha.strip()

            # o divino atuou aqui para transformar str em dict
            aux = (ast.literal_eval(aux))

            estufa = aux['e']
            for x, y in aux.items():
                if x != 'e':
                    incercao.append((estufa, extencao[x], y, a))

            a = a + timedelta(seconds=90)

    incersoes = tuple(incercao)
    # print(incersoes)
    mycursor.executemany(sql, incersoes)
    mycursor.commit()

    print("dados gerados por geradorDadoSensor")


def liveData():
    sql = "INSERT INTO `estufa_dado`(`id_estufa`, `tipo_sensor`, `dado_sensor`, `datatime`) VALUES (%s,%s,%s,%s)"
    hora = datetime(2020, 2, 1, 6, 0, 0, 0)

    while True:
        time.sleep(1)
        hora = (hora+timedelta(seconds=1))
        incersoes = []

        for y in {1, 2, 3, 4, 5}:
            incersoes.append(
                (y, 'termometro', (random.randint(-100, 200)+300)/10, hora))
            incersoes.append(
                (y, 'umidade_ar', random.randint(-15, 15)+80, hora))
            incersoes.append(
                (y, 'luximetro', random.randint(-1800, 1800)+14000, hora))
            incersoes.append((y, 'co2', random.randint(-300, 300)+1000, hora))

        mycursor.executemany(sql, incersoes)
        mycursor.commit()

        print("Novo dado: "+str(hora))


mycursor = BancodeDados()

# arquivo = "dados.txt"
# geradorDadoSensor(6000, "dados.txt")
# insertSensorBanco(arquivo)

# liveData()
