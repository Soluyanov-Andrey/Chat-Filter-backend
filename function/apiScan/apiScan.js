const { extractContextsFromChatPrompts } = require('./scan'); 
const { doesFileSyncExist } = require('./../subsidiaryFunction/fileUtils'); 
const { saveNewFile } = require('./../subsidiaryFunction/deleteNavBlock'); 

async function apiScan(path_file_name_new, full_path, request_path) {
    try {
      // 1. Проверяем, существует ли файл
      const fileExists = await doesFileSyncExist(path_file_name_new);
  
      // 2. Выполняем saveNewFile, если файл не существует (или пропускаем)
      if (!fileExists) {
        await saveNewFile(full_path, path_file_name_new);
        console.log(`saveNewFile успешно завершена для path: ${request_path}`);
      } else {
        console.log(`Файл по пути ${full_path} уже существует, saveNewFile пропущен.`);
      }
  
      // 3. Извлекаем контексты
      const extractedContexts = await extractContextsFromChatPrompts(path_file_name_new);
  
      return extractedContexts; // Возвращаем извлеченные контексты
  
    } catch (error) {
      console.error('Ошибка в apiScan:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiScan = apiScan;