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

Eliminar producto de un carrito:

DELETE http://localhost:8080/api/carts/64f63e0e204b88b11d732953/products/64f516447f20b224b63c83d5

Actualizar todo el carrito con un nuevo arreglo de productos:

POST http://localhost:8080/api/carts/64f63e0e204b88b11d732953

        Body ejemplo:
            {
                    "products": [
                    {
                        "product": "64fdb8a9c69513ebcf9abf2d",
                        "quantity": 3
                    },
                    {
                        "product": "64f5165d7f20b224b63c83da",
                        "quantity": 2
                    },
                    {
                        "product": "64f5170c7f20b224b63c83e4",
                        "quantity": 7
                    }
                ]
            }

Actualizar la cantidad de ejemplares de un producto en un carrito:

POST http://localhost:8080/api/carts/64f63e0e204b88b11d732953/products/64fdb8a9c69513ebcf9abf2d

        Body ejemplo:
            {
                "quantity": 2
            }

Eliminar todos los productos de un carrito:

DELETE http://localhost:8080/api/carts/64f63e0e204b88b11d732953

## Ver todos los productos:

GET http://localhost:8080/products

## Chat:

GET http://localhost:8080/
