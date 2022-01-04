# FrontEnd - Sistema Integral Salud [Ciudadano]

A continuación se muestra la guía para la instalación de la API de Administrador

## Contenido

- [Requisitos](#requisitos)
  - [Software](#1-software)
  - [Sistema Operativo](#2-sistema-operativo)
  - [Cliente API](#3-cliente-api)
- [Instalación de la aplicación](#instalación-de-la-aplicación)
  - [Preparación del servidor](#1-preparación-del-servidor)
    - [Configuración de repositorios Debian](#11-configuración-de-repositorios-debian)
    - [Instalación de Node.js y NPM](#12-instalación-de-nodejs-y-npm)
    - [Instalación y configuración de la aplicación web](#2-instalación-y-configuración-de-la-aplicacion-web)
    - [Clonación del proyecto](#21-clonación-del-proyecto)
  - - [Instalación de módulos](#22-instalación-de-módulos)
    - [Configurar la conexión a la API](#23-configurar-la-conexión-a-la-api)
    - [Ejecutar el proyecto](#29-ejecutar-el-proyecto)
    - ## Requisitos

### 1 Software

| Software | Versión |
| -------- | ------- |
| Node.js  | >=14.x  |
| NPM      | latest  |
| nvm      | lastest |

### 2 Sistema Operativo

El sistema funciona bajo el Sistema Operativo Linux, en su distribución Debian Bullseye o superior, los pasos de instalación y configuración se especifican tomando como base este sistema operativo.

### 3 Cliente

Para la administración en linea sera necesario que el cliente se conecte mediante su navegador a la dirección URL

## Instalación de la aplicación

En esta sección se brinda una serie de pasos a seguir para la instalación del software, como se ha mencionado anteriormente, la instalación se realizará bajo el entorno del Sistema Operativo Linux en sus Distribución Debian Bullseye con una arquitectura de 64-bits.

### 1 Preparación del servidor

A continuación se listan los pasos para la preparación del servidor para entorno de desarrollo o producción.

El sistema puede ser instalado directamente dentro del sistema operativo cumpliendo con los requisitos de software listados en el [apartado 1](#1-software) o puede configurarse a través de docker.

#### 1.1 Configuración de repositorios Debian

Antes de comenzar con la instalación es necesario configurar los repositorios de los cuales se obtendrán los paquetes a instalar, cabe aclarar que si ya se posee repositorios configurados se puede omitir esta sección. Los pasos para la configuración de los repositorios son los siguientes:

1. Abrir una terminal, identificarse como usuario root y editar el archivo sources.list que se encuentra dentro del directorio `/etc/apt/`:

```bash
vim /etc/apt/sources.list # alternativa a vim: nano
```

2. Agregar los repositorios que se listan a continuación:

```bash
##Repositorios del MINSAL para debian stretch.
deb http://debian.salud.gob.sv/debian/ bullseye main contrib non-free
deb-src http://debian.salud.gob.sv/debian/ bullseye main contrib non-free

deb http://debian.salud.gob.sv/debian/ bullseye-updates main contrib non-free
deb-src http://debian.salud.gob.sv/debian/ bullseye-updates main contrib non-free

deb http://debian.salud.gob.sv/debian-security/ bullseye-security main contrib non-free
deb-src http://debian.salud.gob.sv/debian-security/ bullseye-security main contrib non-free
```

3. Actualizar la lista de paquetes de los repositorios.

```bash
aptitude update
```

Una vez hecho lo anterior ya se tienen los repositorios actualizados y con ello se puede proceder con la instalación de los paquetes necesarios para la instalación de la API.

#### 1.2 Instalación de Node.js y NPM

Debido a que las versiones de Node.js cambian con mucha rapidez se recomienda instalarlo a través de un administrador de versiones como **nvm**, para su instalación seguir los pasos detallados en el siguiente enlace: [**Click aquí**](https://github.com/nvm-sh/nvm#installing-and-updating).

Ejecutar desde la terminal el siguiente comando:

```bash
# instalación de node.js y npm
nvm install --lts

# verificación de versiones instaladas
node -v
npm -v
```

### 2 Instalación y configuración de la aplicacion web

A continuación se listan los pasos para la instalación y configuración de la aplicación:

#### 2.1 Clonación del proyecto

Clonar el proyecto desde los repositorios oficiales ejecutando el siguiente comando:

```bash
git clone git@codigo.salud.gob.sv:plantillas/front-admin.git
```

#### 2.2 Instalación de módulos

Instalar los módulos ejecutando el siguiente comando:

```bash
npm install
```

#### 2.3 Configurar la conexión a la API

Si no se tiene creada la base de datos, debe ser creada. Se debe especificar en el archivo **`.env`** los datos de la conexión a la API:

Crear el archivo **.env** desde el directorio raíz del proyecto ejecutando el siguiente comando

```bash
cp .env .env.local
```

Editar la siguiente las siguientes líneas del archivo **.env.local**

```bash
###> api/config ###
VUE_APP_API_URL=http://localhost/
###< api/config ###
```

#### 2.4 Ejecutar el proyecto

Para levatnar y ejecutar el proyecto utilizaremos node.js, para ello será necesario ejecutar el siguiente comando en el directorio raíz del proyecto

```bash
npm run build
```
