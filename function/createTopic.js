const cheerio = require('cheerio');

/**
 * Извлекает цифру из href последнего элемента <a> в HTML.
 *
 * @param {string} htmlCode HTML-код, включающий <!DOCTYPE html> ... </html>
 * @returns {number|null}  Цифра из href или null, если цифру извлечь не удалось.
 */
function extractLastHrefNumber(htmlCode) {
    try {
        const $ = cheerio.load(htmlCode);
        const aElements = $('a'); // Выбираем все элементы <a>

        if (aElements.length === 0) {
            return null; // Нет ссылок в HTML
        }

        const lastHref = aElements.last().attr('href'); // Получаем href последнего элемента

        if (!lastHref) {
            return null; // У последнего элемента нет href
        }

        const regex = /\.\/themes\/in(\d+)\.html/; // Регулярное выражение для извлечения цифры
        const match = lastHref.match(regex);

        if (match && match[1]) {
            return parseInt(match[1], 10); // Преобразуем захваченную цифру в число
        }

        return null; //  href не соответствует шаблону
    } catch (error) {
        console.error("Ошибка при парсинге HTML:", error);
        return null; // Обрабатываем ошибки парсинга
    }
}

/**
 * Добавляет новую ссылку после последнего элемента <a> в HTML.
 *
 * @param {string} htmlCode  Исходный HTML-код.
 * @param {number} number  Цифра для вставки в href новой ссылки.
 * @returns {string}  Измененный HTML-код с добавленной ссылкой.
 */

function insertNewLinkAfterLast(htmlCode, number) {
    try {
      const $ = cheerio.load(htmlCode);
      const aElements = $('a'); // Находим все элементы <a>
  
      const newLink = `
    <br>
    <a href="./themes/in${number}.html" target="leftframe">Страница ${number}</a>`; // Формируем HTML новой ссылки
  
      if (aElements.length > 0) {
        aElements.last().after(newLink); // Вставляем новую ссылку после последнего <a>
      } else {
        // Если нет существующих <a>, добавляем ссылку в конец <body>
        $('body').append(newLink);
      }
  
      return $.html(); // Возвращаем измененный HTML-код
    } catch (error) {
      console.error("Ошибка при обработке HTML:", error);
      return htmlCode; // Возвращаем исходный HTML в случае ошибки
    }
  }

module.exports.insertNewLinkAfterLast = insertNewLinkAfterLast;
module.exports.extractLastHrefNumber = extractLastHrefNumber;