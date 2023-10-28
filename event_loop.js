const http = require('http');

http.createServer((req, res) => {
    if ( req.url === '/') {
        res.write('hello world')

        //blocking code affects runtime, must be asyncronous
        for ( let i = 0; i < 100000; i++) {
            console.log(Math.random() * i)
        }

        return res.end();
    }
});