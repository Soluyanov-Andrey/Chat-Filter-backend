const cheerio = require('cheerio');

/**
 * Удаляет элемент <nav> с определенными классами и id из HTML-строки, используя Cheerio.
 *
 * Функция использует Cheerio для загрузки HTML-строки и удаления
 * элемента <nav> с классами "flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary"
 * и id "sidebar".
 *
 * Этот метод более надежен, чем использование регулярных выражений,
 * особенно для сложного HTML, так как Cheerio обрабатывает HTML как DOM-дерево.
 *
 * @param {string} html - HTML-строка, из которой нужно удалить элемент <nav>.
 * @returns {string} Новая HTML-строка с удаленным элементом <nav>.
 */
function removeSidebarNav(html){
  const $ = cheerio.load(html);
  $('nav#sidebar.flex-shrink-0.overflow-x-hidden.bg-token-sidebar-surface-primary').remove();
  return $.html();
}

// Пример использования:
// const html = `<html-строка с элементом <nav> внутри>`;
// const newHtml = removeSidebarNav(html);
// console.log(newHtml);

module.exports.removeSidebarNav = removeSidebarNav; // Экспортируем для тестов
