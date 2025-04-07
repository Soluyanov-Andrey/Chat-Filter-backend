const fs = require('fs');
const path = require('path'); // Импортируем модуль 'path' для работы с путями
const { saveFilterHTML } = require('../subsidiary/deleteAllScaner');
const { removeSidebarNav } = require('../subsidiary/deleteNavBlock');
const { findMaxNumberInFilenames } = require('./additionalFunctions');
const { extractContextsFromChatPrompts } = require('../apiScan/scan');

async function createPageWrapper(filePath, scanDerectory, outputDir) { // Обертка для асинхронного вызова
    try {
      const initialFileNumber = await findMaxNumberInFilenames(scanDerectory);
      await createPage(filePath, outputDir, initialFileNumber + 1); // Передаем увеличенный номер
    } catch (error) {
      console.error("Ошибка при создании страниц:", error);
      throw error; // Пробрасываем ошибку дальше, чтобы ее можно было обработать
    }
  }


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