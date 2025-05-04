const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');
const isSimilar = require('../subsidiaryFunction/isSimilar');

const { saveHtmlToFile } = require('../subsidiaryFunction/fileUtils.js'); 
const { readFileContent } = require('../subsidiaryFunction/fileUtils.js');

/**
 * Оставляем указаные строки остальное удаляем
 * 
 * Фильтрует блоки .chat-box__human--prompt, оставляя блоки
 * .wrap-ai-completed и .chat-box human, содержащие текст из массива targetTexts.
 * Ищет .wrap-ai-completed следующий за .chat-box human
 * @returns {string } htmlContent входные данные
 * @param {string[]} targetTexts - Массив текстов, которые нужно сохранить.
 * @returns {Promise<void>}
 */
function filterHTMLElementsByText(htmlContent, targetTexts) {
    try {
   
        const $ = cheerio.load(htmlContent);

        let elementsToRemove = []; // Массив для хранения элементов для удаления

        $('.chat-box__human--prompt').each((index, element) => {
           
                
            const boxText = $(element).text().trim();
          
            let shouldKeep = false; // Флаг, указывающий, нужно ли оставить блок

            // Преобразуем `targetTexts` в массив, если это строка
            const targetTextsArray = Array.isArray(targetTexts) ? targetTexts : [targetTexts];

            // Проверяем, содержится ли текст блока в массиве targetTexts
            for (const targetText of targetTextsArray) {
                // console.log("------------------------------------------------");
                // console.log(boxText);
                // console.log(targetText);
                // console.log("------------------------------------------------");
                if (isSimilar(boxText, targetText)) {
                    console.log("это совпадает!!!!!!!!!!!!");
                    shouldKeep = true;
                    break; // Если текст найден, выходим из цикла
                }
            }

            if (!shouldKeep) {
                // Если текст не совпадает ни с одним из targetTexts, добавляем блоки для удаления
                let parentChatBox = $(element).closest('.chat-box.human');
                let wrapAiCompleted = parentChatBox.next('.wrap-ai-completed');
                // console.log("------------------------------------------------");
                // console.log(parentChatBox);
                if (wrapAiCompleted.length > 0) {
                    elementsToRemove.push(wrapAiCompleted[0]);
                }

                if (parentChatBox.length > 0) {
                    elementsToRemove.push(parentChatBox[0]);
                }
            }
        });

        //Удаляем элементы из DOM (важно делать это после итерации)
        elementsToRemove.forEach(el => {
            $(el).remove();
        });

        // elementsToRemove.forEach(el => {
        //     $(el).addClass('del');
        // });
        
        const filteredHtml = $.html();

        return filteredHtml;

    } catch (error) {
        console.error(`Ошибка при обработке файла: ${error}`);
    }
}

/**
 * Фильтрует HTML-файл оставляя выбранные строки и сохраняет результат в новый файл
 * 
 * @async
 * @function saveFilterHTML
 * @param {string} pathFile - Путь к исходному HTML-файлу для обработки
 * @param {string} pathFileNew - Путь для сохранения отфильтрованного HTML-файла
 * @param {string|string[]} targetTexts - Текст или массив текстов для поиска в файле
 * @returns {Promise<void>}
 * 
 * @description Выполняет последовательно:
 *   1. Чтение исходного HTML-файла
 *   2. Фильтрацию содержимого через filterHTMLElementsByText()
 *   3. Сохранение результата в новый файл
 * 
 * @throws {Error} Если возникает ошибка:
 *   - При чтении исходного файла
 *   - При обработке HTML
 *   - При сохранении нового файла
 * 
 * @example
 * // Базовое использование
 * await saveFilterHTML('input.html', 'output.html', ['текст1', 'текст2']);
 * 
 * @see {@link filterHTMLElementsByText} - Функция фильтрации HTML
 * @see {@link readFileContent} - Функция чтения файла
 * @see {@link saveHtmlToFile} - Функция сохранения файла
 */

async function saveFilterHTML(pathFile, pathFileNew, targetTexts) {
    try {
      const readFile = await readFileContent(pathFile);
      const filterHTML = filterHTMLElementsByText(readFile, targetTexts);
      // console.log(filterHTML);
  
      await saveHtmlToFile(pathFileNew, filterHTML);
  
    } catch (error) {
      console.error(`Ошибка при обработке и сохранении файла: ${error}`);
      throw error; //  Пробрасываем ошибку, чтобы ее можно было обработать выше.
    }
  
  }



// Экспорт функции
module.exports.saveFilterHTML =  saveFilterHTML;
module.exports.filterHTMLElementsByText =  filterHTMLElementsByText;

