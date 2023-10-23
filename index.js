const express = require('express'); //frameWork nodejs crea servidores

//express(); al ejecutarse crea un servidor

const server = express();

server.get('/', (req, res) => {
    res.send('<h1>Hola</h1>')
})

            //puerto
server.listen(3000, () => console.log('server on port 3000'))