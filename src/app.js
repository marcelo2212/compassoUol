'use strict';

const bodyParse = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();

app.use(bodyParse.json({limit: '200mb'})); //RETIRAR
app.use(bodyParse.urlencoded({limit: '200mb', extended: true})); //RETIRAR

//INSTANCIAR O BANCO DE DADOS NO-SQL
const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://localhost/uol';

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true
}).then(function () { // Caso Logue Corretamente
    console.log('\x1b[32m[ MONGO DB ] \x1b[0mBanco de dados foi ligado');
}).catch(function () { // Caso de ERRO
    console.log('\x1b[31m[ MONGO DB ] \x1b[0mBanco de dados desligado por erro');
});

//CARREGAR OS MODELS
const Estado = require('./app/models/Estado');
const Cidade = require('./app/models/Cidade');
const Cliente = require('./app/models/Cliente');

//ROTAS
const localidadeRoutes = require('./app/routes/Localidade-routes');
const clienteRoutes = require('./app/routes/Cliente-routes');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));


app.use('/localidade', localidadeRoutes);
app.use('/cliente', clienteRoutes);

app.use((error,req, res, next) =>{
    res.status(error.httpStatusCode).json('error'+ error);
});

module.exports = app;