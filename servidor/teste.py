# import mysql.connector


q = 'select * from estufa_dado'


# bd = mysql.connector.connect(
#             host="localhost",
#             user="root",
#             passwd="",
#             database="s_horte"
#         )
# cursor = bd.cursor()
# cursor.execute(q)

# res = (cursor.fetchall())
# def func(a: int) -> List[int]:
#     pass
def func(res: int, a = 0 :float ) -> float: 
    """" asd asd
    """return res*7*a

print(func())
func()