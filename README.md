# Sys horta :seedling: :herb:

**Projeto pra consultoria em agricultura**
- sensoriamento das estufas
- transmissão e armazenagem dos dados
- visualização e gerenciamento no browser
- *propor insight, reparos e auxilio para o operador*

### Instalando ambiente :computer:
- configurando ambiente:
  - `git clone https://github.com/revalani/sys_horta.git`

- instale [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html):
  - win: `pip install virtualenv`
  - lin: `python3 -m virtualenv`
  
- inicie o ambiente virtual :gear:
	- `virtualenv .` **ou** `python3 virtualenv .`  

- bd mariaDB( MySQL) [tutorial](https://linuxize.com/post/how-to-install-mariadb-on-ubuntu-18-04/) 
Linux:
	- `sudo apt-get update`
	- `sudo apt-get install mariadb-server`
	- `sudo systemctl status mariadb` //inicial automaticamente
	- `sudo mysql_secure_installation` // 
	- `mysql -u root -p < bd.sql` //importa o BD

### instalando dependencias :file_folder:
- inicie o virtualenv
   - win: `start .\Scripts\activate.bat`
    - lin: `source .\bin\activate`
- instale os modulos Py
  - `pip install Flask`
  - `pip install mysql-connector`
  - `pip install mysql-connector-python`
  - `pip install pyserial`
  - `pip install flask-bootstrap` // ainda sem uso  

- :rocket: iniciando o servidor flask (dentro da virtualização):
  - win :`start init.bat`
  - lin:  `./init.sh`

## referencias 
paleta de cor verde: #66bb6a
- https://material.io/design/color/the-color-system.html#tools-for-picking-colors
- https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=4caf4f&secondary.color=00BFA5`

design de referencia:
- [material.io](https://material.io/)
  -	[https://material.io/develop/web/](https://material.io/develop/web/)
  -	[https://github.com/material-components/material-components-web](https://github.com/material-components/material-components-web)
- [Design Fluent](https://www.microsoft.com/design/fluent/)
   - https://www.microsoft.com/design/fluent/#/web

 https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/



<<<<<<< HEAD
## kanban Sys_horta
=======
## kanban
>>>>>>> 1ef7440e4b4ca527a6b54a9509bbe49ab142751a

#### pendentes
- Site comercial 
    - hospedagem
    - WordPress
    - [slick-slide](https://kenwheeler.github.io/slick/)
 
- Operacional
   - parametros do sistema
      - cpu, energia?, memoria
	- forms de ADM
		- estufa
		- sensor
	- dados gerais
	- mostradores
	- alertas
	- indicadores
	- modularizar interface:
	   - facilita manutenção e teste 

- Padrão
	- organizando
		- estruturas de dados: dicionario
	- Flask-bootstrap
	- modularizar
	- PYdronizando arquitetura do flask
	  - blueprints
	- flask factory de mysql pra SQLAlchemy

- Visual
  - refazer
  - ver dinamica 
  - datapiker decente >> https://uxsolutions.github.io/bootstrap-datepicker/
  - graficos
	 - graficos para relatorio: mesclar temperatura, humidade e pressao ( tipo grafico meteorologico)
			colocar curva modelo ou curva comparatoria com o clime local
	- d3.js
	-	https://wattenberger.com/blog/d3#intro
				https://c3js.org/gettingstarted.html

- RPI
	- ssh
	- arquivos de automação e configuração
		- atualizar readme 
	- fazer um imagem do sistema

- Banco
  - rotina 
      - médias por periodos| economia de dado & processo
				http://www.bosontreinamentos.com.br/mysql/mysql-rotinas-armazenadas-funcoes-create-function-33/
				https://www.devmedia.com.br/stored-procedures-e-functions-no-mysql-com-phpmyadmin/30837
				https://ilovecode.com.br/conheca-algumas-rotinas-que-facilitam-nosso-desenvolvimento-no-mysql/
  - repensar nas tabelas
    - estufa_dados: uma linha para todos sensores {'e': 1, 't': 27.8, 'u': 79, 'l': 14537, 'c': 835} > uma linha no bd
    - tabela delta
		
- Erros
	- consulta 'media/hora' do painel esta com erro na media
		erro timezone do timestamp no update dos dados de sensor 

### fazendo 
<<<<<<< HEAD
- Site comercial 
    - WordPress
- RPI
- Padrão
- Visual
- Banco
- Operacional
- Erros
- Operacional
=======

>>>>>>> 1ef7440e4b4ca527a6b54a9509bbe49ab142751a

### feito	
- grafico e periodos de exibição
  - grafico horarios(corrigir) modos: hora,dia, semana, mes
-	modal do 'ver mais'
-	ler serial com py
-	conosulta para dashbord: media dados
-	CRUD com flask
-	modelo ER
-	BD
-	env no ubunto

- Operacional
  -	documentação parcial
  -	idle arduino

- RPI
	- wifi
	- dns

- Padrão

- Visual

- Banco

- Site Comercial

- Operacional

- Erros
<<<<<<< HEAD
=======

>>>>>>> 1ef7440e4b4ca527a6b54a9509bbe49ab142751a

