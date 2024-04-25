const ProductManager = require("./clases/ProductManager");
const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));
const productMngr = new ProductManager("./producto.json");


 /* try {
      const productMngr = new ProductManager("./productos.json");
      
      console.log("------------------addProduct()------------------");
      await productMngr.addProduct("Las.jq", "Lasagna jamon y queso", "Masa lasagna, salsa de tomate, fetas de jamon, ajo, queso barra", 8400, "urlImage", 10);
      await productMngr.addProduct("Can.ver", "Canelones de verdura", "Panqueque, salsa de tomate, ricotta, espinaca", 8400, "urlImage", 10);
      await productMngr.addProduct("F.ph", "Fideos puro huevo", "Harina, huevo, aceite de oliva, parmesano, ajo", 4800, "urlImage", 10);

      console.log("------------------addProduct() con ERROR------------------");
      await productMngr.addProduct("F.ph", "Fideos puro huevo", "Harina, huevo, aceite de oliva, parmesano, ajo", 4800, "urlImage", 10);
      
      console.log("------------------getProducts()------------------");
      const productos = await productMngr.getProducts();
      productos.forEach(element => {
          console.log(element);
      });

      console.log("------------------getProductById()------------------");
      let producto = await productMngr.getProductById(2);
      console.log(producto);

      console.log("------------------getProductById() con ERROR------------------");
      producto = await productMngr.getProductById(0);
      console.log(producto);

      console.log("------------------updateProduct() con objeto entero------------------");
      await productMngr.updateProduct(2, {
          title: 'Lasagna jyq objeto',
          description: 'Masa lasagna, salsa de tomate, fetas de jamon, ajo, queso barra',
          price: 8000,
          thumbnail: 'urlImage',
          code: 'Las.jq',
          stock: 10 
      });
      producto = await productMngr.getProductById(2);
      console.log(producto);

      console.log("------------------updateProduct() especificando un campo------------------");
      await productMngr.updateProduct(2, null, "title", 'Lasagna jyq objeto');
      producto = await productMngr.getProductById(2);
      console.log(producto);

      console.log("------------------deleteProduct()------------------");
      await productMngr.deleteProduct(2);
      await productMngr.getProductById(2);

      console.log("------------------deleteProduct() con ERROR------------------");
      await productMngr.deleteProduct(0);
      await productMngr.getProductById(0);
      

  } catch (error) {
      console.log(error.message);
  }
}

iniciar();*/
 
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    obtenerProductos(limit)
    .then(productos => res.json(productos))
    .catch(error => console.log(error))
})

app.get('/producto/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    obtenerProductoId(pid)
    .then(producto => res.json(producto))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
})


const obtenerProductos = async limit => {
    try {
        let productos = await productMngr.getProducts();
        const productosFiltrados = new Array();

        if(limit){
            for (let index = 0; index < limit; index++) {
                productos[index] && productosFiltrados.push(productos[index]);
            }
        }
        
        return productos;
    } catch (error) {
        console.log("ERROR: " + error);
    }
}

const obtenerProductoId = async pid => {
    try {
        const producto = await productMngr.getProductById(pid);
        return producto;
    } catch (error) {
        console.log(error);
    }
}