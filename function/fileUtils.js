// Синхронная функция для сохранения файла
const fs = require('fs');

function saveHtmlToFile(filePath, htmlContent) {
    try {
      fs.writeFileSync(filePath, htmlContent);
      console.log('Файл успешно сохранен:', filePath);
    } catch (err) {
      console.error('Ошибка при записи файла:', err);
    }
  }


function readFileContent(path, encoding = 'utf8') {
    // Базовая проверка входных параметров
     if (!path || typeof path !== 'string') {
          throw new Error('Путь к файлу должен быть строкой и не может быть пустым');
     }
      
    try {
          // Читаем файл
          const content = fs.readFileSync(path, encoding);
          
          // Можно добавить дополнительную проверку содержимого
          if (typeof content !== 'string') {
              throw new Error('Не удалось прочитать файл как строку');
          }
          
          return content;
      } catch (error) {
          // Логируем ошибку
          console.error('Ошибка при чтении файла:', error.message);
          throw error; // Перебрасываем ошибку дальше, если нужно
      }
  }
  

module.exports.readFileContent = readFileContent;
module.exports.saveHtmlToFile = saveHtmlToFile;