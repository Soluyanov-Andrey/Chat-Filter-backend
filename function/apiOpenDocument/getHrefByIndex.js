const cheerio = require('cheerio');
const { readFileContent } = require('../subsidiary/fileUtils');

/**
 * Возвращает URL из указанного элемента списка в HTML-строке
 * 
 * @param {string} htmlString - HTML строка, содержащая список с id="list"
 * @param {number} index - Индекс нужного элемента (начинается с 1)
 * @returns {string} Значение атрибута href из соответствующей ссылки
 * @throws {Error} Если индекс выходит за границы допустимого диапазона
 * 
 * @example
 * // Возвращает './themes/in1.html'
 * getHrefByIndex(htmlString, 1);
 * 
 * @example
 * // Возвращает 'in3.html'
 * getHrefByIndex(htmlString, 4);
 * 
 * @example
 * // Выбрасывает ошибку: "Index 0 out of range (1-4)"
 * getHrefByIndex(htmlString, 0);
 */
function getHrefByIndex(htmlString, index) {
    const $ = cheerio.load(htmlString);
    const listItems = $('#list li a');
    
    if (index < 1 || index > listItems.length) {
        throw new Error(`Index ${index} out of range (1-${listItems.length})`);
    }
    
    return $(listItems[index - 1]).attr('href');
  }
/**
 * Возвращает URL из указанного элемента списка в HTML-файле.
 *
 * @param {string} path - Путь к HTML-файлу.
 * @param {number} index - Индекс нужного элемента списка (начинается с 1).
 * @returns {string} Значение атрибута href из соответствующей ссылки.
 * @throws {Error} Если не удается прочитать файл или индекс выходит за границы допустимого диапазона.
 *
 * @example
 * // Возвращает './themes/in1.html', если в файле по пути 'myFile.html'
 * // первый элемент списка имеет href="./themes/in1.html"
 * getHrefFromHTML('myFile.html', 1);
 *
 * @example
 * // Выбрасывает ошибку: "Не удалось прочитать или обработать файл myFile.html",
 * // если файл 'myFile.html' не существует.
 * getHrefFromHTML('myFile.html', 1);
 *
 * @example
 * // Выбрасывает ошибку: "Index 0 out of range (1-4)", если в файле 'myFile.html'
 * // всего 4 элемента списка.
 * getHrefFromHTML('myFile.html', 0);
 */

function getHrefFromHTMLFiles(path, index) {
try {
    const fileContent = readFileContent(path); 
    const linkTexts = getHrefByIndex(fileContent, index);
    return linkTexts;

} catch (error) {
    console.error(`Ошибка при чтении или обработке файла ${path}:`, error);
    throw new Error(`Не удалось прочитать или обработать файл ${path}`); // Пробрасываем ошибку дальше
}
}

module.exports.getHrefByIndex = getHrefByIndex;
module.exports.getHrefFromHTMLFiles = getHrefFromHTMLFiles;