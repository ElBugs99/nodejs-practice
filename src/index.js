import puppeteer from 'puppeteer'; //siempre utiliza codigo asincrono, (await)
import fs from "fs/promises";

async function openWebPage() {

    // inicializa puppeteer, da un objeto llamado browser
    
    const browser = await puppeteer.launch({

        headless: false, //false: abre la pagina fisicamente en el navegador,
                        //true: ejecuta la pagina por debajo sin abrirla fisicamente
        slowMo: 500 //tiempo de demora para poder ver fisicamente lo que hace 
    });

    const page = await browser.newPage();
    //navegar a pagina
    await page.goto('https://example.com')

    await browser.close()//terminar ejecucion
}

//sacar captura
async function captureScreenShot() {

    const browser = await puppeteer.launch({

        headless: true, 
    });

    const page = await browser.newPage();
    //navegar a pagina
    await page.goto('https://quotes.toscrape.com/')
    await page.screenshot({path: 'example.png'})//sacar captura de pantalla
    await browser.close()//terminar ejecucion
}

//navegar entre paginas
async function navigatePage() {

    const browser = await puppeteer.launch({
        headless: true, 
    });

    const page = await browser.newPage();
    await page.goto('https://quotes.toscrape.com/')
    await page.click('a[href="/login"]')//navegar a otra pagina
    //await new Promise(r => setTimeout(r, 5000)); //esperar 5seg antes de ejecutar siguente instruccion
    await page.screenshot({path: 'example.png'})//sacar captura de pantalla
    await browser.close()//terminar ejecucion
}

async function getDataFromWebPage() {

    const browser = await puppeteer.launch({
        headless: true, 
    });

    const page = await browser.newPage();

    await page.goto('https://example.com')

    //Ejecuta funciones de manipulacion de DOM (querySelector, getElementById, etc.)
    const result = await page.evaluate(() => {
     
        const title = document.querySelector('h1').innerText
        const description = document.querySelector('p').innerText
        const more = document.querySelector('a').innerText
        //objeto
        return {
            title,
            description,
            more
        }
    })
    console.log(result);
    await browser.close()//terminar ejecucion
}

//
async function handleDynamicWebPage() {

    const browser = await puppeteer.launch({
        headless: true, 
    });

    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com')

    //Ejecuta funciones de manipulacion de DOM (querySelector, getElementById, etc.)
    const result = await page.evaluate(() => {
       const quotes = document.querySelectorAll('.quote')//devuelve un valor iterable (nodeList) //sin innertext
       //Transformar de nodeList a arreglo para poder mapear
       const data = [...quotes].map(quote => {
        const quoteText = quote.querySelector('.text').innerText;
        const author = quote.querySelector('.author').innerText;
        const tags = [...quote.querySelectorAll('.tag')].map((tag) =>  //almacenar todos los tags en un arreglo
            tag.innerText
        );
        return {
            quoteText,
            author,
            tags
        }
       });
        return data;        
    })
    console.log(result.length)
   console.log(result);
    await browser.close()//terminar ejecucion
}



const getTags = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://quotes.toscrape.com');

    const result = await page.evaluate(() => {

        const tag = document.querySelector('.tags-box');
        const tagName = tag.querySelectorAll('.tag-item');

        const data = [...tagName].map((tag) => tag.innerText)
        
        return data;
    })
    
    console.log(result);

    fs.writeFile('data.json')

    await browser.close();
}



getTags();
//handleDynamicWebPage()
//getDataFromWebPage()
//navigatePage();
//captureScreenShot();
//openWebPage();


//REST API CRUD

/* const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const homes = require('./routes/homes')
const axios = require('axios')

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

app.get('/posts', async (req, res) => {

    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/')
    console.log(response.data)

    res.send(response.data)
})

app.listen(app.get('port') )

console.log(`server ${app.get('appName')} on port ${app.get('port')}`) */