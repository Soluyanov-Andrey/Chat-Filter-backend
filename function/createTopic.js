const cheerio = require('cheerio');
const fs = require('fs');
const { readFileContent } = require('./fileUtils');
const { saveHtmlToFile } = require('./fileUtils');


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
              regex = /\.\/themes\/in(\d+)\.html/;
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
 * Добавляет новую ссылку после последнего элемента <a> в HTML.
 *
 * @param {string} htmlCode  Исходный HTML-код.
 * @param {number} number  Цифра для вставки в href новой ссылки.
 * @returns {string}  Измененный HTML-код с добавленной ссылкой.
 */

function insertNewLinkAfterLast(htmlCode, number, topic) {
    try {
      const $ = cheerio.load(htmlCode, { decodeEntities: false });
      const aElements = $('a'); // Находим все элементы <a>
  
      const newLink = `
    <br>
    <a href="./themes/in${number}.html" target="leftframe">${topic}`; // Формируем HTML новой ссылки
  
      if (aElements.length > 0) {
        aElements.last().after(newLink); // Вставляем новую ссылку после последнего <a>
      } else {
        // Если нет существующих <a>, добавляем ссылку в конец <body>
        $('body').append(newLink);
      }
  
      return $.html(); // Возвращаем измененный HTML-код
    } catch (error) {
      console.error("Ошибка при обработке HTML:", error);
      return htmlCode; // Возвращаем исходный HTML в случае ошибки
    }
  }

// // Синхронная функция для сохранения файла
// function saveHtmlToFile(filePath, htmlContent) {
//     try {
//       fs.writeFileSync(filePath, htmlContent);
//       console.log('Файл успешно сохранен:', filePath);
//     } catch (err) {
//       console.error('Ошибка при записи файла:', err);
//     }
//   }

// function readFileContent(path, encoding = 'utf8') {
//     // Базовая проверка входных параметров
//     if (!path || typeof path !== 'string') {
//         throw new Error('Путь к файлу должен быть строкой и не может быть пустым');
//     }
    
//     try {
//         // Читаем файл
//         const content = fs.readFileSync(path, encoding);
        
//         // Можно добавить дополнительную проверку содержимого
//         if (typeof content !== 'string') {
//             throw new Error('Не удалось прочитать файл как строку');
//         }
        
//         return content;
//     } catch (error) {
//         // Логируем ошибку
//         console.error('Ошибка при чтении файла:', error.message);
//         throw error; // Перебрасываем ошибку дальше, если нужно
//     }
// }


/**
 * Добавляет новую ссылку после последнего элемента <a> в HTML.
 *
 * @param {string} path  путь к файлу в который нужно добавить тему.
 * @param {string} topic добавляемая тема
 */

function createTopic(path,topic){
    let htmlContent = readFileContent(path);
console.log(htmlContent);

    let extractnumber = extractLastHrefNumber(htmlContent);

    console.log(extractnumber);
    let insert = insertNewLinkAfterLast(htmlContent, extractnumber+1, topic);
    saveHtmlToFile(path, insert);

}

//Экспортируем для тестов
// module.exports.readFileContent = readFileContent;
module.exports.extractLastHrefNumber = extractLastHrefNumber;
module.exports.insertNewLinkAfterLast = insertNewLinkAfterLast;

//Экспортируем для приложения
module.exports.createTopic = createTopic;