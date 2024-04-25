const Router = require('express')
const router = Router();
const CartManager = require('../Classes/cartManager.js');
const ProductManager = require('../Classes/productManager.js');
const cartMngr = new CartManager('./carritos.json');
const productMngr = new ProductManager('./productos.json');

router.post('/', (req, res) => {
    agregar()
    .then(() => {
        res.send("Carrito creado con exito...")
    })
    .catch(error => res.send(error.message))
})

router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    if(!isNaN(cid)){
        obtenerByCid(cid)
        .then(productos => {
            res.json(productos)
        })
        .catch(error => res.send(error.message))
    }
    else{
        res.send("El id del carrito es invalido")
    }
})

router.post('/:cid/product/:pid', (req, res) => {
    agregarProducto(parseInt(req.params.cid), parseInt(req.params.pid))
    .then(() => res.send("Producto agregado con exito"))
    .catch(error => res.send(error.message))
})

const agregar = async () => {
    await cartMngr.addCart();
}

const obtenerByCid = async (cid) => {
    return await cartMngr.getCartByCid(cid);
}

const agregarProducto = async (cid, pid) => {
    if(isNaN(cid) || isNaN(pid)) throw new Error("Id de carrito invalido");
    else {
        const producto = await productMngr.getProductById(pid);
        if(producto) await cartMngr.addProduct(cid, pid);
    }
}

module.exports = router;