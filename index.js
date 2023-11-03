const express = require('express'); //frameWork nodejs crea servidores

//express(); al ejecutarse crea un servidor

const app = express();

app.get('/', (req, res) => {
    res.sendFile('./static/index.html', {
        root: __dirname
    })
})

            //puerto
app.listen(3000, () => console.log('server on port 3000'))