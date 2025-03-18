/**
 * Оставляем указаные строки остальное удаляем
 */

const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');
const isSimilar = require('./isSimilar');

const { saveHtmlToFile } = require('./fileUtils'); 
const { readFileContent } = require('./fileUtils');

/**
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

            // Проверяем, содержится ли текст блока в массиве targetTexts
            for (const targetText of targetTexts) {
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
                console.log("------------------------------------------------");
                console.log(parentChatBox);
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
function saveFilterHTML(pathFile, pathFileNew,targetTexts){
    readFile = readFileContent(pathFile);
    filterHTML = filterHTMLElementsByText(readFile,targetTexts);
    console.log(filterHTML);

    saveHtmlToFile(pathFileNew,filterHTML);
}

// Экспорт функции
module.exports.saveFilterHTML =  saveFilterHTML;
module.exports.filterHTMLElementsByText =  filterHTMLElementsByText;

