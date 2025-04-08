const cheerio = require('cheerio');

const { readFileContent } = require('./fileUtils');
const { saveHtmlToFile } = require('./fileUtils');


const fs = require('fs');
const path = require('path'); // Import the 'path' module

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

/**
 * Удаляет элемент с классом 'footer' из HTML-кода.
 *
 * @param {string} html HTML-код, из которого нужно удалить элемент.
 * @returns {string} Измененный HTML-код, в котором удален элемент.
 */

function removeFooterNav(html) {
  const $ = cheerio.load(html);
  $('.footer').empty().remove(); // Сначала очищаем содержимое, потом удаляем элемент
  return $.html();
}



/**
 * Удаляет элемент с классами 'header' и 'wrap-header-chat-message-gpt' из HTML-кода.
 *
 * @param {string} html HTML-код, из которого нужно удалить элемент.
 * @returns {string} Измененный HTML-код, в котором удален элемент.
 */

function removeheaderNav(html) {
  const $ = cheerio.load(html);
  $('.header.wrap-header-chat-message-gpt').empty().remove(); // Сначала очищаем содержимое, потом удаляем элемент
  return $.html();
}




/**
 * Выполняет последовательную обработку HTML-файла, удаляя из него боковую навигацию,
 * футер и хедер, а затем сохраняет измененный HTML в новый файл.
 *
 * @param {string} rootDocument Путь к исходному HTML-файлу, который нужно обработать.
 * @param {string} pathNew Путь к новому HTML-файлу, в который будет сохранен измененный контент.
 *
 * @returns {void} Ничего не возвращает. Функция выполняет операции чтения и записи файлов.
 */

async function saveNewFile(rootDocument, pathNew){
  try {
  const read = readFileContent(rootDocument);


  const contDel = removeSidebarNav(read);
  const footerNav = removeFooterNav(contDel);
  const headerNav = removeheaderNav(footerNav);

  saveHtmlToFile(pathNew, headerNav);
  } catch (error) {
  // Обработка ошибок: пробрасываем ошибку дальше, чтобы ее мог обработать вызывающий код.
  console.error("Ошибка в saveNewFile:", error);
  throw error; // Пробрасываем ошибку
  }
}





module.exports.saveNewFile = saveNewFile;

; // Экспортируем для тестов
module.exports.removeSidebarNav = removeSidebarNav
module.exports.removeFooterNav =  removeFooterNav;
module.exports.removeheaderNav =  removeheaderNav;


