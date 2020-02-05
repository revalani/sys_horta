import mysql.connector


class BancodeDados():

    def __init__(self):
        self.banco = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database="s_horte"
        )
        self.cursor = self.banco.cursor()

    def ping(self):
        return self.banco.ping()

    def commit(self):
        return self.banco.commit()

    def execute(self, sql, *params):
        self.cursor.execute(sql, params)
        # return self.commit()

    def executemany(self, sql, params):
        self.cursor.executemany(sql, params)
        # return self.commit()

    def fetchall(self):
        return self.cursor.fetchall()


# bas = BancodeDados()
# print(bas.ping())

# bas.execute("SELECT * FROM `estufa_sensores` ORDER BY `tipo_sensor` ASC")
# res = bas.fetchall()
# print(res)
