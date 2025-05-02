const cheerio = require('cheerio');
const findMaxNumberAfterDash = require('./additionalFunctions');
const { getHrefFromHTMLFiles } = require('./../apiOpenDocument/getHrefByIndex'); 
/**
 * Добавляет новые элементы li в HTML-код с переносом строки между ними.
 *
 * @param {string} html - Исходный HTML-код.
 * @param {string[]} linkTexts - Массив текстов ссылок для новых элементов li.
 * @param {number} startNumber - Начальное число для формирования href.
 * @returns {string} - HTML-код с добавленными элементами li.
 */
function addListItems(html, linkTexts, startNumber) {
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

function apiCreatePage(path, indexTheme){
//Берем ссылку из файла root 
getHrefFromHTMLFiles(path+);
//1 Читаем файлы pg и вычисляем последний
findMaxNumberAfterDash();
//2 читаем в масив содежимое сканируемого файла

//3 проходим по масиву и сокращаем до определенной длины строк

//4 записываем addListItems в выбраном файле типа in1.html
//5 сохранем все файлы

}


module.exports.addListItems = addListItems;