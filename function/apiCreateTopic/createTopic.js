const cheerio = require('cheerio');
const fs = require('fs');
const { readFileContent } = require('../subsidiaryFunction/fileUtils');
const { saveHtmlToFile } = require('../subsidiaryFunction/fileUtils');



/**
 * Извлекает числовой идентификатор из href последней ссылки в HTML-коде.
 *
 * @param {string} htmlCode HTML-код для парсинга.
 * @param {string} patternType Тип шаблона для извлечения. Доступные значения: 'inTheme', 'productItem', 'imageName'.
 * @returns {number|null} Извлеченное число или null, если извлечение не удалось.
 */
function extractLastHrefNumber(htmlCode, patternType) {
  try {
      const $ = cheerio.load(htmlCode);
      const aElements = $('a');

      if (aElements.length === 0) {
          return null;
      }

      const lastHref = aElements.last().attr('href');

      if (!lastHref) {
          return null;
      }

      let regex;

      switch (patternType) {
          case 'inTheme':
            
              regex = /(?:\.\/)?themes\/in(\d+)\.html/;
              
              break;
          case 'html':
              regex = /(\d+)\.html/; // Извлекаем цифры перед ".html"
              break;
      
          default:
              console.error("Ошибка: неизвестный patternType:", patternType);
              return null;
      }

      const match = lastHref.match(regex);

      if (match && match[1]) {
          return parseInt(match[1], 10);
      }

      return null;
  } catch (error) {
      console.error("Ошибка при парсинге HTML:", error);
      return null;
  }
}

/**
 * Добавляет новую ссылку после последнего элемента <li> в HTML.
 *
 * @param {string} htmlCode  Исходный HTML-код.
 * @param {number} number  Цифра для вставки в href новой ссылки.
 * @returns {string}  Измененный HTML-код с добавленной ссылкой.
 */

function insertNewLinkAfterLast(htmlCode, number, topic) {
    try {
        const $ = cheerio.load(htmlCode, { decodeEntities: false });
        
        // Находим последний элемент li в списке
        const lastLi = $('#list li').last();
        
        // Формируем корректный HTML новой ссылки
        const newLink = `\n <li><a href="./themes/in${number}.html" target="leftframe">${topic}</a></li>`;
        
        // Вставляем новую ссылку после последнего li
        if (lastLi.length > 0) {
            lastLi.after(newLink);
        } else {
            // Если нет существующих li, добавляем ссылку в список
            $('#list').append(newLink);
        }

        return $.html(); // Возвращаем измененный HTML-код
    } catch (error) {
        console.error("Ошибка при обработке HTML:", error);
        return htmlCode; // Возвращаем исходный HTML в случае ошибки
    }
}

/**
 * создаем файл in1.html в дериктории где добавляем тему читая его из document на сервер
 * по сути делаем копирование, сначало читаем потом копируем
 */

function createInFile(pathDocument,pathNew){

    let htmlContent = readFileContent(pathDocument);
    
    
    // let htmlContent = readFileContent('document/themes/in1.html');

    console.log("--------------------------", htmlContent);
    console.log("pathDocument",pathDocument);
    console.log("pathNew",pathNew);
    console.log("htmlContent", htmlContent);
    console.log("--------------------------", htmlContent);
    saveHtmlToFile(pathNew ,htmlContent);

}



function extractNumberAndContent(path){

    let htmlContent = readFileContent(path);
    console.log(htmlContent);

    let extractNumber = extractLastHrefNumber(htmlContent,'inTheme');

    return { 
        htmlContent: htmlContent,
        extractedNumber: extractNumber 
    }
}

/**
 * Добавляет новую ссылку после последнего элемента <a> в HTML.в root файле
 *
 * @param {object} extract  объект содержит извлеченный htmlContent и extractedNumber
 * @param {string} path путь к папке
 * @param {string} topic добавляемая тема
 */

function createTopic(extract, path, topic){

   
    let insert = insertNewLinkAfterLast(extract.htmlContent,  extract.extractedNumber +1, topic);
    console.log("insert",insert);

     saveHtmlToFile(path, insert);

}


//Экспортируем для тестов

module.exports.extractLastHrefNumber = extractLastHrefNumber;
module.exports.insertNewLinkAfterLast = insertNewLinkAfterLast;

//Экспортируем для приложения
module.exports.extractNumberAndContent = extractNumberAndContent;
module.exports.createTopic = createTopic;
module.exports.createInFile = createInFile;