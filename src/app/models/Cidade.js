'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaCidade = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    }, 
    
    isActive:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Cidade', schemaCidade);