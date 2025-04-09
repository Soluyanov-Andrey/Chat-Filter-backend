const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Извлекает ссылки и текст ссылок из элемента <ul> с ID 'links' в предоставленном HTML.
 *
 * @param {string} html - HTML-код для обработки.
 * @returns {Array<Array<string>>} Массив массивов, где каждый подмассив содержит URL и текст ссылки.
 *   Возвращает пустой массив, если элемент <ul> с ID 'links' не найден.
 *
 * @example
 * const html = `
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>Example</title>
 * </head>
 * <body>
 *   <ul id="links">
 *     <li><a href="1.html">Link 1</a></li>
 *     <li><a href="2.html">Link 2</a></li>
 *   </ul>
 * </body>
 * </html>
 * `;
 *
 * const result = extractLinksAndTextFromSecondUl(html);
 * console.log(result); // Вывод: [ [ '1.html', 'Link 1' ], [ '2.html', 'Link 2' ] ]
 */
function extractLinksAndTextFromSecondUl(html) {
    const $ = cheerio.load(html);
  
    // Выбираем UL по ID
    const targetUl = $('#links');
  
    if (!targetUl.length) {
      console.log("Не найден UL с ID 'links'");
      return [];
    }
  
    const result = [];
    targetUl.find('li').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const text = $(element).find('a').text();
      console.log(`Ссылка: ${link}, Текст: ${text}`);
      if (link && text) {
        result.push([link, text]);
      }
    });
  
    console.log("Результат:\n", result);
    return result;
  }

module.exports.extractLinksAndTextFromSecondUl = extractLinksAndTextFromSecondUl; 
