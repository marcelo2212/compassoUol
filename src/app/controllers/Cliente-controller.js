'use strict';

const mongoose = require('mongoose');
const Cidade = mongoose.model('Cidade');
const Cliente = mongoose.model('Cliente');
const _util = require('../Common/Util');
const moment = require('moment');

/**
 * FUNÇÃO PARA SALVAR UM CLIENTE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.save = async (req, res, next) => {
    const { nome, sexo, data_nascimento, idade, nome_cidade } = req.body;

    if (_util.isValidString(nome) && _util.isValidSexo(sexo) && _util.isValidString(data_nascimento)
        && _util.isValidNumber(idade) && _util.isValidString(nome_cidade)) {

        try {
            let cidade = await Cidade.findOne({ nome: nome_cidade }).exec();

            if (cidade === null) {
                cidade = new Cidade();
                cidade.nome = (nome_cidade).toLowerCase();
                cidade = await Cidade.create(cidade);
            }

            let cliente = new Cliente();
            cliente.nome = nome;
            cliente.sexo = sexo.toUpperCase();
            cliente.data_nascimento = moment(data_nascimento, "DD/MM/YYYY");
            cliente.idade = idade;
            cliente.cidade = cidade;

            cliente = await Cliente.create(cliente);

            res.status(200).send({
                message: 'Cliente cadastrado com sucesso!',
                data: {
                    cliente: cliente
                }
            });
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao salvar o cliente.', error: error });
        }
    } else {
        res.status(400).send({
            message: 'Existe valores no cadastro do cliente inválido ou vazio!'
        });
    }

}

/**
 * FUNÇÃO PARA CONSULTAR O CLIENTE PELO NOME
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findClientPerName = async (req, res, next) => {

    if (_util.isValidString(req.params.nome_cliente)) {

        try {
            let clientes = await Cliente.find({ nome: req.params.nome_cliente }).populate('cidade').exec();
            let listClientes = [];

            if (clientes !== null) {
                clientes.forEach((element) => {
                    listClientes.push({
                        nome: element.nome,
                        sexo: element.sexo,
                        data_nascimento: moment(element.data_nascimento).format("DD/MM/YYYY"),
                        idade: element.idade,
                        cidade: element.cidade.nome
                    });
                });
            }

            res.status(200).send({
                clientes: listClientes
            });
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao consultar o cliente.', error: error });
        }
    } else {
        res.status(400).send({
            message: 'Nome do cliente inválido ou vazio!'
        });
    }
}

/**
 * FUNÇÃO PARA CONSULTAR CLIENTE PELO ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findClientPerId = async (req, res, next) => {

    if (_util.isValidString(req.params.id)) {
        try {
            let cliente = await Cliente.findById(req.params.id).populate('cidade').exec();

            res.status(200).send({
                cliente: {
                    nome: cliente.nome,
                    sexo: cliente.sexo,
                    data_nascimento: moment(cliente.data_nascimento).format("DD/MM/YYYY"),
                    idade: cliente.idade,
                    cidade: cliente.cidade.nome
                }
            });
        } catch (error) {
            return res.status(400).send({ message: 'Erro ao consultar o cliente.', error: error });
        }
    } else {
        res.status(400).send({
            message: 'Nome do cliente inválido ou vazio!'
        });
    }
}

/**
 * FUNÇÃO PARA EXCLUIR UM CLIENTE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.removeClient = async (req, res, next) => {

    if (_util.isValidString(req.params.id)) {

        try {

            let cliente = await Cliente.findByIdAndRemove(req.params.id).exec();

            res.status(200).send({
                message: cliente !== null ? 'Cliente excluído com sucesso' : 'Cliente não encontrado',
                cliente: cliente
            });

        } catch (error) {
            return res.status(400).send({ message: 'Erro ao excluir o cliente.', error: error });
        }

    } else {
        res.status(400).send({
            message: 'ID do cliente inválido ou vazio!'
        });
    }
}

/**
 * FUNÇÃO PARA ATUALIZAR O NOME DO CLIENTE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateDataClient = async (req, res, next) => {
    if(_util.isValidString(req.params.id)){

        let cliente = await Cliente.findByIdAndUpdate(req.params.id, {
            $set: {
                nome: req.body.nome_cliente            }
        });

        cliente = await Cliente.findById(cliente._id).populate('cidade').exec();

        let returnClient = '';
        
        if(cliente !== null){
            returnClient = {
                nome: cliente.nome,
                sexo: cliente.sexo,
                data_nascimento: moment(cliente.data_nascimento).format("DD/MM/YYYY"),
                idade: cliente.idade,
                cidade: cliente.cidade.nome
            }
        }
        
        res.status(200).send({
            message: cliente !== null ? 'Dados do Cliente alterado com sucesso' : 'Cliente não encontrado',
            cliente: returnClient
        });

    }else{
        res.status(400).send({
            message: 'ID do cliente inválido ou vazio!'
        });
    }
}

