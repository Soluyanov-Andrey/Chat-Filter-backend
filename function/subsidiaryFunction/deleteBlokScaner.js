/**
 * @module filterChatBoxes
 * @description Модуль содержит функции для фильтрации HTML-контента, удаляя ненужные блоки, связанные с чатом.
 */

const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');

const isSimilar = require('./isSimilar.js');

const { saveHtmlToFile } = require('./fileUtils.js');
const { readFileContent } = require('./fileUtils.js');


/**
 * Фильтрует HTML-контент, удаляя блоки `.chat-box__human--prompt`,
 * `.wrap-ai-completed` и `.chat-box.human`, если текст в `.chat-box__human--prompt`
 * подобен одному из целевых текстов из массива `targetTexts`.
 * Поиск `.wrap-ai-completed` осуществляется после блока `.chat-box.human`.
 *
 * @param {string} htmlContent - HTML-контент для фильтрации.
 * @param {string[]} targetTexts - Массив текстов, используемых для определения блоков для удаления.
 *                             Если текст в `.chat-box__human--prompt` *подобен* одному из
 *                             `targetTexts`, связанные блоки удаляются.
 * @returns {string | undefined} - Отфильтрованный HTML-контент или `undefined` в случае ошибки.
 * @throws {Error} Если возникает ошибка при обработке HTML.
 *
 * @example
 * // Пример использования:
 * const html = `<div class="chat-box human"><div class="chat-box__human--prompt">Hello</div></div><div class="wrap-ai-completed">AI Response</div>`;
 * const targetTexts = ["Hello"];
 * const filteredHtml = filterChatBoxesRemoveListed(html, targetTexts);
 * console.log(filteredHtml); // Выведет пустую строку, так как блоки были удалены.
 */
function filterChatBoxesRemoveListed(htmlContent, targetTexts) {
  try {
    const $ = cheerio.load(htmlContent);

    const elementsToRemove = []; // Массив для хранения элементов для удаления

    $('.chat-box__human--prompt').each((index, element) => {
      const boxText = $(element).text().trim();
      let shouldRemove = false; // Флаг, указывающий, нужно ли удалить блок

      // Проверяем, содержится ли текст блока в массиве targetTexts
      for (const targetText of targetTexts) {
        if (isSimilar(boxText, targetText)) {
          shouldRemove = true;
          break; // Если текст найден, выходим из цикла
        }
      }

      if (shouldRemove) {
        // Если текст совпадает с одним из targetTexts, добавляем блоки для удаления
        let parentChatBox = $(element).closest('.chat-box.human');
        let wrapAiCompleted = parentChatBox.next('.wrap-ai-completed');

        if (wrapAiCompleted.length > 0) {
          elementsToRemove.push(wrapAiCompleted[0]);
        }

        if (parentChatBox.length > 0) {
          elementsToRemove.push(parentChatBox[0]);
        }
      }
    });

    // Удаляем элементы из DOM (важно делать это после итерации)
    elementsToRemove.forEach(el => {
      $(el).remove();
    });

    const filteredHtml = $.html();

    return (filteredHtml);

  } catch (error) {
    console.error(`Ошибка при обработке файла: ${error}`);
    return undefined; // Возвращаем undefined при ошибке, а не "undefined" как строку.
  }
}

/**
 * Читает HTML-файл, фильтрует его с помощью `filterChatBoxesRemoveListed` и сохраняет
 * отфильтрованный контент в новый файл.
 *
 * @param {string} pathFile - Путь к исходному HTML-файлу.
 * @param {string} pathFileNew - Путь для сохранения отфильтрованного HTML-файла.
 * @param {string[]} targetTexts - Массив текстов, используемых для определения блоков для удаления.
 * @returns {Promise<void>}
 * @throws {Error} Если возникает ошибка при чтении или записи файлов.
 *
 * @example
 * // Пример использования:
 * const pathFile = 'input.html';
 * const pathFileNew = 'output.html';
 * const targetTexts = ["Hello"];
 * saveListedHTML(pathFile, pathFileNew, targetTexts);
 */
async function saveListedHTML(pathFile, pathFileNew, targetTexts) {
  try {
    const readFile = await readFileContent(pathFile);
    const filterHTML = filterChatBoxesRemoveListed(readFile, targetTexts);
    // console.log(filterHTML);

    await saveHtmlToFile(pathFileNew, filterHTML);

  } catch (error) {
    console.error(`Ошибка при обработке и сохранении файла: ${error}`);
    throw error; //  Пробрасываем ошибку, чтобы ее можно было обработать выше.
  }

}

// Экспорт функций
module.exports.saveListedHTML = saveListedHTML;
module.exports.filterChatBoxesRemoveListed = filterChatBoxesRemoveListed;