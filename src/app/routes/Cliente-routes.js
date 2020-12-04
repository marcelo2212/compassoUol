'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/Cliente-controller');

//ROTA PARA SALVAR O CLIENTE
router.post('/',controller.save);

//ROTA PARA BUSCAR UM CLIENTE PELO ID
router.get('/id/:id', controller.findClientPerId);

//ROTA PARA BUSCAR CLIENTE PELO NOME
router.get('/nome/:nome_cliente', controller.findClientPerName);

//ROTA PARA EXCLUIR UM CLIENTE
router.delete('/:id', controller.removeClient);

//ROTA PARA ALTERAR O NOME DO CLIENTE
router.put('/editar/:id', controller.updateDataClient);

module.exports = router;