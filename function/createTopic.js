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



module.exports.extractLastHrefNumber = extractLastHrefNumber;