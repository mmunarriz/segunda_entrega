import { Router } from 'express';
import Carts from '../dao/dbManagers/carts.js';
import Products from '../dao/dbManagers/products.js';

const cartsManager = new Carts();
const productsManager = new Products();
const router = Router();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCarrito = { products: [] };

        // Guardar el nuevo carrito en la base de datos
        const result = await cartsManager.saveCart(newCarrito);

        res.status(200).send({ message: "Carrito agregado exitosamente", newCarritoId: result._id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Listar los productos de un carrito específico
router.get("/:cid", async (req, res) => {
    try {
        // Obtener el ID del carrito de los params de la ruta
        const cid = req.params.cid; // El ID se recibe como string

        // Obtener el carrito por su ID desde la base de datos
        const carrito = await cartsManager.getCartById(cid);

        // Si el carrito existe lo devuelve, si no devuelve un mensaje de error
        if (carrito) {
            res.status(200).send(carrito);
        } else {
            res.status(404).send({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Agregar producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        // Obtener el ID del producto y del carrito de los parámetros de la ruta
        const productId = req.params.pid;
        const carritoId = req.params.cid;

        // Verificar si el producto existe
        const existingProduct = await productsManager.getProductById(productId);

        if (!existingProduct) {
            return res.status(404).send({ message: "Producto inexistente" });
        }

        // Obtener la cantidad del producto
        const { quantity } = req.body;

        // Obtener el carrito por su ID desde la base de datos
        const carrito = await cartsManager.getCartById(carritoId);

        if (!carrito) {
            return res.status(404).send({ message: "Carrito no encontrado" });
        }

        // Agregar un nuevo objeto de producto al arreglo "products" dentro del carrito
        // Verificar si el producto ya existe en el carrito
        const existingProductInCart = carrito.products.find(prod => prod.product === productId);

        if (existingProductInCart) {
            // Si el producto ya existe, incrementar el campo quantity
            existingProductInCart.quantity += quantity;
        } else {
            // Si el producto no existe, agregarlo al carrito
            carrito.products.push({ product: productId, quantity });
        }

        // Guardar los datos del carrito actualizado en la base de datos
        await cartsManager.updateCart(carritoId, carrito);

        res.status(200).send({ message: "Producto agregado al carrito exitosamente" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        // Obtener el ID del producto y del carrito de los parámetros de la ruta
        const productId = req.params.pid;
        const carritoId = req.params.cid;

        // Obtener el carrito por su ID desde la base de datos
        const carrito = await cartsManager.getCartById(carritoId);

        if (!carrito) {
            return res.status(404).send({ message: "Carrito no encontrado" });
        }

        // Buscar el índice del producto en el carrito
        const productIndex = carrito.products.findIndex(prod => prod.product === productId);

        if (productIndex === -1) {
            return res.status(404).send({ message: "Producto no encontrado en el carrito" });
        }

        // Eliminar el producto del carrito
        carrito.products.splice(productIndex, 1);

        // Actualizar el carrito en la base de datos
        await cartsManager.updateCart(carritoId, carrito);

        res.status(200).send({ message: "Producto eliminado del carrito exitosamente" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Actualizar la cantidad de ejemplares de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
    try {
        // Obtener el ID del producto y del carrito de los parámetros de la ruta
        const productId = req.params.pid;
        const carritoId = req.params.cid;

        // Obtener la cantidad actualizada del producto desde req.body
        const { quantity } = req.body;

        // Verificar si la cantidad es un número positivo
        if (typeof quantity !== 'number' || quantity < 0) {
            return res.status(400).send({ message: "La cantidad debe ser un número positivo" });
        }

        // Obtener el carrito por su ID desde la base de datos
        const carrito = await cartsManager.getCartById(carritoId);

        if (!carrito) {
            return res.status(404).send({ message: "Carrito no encontrado" });
        }

        // Buscar el producto en el carrito
        const productInCart = carrito.products.find(prod => prod.product === productId);

        if (!productInCart) {
            return res.status(404).send({ message: "Producto no encontrado en el carrito" });
        }

        // Actualizar la cantidad del producto en el carrito
        productInCart.quantity = quantity;

        // Actualizar el carrito en la base de datos
        await cartsManager.updateCart(carritoId, carrito);

        res.status(200).send({ message: "Cantidad de ejemplares del producto actualizada exitosamente" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


export default router;
