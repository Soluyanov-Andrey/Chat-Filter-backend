const fs = require('fs');
const path = require('path'); // Импортируем модуль 'path' для работы с путями
const { saveFilterHTML } = require('../subsidiary/deleteAllScaner');
const { removeSidebarNav } = require('../subsidiary/deleteNavBlock');
const { extractContextsFromChatPrompts } = require('../apiScan/scan');


async function createPage(filePath, basePathFileNew, initialFileNumber) {
    try {
      const arrayResult = await extractContextsFromChatPrompts(filePath);
  
      let currentFileNumber = initialFileNumber;
  
      for (const element of arrayResult) { // Используем for...of
        const newFileName = `C${currentFileNumber}.html`;
        const pathFileNew = path.join(basePathFileNew, newFileName);
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

module.exports.createPage = createPage;