def fortamaConsulta(linha):
    """
    devido a ter problemas nas consultas(os campos com strings estão vindo em byte) auxilia nessa resolver isso

    input: tuplas contendo string em bytes > {b'aasdsd'}
    output: tupla com strings "limpas" > {aasdsd}
    """

    lista = []
    for x in linha:
        aux = []
        for y in x:
            if type(y) == bytes:
                y = y.decode()
            aux.append(y)
        lista.append(aux)
        # print(aux)
    # print(lista)
    return lista