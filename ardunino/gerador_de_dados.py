"""
teoricamente deveria ler entrada serial USB e levar ao DB
https://pythonhosted.org/pyserial/

import serial
ser = serial.Serial('/dev/ttyUSB0')     
ser.write(b'hello')     # write a string
"""

import random
import time
import serial
import json
import ast
import sys
from datetime import datetime, timedelta

from BancodeDados import BancodeDados as bd


def geradorDadoSensor(qtds, arquivo):

    f = open(arquivo, "w")
    x = qtds
    for x in range(qtds):
        temp = (random.randint(-100, 200)+300)/10
        umi = random.randint(-15, 15)+80
        lux = random.randint(-1800, 1800)+14000
        x = x-1
        linha = {'e': 1, 't': temp, 'u': umi, 'l': lux}

        # linha = {'e':1,'t':temp}
        # print(str(linha))
        f.write(str(linha)+'\n')

    f.close()


def insertSensorBanco(arquivo):
    # delete = "DELETE FROM `estufa_dado`"
    # mycursor.execute(delete)
    # mycursor.commit()

    sql = "INSERT INTO `estufa_dado`(`id_estufa`, `tipo_sensor`, `dado_sensor`, `datatime`) VALUES (%s,%s,%s,%s)"
    insercao = []
    a = datetime(2020, 1, 1, 0, 0, 0, 0)

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

    insercao = tuple(incercao)
    # print(insercao)
    mycursor.executemany(sql, insercao)
    mycursor.commit()

    print("dados gerados por geradorDadoSensor")


def liveData():
    sql = "INSERT INTO `estufa_dado`(`id_estufa`, `tipo_sensor`, `dado_sensor`, `datatime`) VALUES (%s,%s,%s,%s)"
    hora = datetime.now()

    while True:
        time.sleep(2)
        hora = datetime.now()
        # hora = (hora+timedelta(seconds=1))
        insercao = []

        for y in {1, 2, 3, 4, 5}:

            if y in {4, 5}:
                insercao.append((y, 'termometro', 0))
                insercao.append((y, 'umidade_ar', 0))
                insercao.append((y, 'luximetro', 0))
                insercao.append((y, 'co2', 0))

            elif y in {2}:
                insercao.append(
                    (y, 'termometro', (random.randint(-10, 200)+300)/4))
                insercao.append(
                    (y, 'umidade_ar', random.randint(-15, 15)+80))
                insercao.append(
                    (y, 'luximetro', random.randint(-1800, 1800)+14000))
                insercao.append(
                    (y, 'co2', random.randint(-300, 300)+1000))

            else:
                insercao.append(
                    (y, 'termometro', (random.randint(-100, 200)+300)/10))
                insercao.append(
                    (y, 'umidade_ar', random.randint(-15, 15)+80))
                insercao.append(
                    (y, 'luximetro', random.randint(-1800, 1800)+14000))
                insercao.append(
                    (y, 'co2', random.randint(-300, 300)+1000))

        mycursor.executemany(sql, insercao)
        mycursor.commit()

        print("Novo dado: "+str(hora))


def inserir_arduino_banco(entrada: dict):

    sql = "INSERT INTO `estufa_dado`(`id_estufa`, `tipo_sensor`, `dado_sensor`) VALUES (%s,%s,%s)"

    extencao = {'e': 'estufa', 't': 'termometro',
                'u': 'umidade_ar', 'c': 'carbono_ar', 'l': 'luximetro'}

    insercao = []

    aux = entrada.strip()

    # o divino atuou aqui para transformar str em dict
    aux = (ast.literal_eval(entrada))

    for x, y in aux.items():
        if x != 'e':
            insercao.append((aux['e'], extencao[x], y))

    erro = {2}
    for y in {2, 3, 4, 5}:

        if y in {4, 5}:
            insercao.append((y, 'termometro', 0))
            insercao.append((y, 'umidade_ar', 0))
            insercao.append((y, 'luximetro', 0))
            insercao.append((y, 'co2', 0))

        elif y in erro:
            insercao.append(
                (y, 'termometro', (random.randint(-100, 200)+300)/10))
            insercao.append(
                (y, 'umidade_ar', random.randint(-15, 15)+80))
            insercao.append(
                (y, 'luximetro', random.randint(-180, 180)+140))
            insercao.append(
                (y, 'co2', random.randint(-300, 300)+1000))

        else:
            insercao.append(
                (y, 'termometro', (random.randint(-100, 200)+300)/10))
            insercao.append(
                (y, 'umidade_ar', random.randint(-15, 15)+80))
            insercao.append(
                (y, 'luximetro', random.randint(-1800, 1800)+14000))
            insercao.append(
                (y, 'co2', random.randint(-300, 300)+1000))

    insercao = tuple(insercao)
    # print(insercao)
    mycursor.executemany(sql, insercao)
    mycursor.commit()


def ler_serial():
    ser = serial.Serial('COM5', 9600, timeout=0)
    # ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=0)

    while 1:
        try:
            entrada = (ser.readline().decode())
            print(entrada)
            if entrada != '':
                inserir_arduino_banco(entrada)
            time.sleep(1)

        except ser.SerialException:
            print('erro na leitura serial')
            time.sleep(1)


mycursor = bd()

# arquivo = "dados.txt"
# geradorDadoSensor(2000, "dados.txt")
# insertSensorBanco(arquivo)
ler_serial()
# liveData()
