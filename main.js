// libraries
const { json } = require('express')
const express = require('express')
const hbs = require('express-handlebars')

// configure
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// instance of application
const app = express()

// handlebars
app.engine('hbs', hbs({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

// main

app.get(['/', '/index.html'],
    (req, resp) => {
        const cart = []
        resp.status(200)
        resp.type('text/html')
        resp.render('index', {cartState: JSON.stringify(cart)})
    }
)



app.post('/',
    express.urlencoded({extended: true}),
    express.json(),
    (req, resp) => {
        console.info('Shopping cart: ', req.body)
        const cart = JSON.parse(req.body.cartState)
        cart.push({
            item: req.body.item,
            qty: req.body.qty,
            unitPrice: req.body.unitPrice
        }
        )
        resp.status(202)
        resp.type('text/html')
        resp.render('index', {
            hasContent: !!req.body.item,
            cart: cart,
            cartState: JSON.stringify(cart)
        })
    }
)

app.use(express.static(__dirname + '/static'))

// start the server

app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})