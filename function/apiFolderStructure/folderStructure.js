const fs = require('fs');
const path = require('path');

/**
 * Сканирует директорию, заходит внутрь каждой папки и проверяет наличие папки "document".
 * Возвращает список папок с информацией о наличии "document".
 *
 * @param {string} directoryPath - Путь к директории для сканирования (по умолчанию ".").
 * @returns {Promise<object>} - Promise, разрешающийся в JSON-объект со списком папок и их типами.
 *                             В случае ошибки Promise отклоняется.
 */

async function scanFoldersForDocs(directoryPath = '/media/andrey/Рабочий/flash/help.ru') {
  try {
    const items = await fs.promises.readdir(directoryPath, { withFileTypes: true });

    const folders = [];

    for (const item of items) {
      if (item.isDirectory()) {
        const folderPath = path.join(directoryPath, item.name);
       
        const documentFolderPath = path.join(folderPath, 'document');
        
        let hasDocumentFolder = false;
        try {
           
          // Проверяем существование папки "document" вернет объект данных если такой путь есть если нет ничего не вернет
          const documentFolderStats = await fs.promises.stat(documentFolderPath);
          hasDocumentFolder = documentFolderStats.isDirectory();
         
        } catch (statErr) {
          // Папка "document" не существует или произошла другая ошибка
          hasDocumentFolder = false;
        }

        folders.push({
          name: item.name,
          type: hasDocumentFolder ? 'folder+' : 'folder-'
        });
      }
    }

    return { folders: folders };

  } catch (err) {
    console.error('Error scanning directory:', err);
    throw new Error(`Failed to scan directory: ${err.message}`);
  }
}

module.exports = scanFoldersForDocs;

// // Пример использования:
// async function main() {
//   try {
//     const folderList = await scanFoldersForDocs();
//     console.log(JSON.stringify(folderList, null, 2));
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// main();