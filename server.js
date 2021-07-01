const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

//se sono in fase di sviluppo o test, richiedo dotenv library e dirò configurala

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();  //libreria che ci permette di buildare un server API

const port = process.env.PORT || 5000;  //porta sui ospito l'app è il processo, Heroku la sistema per noi

app.use(compression());
app.use(bodyParser.json());             //le richieste che arrivano al server le voglio convertire in json
app.use(bodyParser.urlencoded({ extendend: true }));

// app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));   //dirname fa parte di Node.js

    app.get('*', function(req, res) {  //per ogni get ci sono una richiesta e una risposta che invia un file
       res.sendFile(path.join(__dirname, 'client/build', 'index.html'))                      //HTML, CSS, JS
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Il server è in esecuzione sulla porta ' + port);
});

app.post('/payment', (req, res) => { //richiesta di pagamento
    const body = {
        source: req.body.token.id,   //token
        amount: req.body.amount,     //totale spesa
        currency: 'eur'              //valùta
    };
    
    //se il pagamento va in porto ci restituisce un messaggio di successo o di errore
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    })
});