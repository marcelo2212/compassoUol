'use strict';

/**
 * FUNÇÃO PARA VERIFICAR SE UMA STRING É VÁLIDA
 * @param {*} value 
 */
exports.isValidString  = (value) => {
    let isValid = true;

    if(typeof value === 'undefined')
        isValid = false;

    if(value === null)
        isValid = false;
    
    if(value.match(/^\s+$/))
        isValid = false;

    
    return isValid;
}

/**
 * FUNÇÃO PARA VERIFICAR SE UM NÚMERO É VÁLIDO
 * @param {*} value 
 */
exports.isValidNumber = (value) => {
    let isValid = true;

    if(typeof value !== 'number')
        isValid = false;

    return isValid;
}

/**
 * FUNÇÃO PARA VERIFICAR SE O ENUM É VÁLIDO
 * @param {*} value 
 */
exports.isValidSexo = (value) => {
    let isValid = true;

    if(!this.isValidString(value))
        isValid = false;

    if((value.toUpperCase() !== 'M') && (value.toUpperCase() !== 'F'))
        isValid = false

    return isValid;
}