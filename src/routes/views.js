import { Router } from "express";
import productsModel from "../dao/models/products.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('chat', {});
})

router.get('/products', async (req,res)=>{
    const {page=1} = req.query;
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = await productsModel.paginate({},{limit:10,page,lean:true});
    const products = docs;
    res.render('products',{
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    });
})

export default router