const fs = require('fs');
const path = require('path'); // Импортируем модуль 'path' для работы с путями
const { saveFilterHTML } = require('../subsidiaryFunction/deleteAllScaner');
const { addListItems } = require('./saveInFailes'); 
const { saveHtmlToFile } = require('../subsidiaryFunction/fileUtils'); 

const { findMaxNumberInFilenames } = require('./additionalFunctions');
const { extractContextsFromChatPrompts } = require('../apiScan/scan');
const { shortenStrings } = require('../subsidiaryFunction/shortenStrings'); 





/**
 * Асинхронно создает  HTML файлы на основе извлеченных контекстов из исходного файла.
 *
 * @async
 * @function createPage
 * @param {string} outputDir - Директория, в которую будут сохранены отфильтрованные HTML файлы.
 * @param {number} initialFileNumber - Начальный номер файла для генерации имен новых файлов.
 * @param {array} arrayResult - 
 * @throws {Error} Если происходит ошибка при извлечении контекстов или сохранении отфильтрованных HTML файлов, ошибка пробрасывается дальше для обработки.
 * @returns {Promise<Array<any>>} - Promise, который разрешается с массивом извлеченных контекстов (`arrayResult`) после успешного создания и сохранения всех файлов.
 */
async function createPage(outputDir, filePath, initialFileNumber, nameFile, arrayResult) {


  try {
  
    let currentFileNumber = initialFileNumber;

  
      const newFileName = `${nameFile}${currentFileNumber}.html`;
      const pathFileNew = path.join(outputDir, newFileName);

      console.log('-----Создаем файл----------');
      console.log('createPage', pathFileNew);
    
    

     await saveFilterHTML(filePath, pathFileNew, element); // Используем импортированную функцию
    
     addListItems(html, linkTexts, startNumber);
     saveHtmlToFile(filePath, htmlContent);

      currentFileNumber++; // Увеличиваем номер файла
    

    return arrayResult;
  } catch (error) {
    console.error("Произошла ошибка в createPage:", error);
    throw error;
  }
}




module.exports.createPage = createPage;
