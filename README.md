# Segunda pre entrega:

Profesionalizando la BD

## Instrucciones:

Instalar dependencias: npm i

Ejecutar: npm start

## Ejemplos (products):

Listar productos:

GET http://localhost:8080/api/products

Listar productos (con limit):

GET http://localhost:8080/api/products?limit=3

Listar productos (con limit, page, query):

GET http://localhost:8080/api/products?limit=10&page=1&query=cat1

Listar productos (con sort 'asc' o 'desc' por precio):

GET http://localhost:8080/api/products?limit=10&page=1&query=cat1&sort=desc

Listar productos disponibles (con query=available):

http://localhost:8080/api/products?limit=10&query=available&sort=desc

Listar un producto específico:

GET http://localhost:8080/api/products/64f516447f20b224b63c83d5

Agregar un producto:

POST http://localhost:8080/api/products

        Body ejemplo:
            {
                "title": "producto",
                "description": "descripcion del producto",
                "category": "cat1",
                "price": 200,
                "code": "abc102",
                "stock": 10,
                "thumbnails": ["img1.jpg", "img2.jpg", "img3.jpg"]
            }

Actualizar un producto específico:

PUT http://localhost:8080/api/products/64f516447f20b224b63c83d5

        Body ejemplo:
            {
                "title": "producto",
                "description": "descripcion del producto",
                "category": "cat1",
                "price": 100,
                "code": "abc104",
                "stock": 10,
                "thumbnails": ["img1.jpg", "img2.jpg", "img3.jpg"]
            }

Eliminar un producto:

DELETE http://localhost:8080/api/products/64f516447f20b224b63c83d5

## Ejemplos (carts):

Crear un nuevo carrito:

POST http://localhost:8080/api/carts

Listar los productos de un carrito específico:

GET http://localhost:8080/api/carts/64f63e0e204b88b11d732953

Agregar producto a un carrito:

POST http://localhost:8080/api/carts/64f63e0e204b88b11d732953/product/64f516447f20b224b63c83d5

        Body ejemplo:
            {
                "quantity": 8
            }

## Chat:

GET http://localhost:8080/
