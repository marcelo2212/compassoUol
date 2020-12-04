'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/Localidade-controller');

//ROTA PARA SALVAR O ESTADO/CIDADE
router.post('/',controller.save);

//ROTA PARA CONSULTAR UMA CIDADE
router.get('/:nomeCidade', controller.findCidadePerName);

//ROTA PARA CONSULTAR CIDADES PELO ESTADO
router.get('/estado/:nomeEstado', controller.findCidadePerEstate);

module.exports = router;