// config.js (JavaScript)
const path = require('path'); 

const ROOT_DIR = process.cwd(); // Корневая директория проекта
const DATA_DIR = path.join(ROOT_DIR, 'data');


module.exports = {
    ROOT_DIR,
    DATA_DIR
};
