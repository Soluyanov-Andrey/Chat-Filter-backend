const cheerio = require('cheerio');

/**
 * Добавляет новые элементы li в HTML-код с переносом строки между ними.
 *
 * @param {string} html - Исходный HTML-код.
 * @param {string[]} linkTexts - Массив текстов ссылок для новых элементов li.
 * @param {number} startNumber - Начальное число для формирования href.
 * @returns {string} - HTML-код с добавленными элементами li.
 */
function addListItemsArray(html, linkTexts, startNumber) {
    const $ = cheerio.load(html);
    const $list = $('ul#list');
  
    if (!$list.length) {
      console.warn('Элемент ul#list не найден в HTML.');
      return html; // Возвращаем исходный HTML, если список не найден.
    }
  
    let currentNumber = startNumber;
    let newItemsHtml = '';  // Строка для накопления новых элементов li
  
    linkTexts.forEach(text => {
      const href = `in${currentNumber}.html`;
      const newListItem = `\n    <li><a href="${href}" target="leftframe">${text}</a></li>`; // Добавляем перенос строки и отступ
      newItemsHtml += newListItem; // Append to string
      currentNumber++;
    });
      //Добавляем в конец  UL
  
    $list.append(newItemsHtml); // Append all new items at once
      return $.html();
}


module.exports.addListItemsArray = addListItemsArray;