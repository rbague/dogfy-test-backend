# Dogfy test backend
[![Node.js](https://img.shields.io/badge/Node.js-22.16.0-brightgreen)](https://nodejs.org/en)
[![Typescript](https://img.shields.io/badge/Typescript-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0.10-darkgreen)](https://www.mongodb.com/)
[![CI](https://github.com/rbague/dogfy-test-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/rbague/dogfy-test-backend/actions/workflows/ci.yml)

En este repositorio se encuentra el código propuesto para dar respuesta a la prueba técnica para **Senior Backend Engineer** de Dogfy.

Para ello, se ha desarrollado una REST API usando Node.js (versión LTS) como lenguaje de programación, con [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com/) para el enrutado y procesado de las peticiones HTTP, y [MongoDB](https://www.mongodb.com/) para la persistencia de los datos.
Para el desarrollo de la solución se han seguido los principios de **Domain Driven Design**, separando por módulos las distintas lógicas de la solución, y **arquitectura hexagonal**, añadiendo una capa de abstracción para la comunicación entre los distintos servicios.

En la siguiente imagen se puede ver un diagrama a alto nivel de la arquitectura propuesta:
![arquitectura](/assets/arquitectura.png)

## Configuración
Para la configuración del proyecto, como pueden ser las credenciales para conectar a la base de datos, se hace uso de variables de entorno. En concreto, estas son las que se usan dentro de este proyecto:
| Nombre | Ejemplo | Descripción |
|---|---|---|
| MONGODB_DSN | `mongodb://127.0.0.1:27017/test` | El DSN de conexión hacia la base de datos MongoDB

## Desarrollo
Para levantar el proyecto en local, con todos sus componentes y dependencias, se ha incluido en el repositorio un archivo [Dockerfile](/Dockerfile) con la definición de la imagen del backend, y un archivo [docker-compose.yml](/docker-compose.yml) (con una variante [docker-compose.dev.yml](/docker-compose.dev.yml) para el entorno de desarrollo), donde se combina esa imagen con el resto de dependencias del proyecto.
Para levantarlo en modo desarrollo, se debe ejecutar el siguiente comando:
```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```
> Si quisiéramos levantarlo en producción, eliminaríamos el archivo docker-compose.dev.yml del comando, y proporcionaríamos al servicio la variable de entorno `MONGODB_DSN` con el orquestador que lo ejecute.

### Local
En caso de no usar Docker y querer levantar el entorno en el ordenador local, se deben ejecutar los dos siguientes comandos en paralelo:
```sh
npm run dev # servidor HTTP
npm run dev:schedule # polling de estados
```

## Test
Para realizar las pruebas de código unitario, se ha optado por usar la librería [Jest](https://jestjs.io/), y se pueden ejecutar con el siguiente comando:
```sh
npm run test
```
Además, se ha configurado un [workflow](/.github/workflows/ci.yml) de GitHub Actions que ejecuta la batería de tests con cada nueva PR, para asegurar su correcto funcionamiento.

## Pruebas
Para validar las distintas rutas HTTP definidas en el proyecto y ver cómo se comporta, se puede hacer de dos formas distintas. La primera, [importando](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/#import-postman-data) la [colección](/Dogfy.postman_collection.json) de Postman proporcionada en el mismo repositorio (i.e. [`Dogfy.postman_collection.json`](/Dogfy.postman_collection.json)), que también hace función de documentación, o usando los siguientes ejemplos en `curl` desde la terminal:
```sh
## Generales
# Validar cla onectividad del servicio (para el healthcheck)
curl http://localhost:3000/ping

## Módulo de proveedores (i.e. providers)
# Gestión del webhook del proveedor TLS
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{ "label": "__LABEL__", "status": "__STATUS__" }' http://localhost:3000/providers/webhook/tls

## Módulo de entregas (i.e. delivery)
# Obtener el listado de entregas
curl -H "Accept: application/json" http://localhost:3000/deliveries

# Crear una nueva entrega
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{ "name": "__NAME__" }' http://localhost:3000/deliveries

# Obtener el estado de una entrega
curl -H "Accept: application/json" http://localhost:3000/deliveries/__ID__/status
```
> En todas las peticiones, se deben sustituir los valores entre dos guiones bajos (i.e. `__`), por los valores correctos

### Actualización del estado de las entregas
Cada proveedor actualiza el estado de sus entregas en un formato distinto: una vía llamadas HTTP (webhook) y otra vía *polling* a la API del proveedor.
Para falsear el webhook del proveedor TLS y validar el funcionamiento del procesado de estos datos, se debe enviar la siguiente llamada `curl` a la API:
```sh
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{ "label": "__LABEL__", "status": "__STATUS__" }' http://localhost:3000/providers/webhook/tls
```
> Sustituyendo la variable `__LABEL__` por la etiqueta de la entrega cuyo estado se quiera actualizar, y la variable `__STATUS__` por el nuevo estado de la entrega (el listado de los posibles estados se encuentra [aquí](/src/modules/providers/domain/entity.ts).

En cuanto a la actualización vía polling, si se ha levantado el proyecto usando el entorno de Docker, ya se está ejecutando automáticamente cada hora, en el servicio schedule. En caso de querer probarlo manualmente, se debe ejecutar el siguiente comando:
```sh
npm run dev:schedule # o 'npm run schedule' en el entorno de producción
```
Este comando enviará actualizaciones de estado aleatorias cada hora en punto, según lo definido en el cron.
