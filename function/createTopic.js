
//-----------------------------------------------------------------------------------------------
//                                       вариант основной
//-----------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------
//                                       вариант с replace
//-----------------------------------------------------------------------------------------------




//** Можно написать функцию с использованием  replace*/

const cheerio = require('cheerio');

function extractLastNumber(html) {
    // Загружаем HTML в cheerio
    const $ = cheerio.load(html);
    
    // Находим все ссылки a
    const links = $('a');
    
    // Получаем последнюю ссылку
    const lastLink = links.last();
    
    // Извлекаем href из последней ссылки
    const href = lastLink.attr('href');
    
    // Разбираем путь, удаляя фиксированные части
    // ./themes/inXXXX.html
    // где XXXX - искомое число
    const path = href.replace('./themes/in', '').replace('.html', '');
    
    return path;
}

// Пример использования:
const html = `
<body>
    <h1>Навигация</h1>
    <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
    <br>
    <a href="./themes/in2.html" target="leftframe">Установка php</a>
    <br>
    <a href="./themes/in3.html" target="leftframe">Страница 2</a>
    <br>
    <a href="./themes/in4.html" target="leftframe">Страница 3</a>
</body>
`;

console.log(extractLastNumber(html)); // Выведет: 4

// Тестирование с другим числом
const html2 = `
<body>
    <a href="./themes/in123.html" target="leftframe">Страница</a>
</body>
`;

console.log(extractLastNumber(html2)); // Выведет: 123