const fs = require('fs');
const path = require('path'); // Импортируем модуль 'path' для работы с путями
const { saveFilterHTML } = require('../subsidiary/deleteAllScaner');
const { findMaxNumberInFilenames } = require('./additionalFunctions');
const { extractContextsFromChatPrompts } = require('../apiScan/scan');

/**
 * Обертка для асинхронного вызова createPage.  Определяет следующий доступный номер файла
 * и вызывает createPage с этим номером.
 *
 * @async
 * @function createPageWrapper
 * @param {string} filePath - Путь к исходному HTML файлу, который будет обрабатываться.
 * @param {string} scanDerectory - Директория, в которой производится сканирование существующих файлов. Используется для определения следующего доступного номера.
 * @param {string} outputDir - Директория, в которую будут сохранены отфильтрованные HTML файлы.
 * @throws {Error} Если происходит ошибка при определении максимального номера файла или при создании страниц, ошибка пробрасывается дальше для обработки.
 * @returns {Promise<void>} - Promise, который разрешается, когда создание страниц завершено.  Void, так как возвращает ошибку если таковая есть.
 */
async function createPageWrapper(filePath, scanDerectory, outputDir) { // Обертка для асинхронного вызова
    try {
      const initialFileNumber = await findMaxNumberInFilenames(scanDerectory);
      await createPage(filePath, outputDir, initialFileNumber + 1); // Передаем увеличенный номер
    } catch (error) {
      console.error("Ошибка при создании страниц:", error);
      throw error; // Пробрасываем ошибку дальше, чтобы ее можно было обработать
    }
  }


/**
 * Асинхронно создает  HTML файлы на основе извлеченных контекстов из исходного файла.
 *
 * @async
 * @function createPage
 * @param {string} filePath - Путь к исходному HTML файлу, из которого будут извлечены контексты.
 * @param {string} outputDir - Директория, в которую будут сохранены отфильтрованные HTML файлы.
 * @param {number} initialFileNumber - Начальный номер файла для генерации имен новых файлов.
 * @throws {Error} Если происходит ошибка при извлечении контекстов или сохранении отфильтрованных HTML файлов, ошибка пробрасывается дальше для обработки.
 * @returns {Promise<Array<any>>} - Promise, который разрешается с массивом извлеченных контекстов (`arrayResult`) после успешного создания и сохранения всех файлов.
 */
async function createPage(filePath, outputDir, initialFileNumber) {


    try {
      const arrayResult = await extractContextsFromChatPrompts(filePath);
  
      let currentFileNumber = initialFileNumber;
  
      for (const element of arrayResult) { // Используем for...of
        const newFileName = `C${currentFileNumber}.html`;
        const pathFileNew = path.join(outputDir, newFileName);
        console.log('---------------');
        console.log('createPage', pathFileNew);
  
        await saveFilterHTML(filePath, pathFileNew, element); // Используем импортированную функцию
  
        currentFileNumber++; // Увеличиваем номер файла
      }
  
      return arrayResult;
    } catch (error) {
      console.error("Произошла ошибка в createPage:", error);
      throw error;
    }
  }

module.exports.createPageWrapper = createPageWrapper;