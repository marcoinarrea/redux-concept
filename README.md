# __Creación de un proyecto con TypeScript__

## Índice

1. Utilizar TypeScript
    1. Instalar TypeScript
    2. Configurar TypeScript
    3. Compilar el proyecto
    4. Trabajar en modo desarrollo
2. Controlar la calidad del código
    1. Instalar TSLint
    2. Configurar TSLint
    3. Añadir la extensión TSLint al editor de código
    4. Utilizar la guía de estilo de Airbnb
3. Utilizar gts (Google TypeScript Style) [en versión beta]
4. Utilizar ts-node

***

## __1. Utilizar TypeScript__

### __1.1. Instalar TypeScript__

En primer lugar, vamos a descargar TypeScript como dependencia local del proyecto.

``` bash
> npm i -D typescript
```

### __1.2. Configurar TypeScript__

TypeScript trae consigo dos binarios: __tsc__ y __tsserver__. __tsc__ es el compilador de TypeScript. Para inicializar un proyecto TypeScript usar el flag __--init:__

``` bash
> ./node_modules/.bin/tsc --init
```

Si nuestra versión de __npm__ es superior a la 5.2, se puede hacer uso de la herramienta __npx__ para ejecutar binarios dentro de __./node_modules/.bin/__.

``` bash
> npx tsc --init
```

Como resultado de ejecutar el comando anterior se creará el fichero __tsconfig.json__ en el directorio raíz de nuestro proyecto. Este fichero permite configurar el compilador __tsc.__ Editaremos dicho fichero para que quede de la siguiente manera:

``` json
{
  "files": [
    "src/index.ts"
  ],
  "include": [
    "src/**/*.ts"
  ],
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "removeComments": true,
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "*": [
        "node_modules/@types/*",
        "./src/types/*"
      ]
    },
    "typeRoots": [ "node_modules/@types" ]
  }
}
```

### __1.3. Compilar el proyecto__

Independientemente de si nuestro proyecto se va a ejecutar en un cliente web o del lado del servidor (Node.js), será necesario compilarlo. Para ello, una vez hayamos indicado nuestras preferencias de compilación en el fichero __tsconfig.json,__ basta con ejecutar el compilador __tsc.__

``` bash
> npx tsc
```

### __1.4. Trabajar en modo desarrollo__

A fin de no tener que recompilar explícitamente nuestro proyecto cada vez que modifiquemos el código, se puede ejecutar el compilador en _watch mode_ para que compile cada vez que detecte un cambio.

``` bash
> npx tsc -w
```

## __2. Controlar la calidad del código__

Con el fin de escribir mejor código y de controlar el estilo del código del equipo, vamos a utilizar el linter __TSLint__ junto a la guía de estilos de __Airbnb__ (_Airbnb style-guide for tslint_).

### __2.1. Instalar TSLint__

Vamos a descargar TSLint como dependencia local del proyecto.

``` bash
> npm i -D tslint
```

### __2.2. Configurar TSLint__

Para inicializar la configuración de TSLint usaremos el flag __--init:__

``` bash
> npx tslint --init
```

Como resultado de ejecutar el comando anterior se creará el fichero __tslint.json__ en el directorio raíz de nuestro proyecto. Este fichero permite configurar el linter __tslint.__

### __2.3. Añadir la extensión TSLint al editor de código__

Si queremos ver la información que ofrece el linter mientras escribimos código es necesario añadir a nuestro editor de código* la extensión __TSLint.__ Una vez que añadamos la extensión a nuestro editor necesitaremos recargarlo.

_*Se recomienda el uso de Visual Studio Code._

### __2.4. Utilizar la guía de estilo de Airbnb__

Añadir reglas manualmente al fichero de configuración del linter, __tslint.json__, es laborioso. Lo más habitual es reutilizar configuraciones conocidas y ampliamente aceptadas como la creada por Airbnb.

Para poder utilizar la guía de estilo de Airbnb primero debemos descargarla como dependencia local del proyecto.

``` bash
> npm i -D tslint-config-airbnb
```

Una vez descargada la guía de estilo, debemos dejar el fichero __tslint.json__ como se muestra a continuación:

``` json
{
    "defaultSeverity": "error",
    "extends": "tslint-config-airbnb",
    "jsRules": {},
    "rules": {
        "eofline": false
    },
    "rulesDirectory": []
}
```

Es habitual utilizar la extensión __Prettier__ como complemento a __TSLint__. En ese caso debemos descargar __tslint-config-prettier__ y editar el fichero __tslint.json__ como se muestra a continuación.

``` bash
npm i -D tslint-config-prettier
```

``` json
{
  "defaultSeverity": "error",
  "extends": [
    "tslint-config-airbnb",
    "tslint-config-prettier"
  ],
  "jsRules": {},
  "rules": {
    "eofline": false
  },
  "rulesDirectory": []
}
```

## __3. Utilizar gts (Google TypeScript Style) [en versión beta]__

Como acabamos de ver, para trabajar con TypeScript necesitamos configurar adecuadamente el fichero __tsconfig.json__ y es muy recomendable instalar __tslint__, lo cual implica configurar adecuadamente el fichero __tslint.json__. Google ha creado el proyecto __gts__ para automatizar la instalación y configuración de TypeScript y de TSLint junto a su guía de estilo.

Para utilizar __gts__ lo primero que debemos hacer es descargarlo como una dependencia local:

``` bash
> npm i -D gts typescript@2.x
```

Una vez descargado, podremos inicializar un proyecto con TypeScript ejecutando el siguiente comando*:

``` bash
> npx gts init
```

_*El comando anterior genera el fichero __package.json__ en caso de que no exista._

Para que __tslint__ funcione con el editor, necesitaríamos añadir manualmente el siguiente fichero __tslint.json__ a nuestro directorio raíz:

``` json
{
  "defaultSeverity": "error",
  "extends": [
    "./node_modules/gts/tslint.json"
  ],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}
```

## __4. Utilizar ts-node__

En caso de que estemos desarrollando un proyecto en Node.js, necesitaríamos compilar el proyecto antes de poder ejecutarlo. Cada vez que efectuásemos un cambio en el código necesitaríamos recompilar el proyecto antes de volver a ejecutarlo. Existe una herramienta, __ts-node,__ que permite ejecutar directamente el código TypeScript.

Para poder utilizar __ts-node__ primero debemos descargarlo como una dependencia local:

``` bash
> npm i -D ts-node
```

Una vez descargado, podremos ejecutar nuestro proyecto con la siguiente instrucción:

``` bash
> npx ts-node ./src/index.ts
```