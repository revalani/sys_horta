# hortas
Projeto pra consultoria em agricultura

sensoriamento das estufas
transmição e armazenagem dos dados
vizualização e gerenciamento no browser

no momento há todos essas partes nesse repositorio

<h1> Instalando </h1>

configurando ambiente:
    
     instale virtualenv:
        win: pip install virtualenv
        lix: sudo apt install virtualenv

    defina p ambiente virtualenv 
        virtualenv .ENV  // cria uma virtualização na parta

    inicie o virtualenv
        win: start ..\horta\Scripts\activate.bat
        lix: source ..\Scripts\activate



    instale os modulos Py
    pip install Flask // BSD 3-Clause "New" or "Revised" License
    pip install flask-bootstrap // ainda sem uso 
    pip install mysql-connector
    pip install pyserial


iniciando o servidor flask: 
    start ..\horta\servidor\py app.py




paleta de cor green   
    https://material.io/design/color/the-color-system.html#tools-for-picking-colors
    https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=4caf4f&secondary.color=00BFA5


<!-- EXTRAS              -->
graficos:
http://gionkunz.github.io/chartist-js/index.html // MIT
chartjs.io


arduino linux 
    https://arduino.stackexchange.com/questions/21215/first-time-set-up-permission-denied-to-usb-port-ubuntu-14-04