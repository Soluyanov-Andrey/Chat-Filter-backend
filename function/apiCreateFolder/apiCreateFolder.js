const { copyDirectory } = require('./createFolder'); // Замените 'your-file-name'

/**
 * 
 * api Основная входная функция, копирует заранее заготовленную папку  
 * 
 *
 * @param {string} source - Полный путь к исходной директории, которую необходимо скопировать.
 * @param {string} destination - Полный путь к целевой директории, куда будет скопировано содержимое.
 **/

function apiCreateFolder(source, destination) {

    copyDirectory(source, destination);
}

module.exports.apiCreateFolder = apiCreateFolder;
