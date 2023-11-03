const express = require('express'); //frameWork nodejs crea servidores

//express(); al ejecutarse crea un servidor

const app = express();

app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {
        root: __dirname
    })
})

app.get('/products', (req, res) => {
    res.send('products')
})


app.post('/products', (req, res) => {
    res.send('creando')
})

            //puerto
app.listen(3000, () => console.log('server on port 3000'))