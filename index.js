const express = require('express'); //frameWork

//express(); creates a server on execution

const app = express();

//make express understand data structures
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false})) //form data interpreter

app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {
        root: __dirname
    })
})

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send('usuario creado')
})

//params
app.get('/hello/:username', (req, res) => {
    res.send(`hello ${req.params.username}`)
})

app.get('/add/:x/:y', (req, res) => {
    const {x, y} = req.params
    res.send(`result: ${parseInt(x) + parseInt(y)}`)
})


app.get('/api', (req, res) => {
    res.json({
        "user": "JP",
        age: 56,
        autism: true
    })
})

app.get('/products', (req, res) => {
    res.send('products')
})


app.post('/products', (req, res) => {
    res.send('creando')
})

            //port
app.listen(3000, () => console.log('server on port 3000'))