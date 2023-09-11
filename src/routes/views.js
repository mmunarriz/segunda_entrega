import { Router } from "express";
import productsModel from "../dao/models/products.js";
import cartsModel from "../dao/models/carts.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('chat', {});
})

router.get('/products', async (req, res) => {
    const { page = 1 } = req.query;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: 10, page, lean: true });
    const products = docs;
    res.render('products', {
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
})

router.get('/carts/:cid', async (req, res) => {
    try {
        // Obtener el ID del carrito de los params de la ruta
        const cid = req.params.cid; // El ID se recibe como string

        // Obtener el carrito por su ID desde la base de datos con sus productos
        const carrito = await cartsModel.findById(cid).populate('products.product');

        if (!carrito) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }

        // Transformar los datos al formato JSON estándar
        const productsInCart = carrito.products.map(item => {
            return {
                product: item.product.toObject(), // Convierte el ObjectId en un objeto JSON válido
                quantity: item.quantity,
                _id: item._id
            };
        });

        res.render('carts', { productsInCart });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router