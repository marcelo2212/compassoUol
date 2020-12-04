'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaEstado = new Schema({

    nome: {
        type: String,
        required: [true, 'Nome do estado é Obrigatório'],
        trim: true,
        lowercase:true
    },

    cidades:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Cidade',
        required: [true, 'Cidade é Obrigatório']
    }],

    active: {
        type: Boolean,
        required: true,
        default: true 
    }
    
});

module.exports = mongoose.model('Estado', schemaEstado);