const express = require('express')
const router = express.Router()

//Arreglo para el carrito.
const carts = []

//ENDPOINTS para el carrito.
router.post("/carts", (req, res)=>{
    
    const newCart = { 
        cid: carts.length + 1,
        products: []
    } //Creamos un nuevo carrito.

    carts.push(newCart) //Agregamos la nueva cart.
    res.status(201).json(newCart) //Si no hay errores, enviamos la nueva cart.
})

router.get("/carts/:cid", (req,res)=>{
    const cartId = parseInt(req.params.cid) //Recibimos el cart id por parametro.
    const cart = carts.find((c => c.cid === cartId)) //Buscamos el cart con el id.

    if (!cart) return res.status(404).json({ error: "No existe el carrito" });
    res.json(cart)
})

router.post("/carts/:cid/products/:pid", (req,res)=>{
    const cartId = parseInt(req.params.cid) //Recibimos el cart id por parametro.
    const productId = parseInt(req.params.pid) //Recibimos el product id por parametro.

    const cart = carts.find((c => c.cid === cartId)) //Buscamos el cart con el id.
    if (!cart) return res.status(404).json({ error: "No existe el carrito" });

    const product = products.find((p => p.pid === productId)) //Buscamos el producto con el id.
    if (!product) return res.status(404).json({ error: "No existe el producto" });

    const productInCart = cart.products.find((p => p.pid === productId)) //Buscamos el producto en el carrito con el id.
    if(productInCart) {
        productInCart.quantity += 1 //Le agregas el valor quantity y lo concatenas.
    } else {
        cart.products.push({pid: productId, quantity: 1}) //Si no existe, lo agregamos al carrito.
    }

    res.status(200).json(cart) //Si no hay errores, enviamos el nuevo producto.
})

module.exports = router