# hortas
Projeto pra consultoria em agricultura

sensoriamento das estufas
transmição e armazenagem dos dados
vizualização e gerenciamento no browser

no momento há todos essas partes nesse repositorio

<h1> Instalando </h1>

configurando ambiente:
    copiar diretorio ( instalar git):
        git clone https://github.com/revalani/hortas.git

     instale virtualenv:,,
        win: pip install virtualenv
        lixm pip install virtualenv

    defina p ambiente virtualenv 
        virtualenv .  // cria uma virtualização na pasta

    bd mariaDB(my_sql)
        linux
            sudo apt-get update
            sudo apt-get install mariadb-server-10.0
            
        mysql -u username -p database_name < file.sql

    inicie o virtualenv
        win: start .\Scripts\activate.bat
        lix: source .\bin\activate

    instale os modulos Py
        pip install Flask 
        pip install mysql-connector

        pip install flask-bootstrap // ainda sem uso 
        pip install pyserial



iniciando o servidor flask: 
    start (activate virtualenv) .\horta\servidor\py app.py
    start   .\horta\servidor\py app.py




paleta de cor green   
    https://material.io/design/color/the-color-system.html#tools-for-picking-colors
    https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=4caf4f&secondary.color=00BFA5


<!-- EXTRAS              -->
graficos:
http://gionkunz.github.io/chartist-js/index.html // MIT
chartjs.io


arduino linux 
    https://arduino.stackexchange.com/questions/21215/first-time-set-up-permission-denied-to-usb-port-ubuntu-14-04

