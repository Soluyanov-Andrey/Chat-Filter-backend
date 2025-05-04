const { scanFoldersForDocs } = require('./folderStructure'); 



async function apiFolderStructure(path) {
    try {
      
        const  extracted = await scanFoldersForDocs(path);
      return extracted; // Возвращаем извлеченные контексты
  
    } catch (error) {
      console.error('Ошибка в apiFolderStructure:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiFolderStructure = apiFolderStructure;