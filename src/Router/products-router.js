const uploader = require("../utils.js");
const Router = require("express")
const router = Router();
const ProductManager = require("../Classes/productManager.js");
const productMngr = new ProductManager("./productos.json");


router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!isNaN(limit)){
        obtenerProductos(limit)
        .then(productos => res.json(productos))
        .catch(() => res.send("Error al obtener los productos"))
    }
    else res.status(400).send("Error: limit is not a number")
})

router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    if(!isNaN(pid)){
        obtenerProductoId(pid)
        .then(producto => res.json(producto))
        .catch(error => res.send(error.message))
    }
    else res.send("ERROR: pid is not a number")
})

router.post('/', uploader.single('file'), (req, res) => {
    agregar(req.body.code, req.body.title, req.body.description, req.body.price, (req.file ? [req.file.path] : []), req.body.stock, req.body.category)
    .then(() => {
        res.send("Producto agregado con exito...");
    })
    .catch(error => res.send(error.message))
})

router.put('/:pid', (req, res) => {
    actualizar(req.params.pid, req.body.obj, req.body.campo, req.body.valor)
    .then(() => res.send("Producto actualizado con exito..."))
    .catch(error => res.send(error.message))
})

router.delete('/:pid', (req, res) => {
    eliminar(req.params.pid)
    .then(() => {
        res.send("Producto eliminado con exito...");
    })
    .catch(error => res.send(error.message))
})


const obtenerProductos = async limit => {
        let productos = await productMngr.getProducts();
        const productosFiltrados = new Array();

        if(limit){
            for (let index = 0; index < limit; index++) {
                productos[index] && productosFiltrados.push(productos[index]);
            }
            productos = productosFiltrados;
        }
        
        return productos;
}

const obtenerProductoId = async pid => {
    const producto = await productMngr.getProductById(pid);
    return producto;
}

const agregar = async (code, title, description, price, thumbnail, stock, category) => {
    await productMngr.addProduct(code, title, description, price, thumbnail, stock, category);
}

const actualizar = async (pid, obj, campo, valor) => {
    await productMngr.updateProduct(pid, obj, campo, valor);
}

const eliminar = async (pid) => {
    await productMngr.deleteProduct(pid);
}

module.exports = router;