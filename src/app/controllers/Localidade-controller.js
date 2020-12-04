'use strict';

const mongoose = require('mongoose');
const Estado = mongoose.model('Estado');
const Cidade = mongoose.model('Cidade');
const _util = require('../Common/Util');

/**
 * FUNÇÃO PARA SALVAR A CIDADE E O ESTADO
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.save = async (req, res, next) => {

    if ((_util.isValidString(req.body.estado)) && (_util.isValidString(req.body.cidade))) {
        let mensagemRetorno = 'Cidade/Estado salvo com sucesso!';
        let cidade;

        try {

            let estado = await Estado.findOne({ nome: (req.body.estado).toLowerCase() }).populate('cidades');

            if (estado !== null) {
                if (estado.cidades.some((e) => e.nome === req.body.cidade.toLowerCase())) {
                    mensagemRetorno = 'Estado/Cidade já existe na base de dados!';
                } else {
                    cidade = await saveCidade(req.body.cidade);
                    estado.cidades.push(cidade);
                    await Estado.update({ _id: estado._id }, estado).populate('cidades');
                    estado = await Estado.findById(estado._id).populate('cidades');
                    mensagemRetorno = 'No estado ' + estado.nome + ' foi adicionado a cidade ' + cidade.nome + '!';
                }
            } else {

                cidade = await Cidade.findOne({ nome: (req.body.cidade).toLowerCase() });

                if (cidade === null) {
                    cidade = await saveCidade(req.body.cidade);
                }
                estado = await saveEstado(req.body.estado, cidade);
            }

            res.status(200).send({
                message: mensagemRetorno,
                data: {
                    estado: estado
                }
            });

        } catch (error) {
            return res.status(400).send({ message: 'Erro ao salvar Cidade/Estado.', error: error });
        }
    } else {
        res.status(400).send({
            message: 'O estado ou cidade está vazio!'
        });
    }
}

/**
 * FUNÇÃO PARA SALVAR A CIDADE
 * @param {*} nomeCidade 
 */
async function saveCidade(nomeCidade) {
    let cidade = new Cidade();
    cidade.nome = (nomeCidade).toLowerCase();
    return await Cidade.create(cidade);
}

/**
 * FUNÇÃO PARA SALVAR O ESTADO
 * @param {*} nomeEstado 
 */
async function saveEstado(nomeEstado, cidade) {
    let estado = new Estado();
    estado.nome = (nomeEstado).toLowerCase();
    estado.cidades.push(cidade);
    return await Estado.create(estado);
}

/**
 * FUNÇÃO PARA CONSULTAR CIDADE PELO NOME
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findCidadePerName = async (req, res, next) => {
    if (_util.isValidString(req.params.nomeCidade)) {

        try {

            Estado.find().populate('cidades').exec((err, estados) => {
                if (err) res.status(400).send(err)

                res.status(200).send({
                    estados: estados.filter(estado => {
                        estado.cidades = estado.cidades.filter(cidade => cidade.nome === (req.params.nomeCidade).toLowerCase());
                        if (estado.cidades.length > 0) return estado;
                    })
                })
            });

        } catch (error) {
            return res.status(400).send({ message: 'Erro ao consultar a cidade.', error: error });
        }
    } else {

        res.status(400).send({
            message: 'A cidade está vazio!'
        });
    }

}

/**
 * FUNÇÃO PARA CONSULTAR CIDADE PELO NOME
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.findCidadePerEstate = async (req, res, next) => {
    if (_util.isValidString(req.params.nomeEstado)) {

        try {

            Estado.find({nome: (req.params.nomeEstado).toLowerCase()}).populate('cidades').exec((err, estados) => {
                if (err) res.status(400).send(err)

                res.status(200).send({
                    estados: estados.filter(estado => {
                        if (estado.cidades.length > 0) return estado;
                    })
                })
            });

        } catch (error) {
            return res.status(400).send({ message: 'Erro ao consultar o estado.', error: error });
        }
    } else {
        res.status(400).send({
            message: 'O estado está vazio!'
        });
    }
}