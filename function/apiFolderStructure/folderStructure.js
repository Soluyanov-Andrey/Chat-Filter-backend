const fs = require('fs');
const path = require('path');


/**
 * Сканирует директорию (синхронно).
 *
 * @param {string} directoryPath - Путь к директории для сканирования (по умолчанию ".").
 * @returns {object|null} - JSON-объект со списком папок и их типами, или null в случае ошибки.
 */
function scanFoldersForDocs(directoryPath = '/media/andrey/Рабочий/flash/help.ru') { // Убрали async
  try {
    const items = fs.readdirSync(directoryPath, { withFileTypes: true }); // Используем синхронную функцию

    const folders = [];

    for (const item of items) {
      if (item.isDirectory()) {
        const folderPath = path.join(directoryPath, item.name);

        const documentFolderPath = path.join(folderPath, 'document');

        let hasDocumentFolder = false;
        try {
          // Проверяем существование папки "document"
          const documentFolderStats = fs.statSync(documentFolderPath); // Используем синхронную функцию
          hasDocumentFolder = documentFolderStats.isDirectory();
        } catch (statErr) {
          // Папка "document" не существует
          hasDocumentFolder = false;
        }

        folders.push({
          name: item.name,
          type: hasDocumentFolder ? 'folder+' : 'folder-'
        });
      }
    }

    return { folders: folders }; // Возвращаем результат
  } catch (err) {
    console.error('Error scanning directory:', err);
    return null; // Возвращаем null в случае ошибки
  }
}

/**
 * Проверяет, является ли последняя папка в указанном пути "document".
 *
 * @param {string} filePath - Путь к файлу или папке.
 * @returns {boolean} True, если последняя папка называется "document", иначе false.
 */
function isLastFolderDocument(filePath) {
  const lastSegment = path.basename(filePath);
  return lastSegment === 'document';
}
module.exports.scanFoldersForDocs = scanFoldersForDocs;
module.exports.isLastFolderDocument = isLastFolderDocument;
