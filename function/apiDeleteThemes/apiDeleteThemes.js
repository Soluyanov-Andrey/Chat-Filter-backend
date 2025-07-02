const cheerio = require('cheerio');

/**
 * Извлекает имя файла из ссылки (href) указанного элемента списка (li) в HTML.
 * @param {string} htmlContent - HTML-код, в котором нужно найти элемент.
 * @param {number} index - Индекс элемента <li>, из которого нужно извлечь имя файла (начиная с 1).
 * @returns {string | null} Имя файла (например, "pg1-19.html") или null, если элемент не найден или ссылка отсутствует.
 */
function getFilenameFromListItem(htmlContent, index) {
  try {
    const $ = cheerio.load(htmlContent);
    const listItem = $(`ul > li:nth-child(${index}) > a`); // Находим li по индексу и вложенный a
    
    if (listItem.length === 0) {
      console.warn(`Элемент <li> с индексом ${index} не найден.`);
      return null;
    }

    const href = listItem.attr('href');

    if (!href) {
      console.warn(`В элементе <li> с индексом ${index} отсутствует ссылка (href).`);
      return null;
    }

    // Извлекаем имя файла из href
    const filename = href.substring(href.lastIndexOf('/') + 1);
    return filename;

  } catch (error) {
    console.error("Произошла ошибка при обработке HTML:", error);
    return null;
  }
}

/**
 * Удаляет указанный элемент списка (li) из HTML-кода, находящийся внутри <ul id="list">.
 * @param {string} htmlContent - HTML-код, из которого нужно удалить элемент.
 * @param {number} index - Индекс элемента <li>, который нужно удалить (начиная с 1), ВНУТРИ <ul id="list">.
 * @returns {string} HTML-код с удаленным элементом <li>, или исходный HTML, если элемент не найден.
 */
function removeListItem(htmlContent, index) {
  try {
    const $ = cheerio.load(htmlContent);
    // Целимся непосредственно в список с id="list"
    // Теперь селектор '#list > li:nth-child(${index})' будет работать правильно
    const listItem = $(`#list > li:nth-child(${index})`);

    if (listItem.length === 0) {
      // Обновляем сообщение для большей точности
      console.warn(`Элемент <li> с индексом ${index} не найден внутри #list.`);
      return htmlContent; // Возвращаем исходный HTML без изменений
    }

    listItem.remove(); // Удаляем элемент <li>

    return $.html(); // Возвращаем HTML-код после удаления элемента

  } catch (error) {
    console.error("Произошла ошибка при обработке HTML:", error);
    return htmlContent; // Возвращаем исходный HTML в случае ошибки
  }
}

module.exports = { removeListItem }; // Экспортируем функцию для использования в тестах

module.exports.removeListItem = removeListItem;
module.exports.getFilenameFromListItem = getFilenameFromListItem;
