const cheerio = require('cheerio');

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

module.exports.extractLinkTextFromHTML = extractLinkTextFromHTML;