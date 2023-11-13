//REST API CRUD

const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const homes = require('./routes/homes')

const app = express()
const products = [
    {
        id: 1,
        name: 'gaming pc',
        price: 2000000
    }
]

//settings
app.set('appName', 'Express Course')
app.set('port', 3000)
app.set('case sensitive routing', true)

//middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use(homes)//import homes routes

//routes

userRoutes(app)

app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})

app.put('/products', (req, res) => {
    res.send('actualizando productos')
})

app.delete('/products', (req, res) => {
    res.send('eliminando productos')
})

app.get('/products/:id', (req, res) => {
    console.log(req.params.id)
    const productFound = products.find((product) => product.id === parseInt(req.params.id))

    if (!productFound) return res.status(404).json({
        message: "product not Found"
    })

    console.log(productFound)
    res.send(productFound)
})

app.delete('/products/:id', (req, res) => {
    const productFound = products.find((product) => product.id === parseInt(req.params.id))

    if (!productFound) return res.status(404).json({
        message: "product not Found"
    })

    const newProducts = products.filter( p => p.id !== parseInt(req.params.id) )
    console.log(newProducts)

    res.send('eliminando producto')
})

app.put('/products/:id', (req, res) => {

    const newData = req.body
    const productFound = products.find((product) => product.id === parseInt(req.params.id))

    if (!productFound) return res.status(404).json({
        message: "product not Found"
    })

    products.map( p => p.id === parseInt(req.params.id) ? {...p , ...newData} : p )

    const newProducts = products.filter( p => p.id !== parseInt(req.params.id) )
    console.log(newProducts)

    res.json({
        message: "product succesfully updated"
    })
})

app.listen(app.get('port') )

console.log(`server ${app.get('appName')} on port ${app.get('port')}`)