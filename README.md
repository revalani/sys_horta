# hortas
Projeto pra consultoria em agricultura

sensoriamento das estufas
transmição e armazenagem dos dados
vizualização e gerenciamento no browser

no momento há todos essas partes nesse repositorio


pastas fazem parte do virtualização do ambiente:
    include
    Lib
    Scripts
    tcl

<h1> Instalando </h1>

configurando ambiente:
    Ambiente Virtual de isolamento
    ref: https://pythonacademy.com.br/blog/python-e-virtualenv-como-programar-em-ambientes-virtuais

    instale virtualenv:
        pip install virtualenv

    defina p ambiente virtualenv 
        virtualenv .  // cria uma virtualização na parta

    inicie o virtualenv
        win: start ..\horta\Scripts\activate
            

    instale os modulos Py
    pip install Flask

iniciando o servidor flask: 
    start ..\horta\servidor\py app.py

