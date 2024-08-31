const express = require('express')
const router = express.Router()

const products = []

//ENDPOINTS para los productos.
router.get("/products", (req,res)=>{
    res.json(products)
})

router.get("/products/:pid", (req, res)=>{

    const producId = parseInt(req.params.pid) //Recibimos un producto por parametro.

    //Usamos el metodo .find y le decimos el p.id lo debe comparar con produc.id
    const produc = products.find((p => p.pid === producId)) 

    if(!produc) return res.send({error: "Producto no encontrado"}) //Verificamos si el producto es correcto.
        res.send(produc) //Devolvemos dicho producto recibido.
})

router.post("/products", (req, res)=>{

    const newProduct = { 
        pid: products.length + 1,
        title: "reloj inteligente",
        description: "Incluye chat-gpt",
        code: "1111",
        price: 15,
        status: true,
        stock: 20,
        category: "electronica",
    } //Creamos un nuevo producto.

    products.push(newProduct) //Agregamos el nuevo producto.
    res.json({message: "Producto agregado"})
    res.status(204).json(newProduct) //Si no hay errores, enviamos el nuevo producto.
})

router.put("/products/:pid", (req,res)=>{

    const producId = parseInt(req.params.pid) //Obtenemos el id ingresado en el body.
    const produc = products.find((p => p.pid === producId)) //Buscamos q exista el id.

    if(produc){
        const {title} = req.body
        produc.title = title //Le damos el valor del body.
        const {description} = req.body
        produc.description = description //Le damos el valor del body.
        const {code} = req.body
        produc.code = code //Le damos el valor del body.
        const {price} = req.body
        produc.price = price //Le damos el valor del body.
        const {status} = req.body
        produc.status = status //Le damos el valor del body.
        const {stock} = req.body
        produc.stock = stock //Le damos el valor del body.
        const {category} = req.body
        produc.category = category //Le damos el valor del body.

        res.json(produc)
    }else{
        res.status(404).json({message: "Producto no encontrado"})
    }
})

router.delete("/products/:pid", (req,res)=>{
    const producId = parseInt(req.params.pid)
    //Utilizamos .filter para traer todas las tareas, menos las q eliminamos.
    products = products.filter((p => p.pid !== producId)) 

    res.json({msj: "Producto eliminado"})
})

//Exportamos la informacion.
module.exports = router