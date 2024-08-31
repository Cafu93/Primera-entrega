const express = require('express')
const productsRouter = require("./routes/productos.router.js")
const cartsRouter = require("./routes/carrito.router.js")

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Usamos los archivos creados.
app.use("/api", productsRouter)
app.use("/api", cartsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})