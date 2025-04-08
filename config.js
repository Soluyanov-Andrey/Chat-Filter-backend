// config.js (JavaScript)
const path = require('path'); 

const ROOT_DIR = process.cwd(); // Корневая директория проекта

const DATA_DIR = path.join(ROOT_DIR, 'data');
const FILE_NAME  = 'ChatGPT _ ChatGPT 4o Free _ Support all countries.html'
const FILE_NAME_NEW  = 'ChatGPT_NEW.html'
const ROOT_DOCUMENT = path.join(ROOT_DIR, 'rootDocument');
const FOLDER_DOCUMENT =  path.join(ROOT_DIR, 'document');
const SCANNED_FOLDER = '/media/andrey/Рабочий/flash/linux/manul';
const IP = 'http://localhost:9070';
const FULL_PATH = path.join(ROOT_DIR,'rootDocument', FILE_NAME);
const PATH_FILE_NAME_NEW = path.join(ROOT_DIR,'rootDocument', FILE_NAME_NEW);

module.exports = {
    ROOT_DIR,
    DATA_DIR,
    FILE_NAME,
    ROOT_DOCUMENT,
    FOLDER_DOCUMENT,
    SCANNED_FOLDER,
    IP,
    FULL_PATH,
    PATH_FILE_NAME_NEW
};
