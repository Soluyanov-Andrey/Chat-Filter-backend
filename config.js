// config.js (JavaScript)
const path = require('path'); 

const ROOT_DIR = process.cwd(); // Корневая директория проекта

const DATA_DIR = path.join(ROOT_DIR, 'data');

const FILE_NAME  = 'ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
const FILE_NAME_NEW  = 'ChatGPT_NEW.html';
const FILE_NAME_TEMP = 'ChatGPT_NEW_TEMP.html';
const FILE_NAME_TEST = 'C_test.html';
const FILE_NAME_LOOK = 'LOOK.html';

//Пути для файлов внутри document
const DOCUMENT_ROOT = '/document/root.html';
const DOCUMENT_PAGE_HREF = 'root.html';
const DOCUMENT_PAGE = 'document/themes/in1.html';
const PATH_THEMES = '/themes/in1.html';

const ROOT_DOCUMENT = path.join(ROOT_DIR, 'rootDocument');
const FOLDER_DOCUMENT =  path.join(ROOT_DIR, 'document');
const SCANNED_FOLDER = '/media/andrey/backap/test_all';
const IP = 'http://localhost:9070';

/**
 * В конце файл будет исходный файл ChatGPT _ ChatGPT 4o Free _ Support all countries.html
 * @constant {string}
 */

const FULL_PATH = path.join(ROOT_DIR,'rootDocument', FILE_NAME);

/**
 * В конце файл будет C_test.html
 * @constant {string}
 */
const FULL_PATH_FILE_TEST = path.join(ROOT_DIR,'rootDocument', FILE_NAME_TEST);

/**
 * В конце файл будет ChatGPT_NEW.html
 * @constant {string}
 */
const PATH_FILE_NAME_NEW = path.join(ROOT_DIR,'rootDocument', FILE_NAME_NEW);

/**
 * В конце файл будет ChatGPT_NEW_TEMP.html
 * @constant {string}
 */
const PATH_FILE_TEMP_NEW = path.join(ROOT_DIR,'rootDocument', FILE_NAME_TEMP); 

/**
 * В конце файл будет LOOK.html
 * @constant {string}
 */
const PATH_FILE_NAME_LOOK = path.join(ROOT_DIR,'rootDocument', FILE_NAME_LOOK);
module.exports = {
    ROOT_DIR,
    DATA_DIR,
    FILE_NAME,
    ROOT_DOCUMENT,
    FOLDER_DOCUMENT,
    SCANNED_FOLDER,
    IP,
    FULL_PATH,
    PATH_FILE_NAME_NEW,
    PATH_FILE_TEMP_NEW,
    FULL_PATH_FILE_TEST,
    PATH_FILE_NAME_LOOK,
    DOCUMENT_ROOT,
    DOCUMENT_PAGE_HREF,
    DOCUMENT_PAGE,
    PATH_THEMES
};
