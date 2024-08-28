# Manejo de inventario, clientes y ventas de una tienda

El proyecto desarrollado consiste en la administración de una tienda mediante microservicios, 3 para ser específicos:

- Microservicio de Productos
- Microservicio de Clientes 
- Microservicio de Ventas

Cada microservicio tiene su base de datos, elegimos para las 3 bases de datos MongoDB.
## Proceso para ejecutar el programa

- Primero necesitas clonar el repositorio con el siguiente comando en CMD

```bash
  git clone https://github.com/RansilvaV29/tienda_con_microservicios.git
```

- Despues vamos a levantar el docker-compose donde estan dockerizados los microservicios

```bash
    docker-compose up
```

- En otra CLI abrimos la carpeta para el frontend y descargamos las dependendecias

```bash
    cd frontend
    npm i
```

- ya por ultimo ejecutamos el proyecto

```bash
    npm start
```
