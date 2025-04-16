const cheerio = require('cheerio');
const { readFileContent } = require('../subsidiary/fileUtils');
/**
 * Извлекает текст ссылок из HTML-строки, содержащей список <ul> с id="list".
 * @param {string} htmlString - HTML-строка, содержащая список.
 * @returns {string[]} - Массив строк с текстом ссылок.
 */
function extractLinkTextFromHTML(htmlString) {
  const $ = cheerio.load(htmlString); // Загружаем HTML в Cheerio
  const linkTexts = []; // Создаем пустой массив для хранения текста ссылок

  $('#list li a').each((index, element) => {  // Выбираем все <a> внутри <li> внутри <ul id="list">
    linkTexts.push($(element).text()); // Добавляем текст ссылки в массив
  });

  return linkTexts; // Возвращаем массив текста ссылок
}

/**
 * Читает содержимое файла, извлекает текст ссылок из HTML, содержащегося в файле.
 * @param {string} path - Путь к файлу.
 * @returns {string[]} - Массив строк с текстом ссылок, извлеченных из HTML-содержимого файла.
 * @throws {Error} Если не удается прочитать содержимое файла.
 */
function readFileTextFromHTML(path) {
  try {
    const fileContent = readFileContent(path); // Используем await, т.к. readFileContent вероятно асинхронная
    const linkTexts = extractLinkTextFromHTML(fileContent);
    return linkTexts;
  } catch (error) {
    console.error(`Ошибка при чтении или обработке файла ${path}:`, error);
    throw new Error(`Не удалось прочитать или обработать файл ${path}`); // Пробрасываем ошибку дальше
  }
}
module.exports.readFileTextFromHTML = readFileTextFromHTML;
module.exports.extractLinkTextFromHTML = extractLinkTextFromHTML;
