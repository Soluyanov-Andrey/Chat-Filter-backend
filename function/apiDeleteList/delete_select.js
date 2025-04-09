const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

function delete_select(array) {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    
    return array.map(value => value - 1);
}

module.exports = delete_select;