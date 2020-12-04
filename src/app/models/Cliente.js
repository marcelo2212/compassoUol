'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaCliente = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome do cliente é Obrigatório'],
        trim: true
    }, 

    sexo: {
        type: String,
        enum : ['M','F'],
        default: 'M'
    },

    data_nascimento: {
        type: Date,
        required: [true, 'Data de nascimento do cliente é Obrigatório']
    },

    idade: {
        type: Number,
        required: [true, 'Idade do cliente é Obrigatório']
    },

    cidade:{ 
        type: Schema.Types.ObjectId, 
        ref: 'Cidade',
        required: [true, 'Cidade do cliente é Obrigatório'] 
    },

    isActive:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Cliente', schemaCliente);