const fs = require('fs');
const path = require('path');

/**
 * Сканирует текущую директорию и возвращает список папок в формате JSON.
 *
 * @param {string} directoryPath - Путь к директории для сканирования (по умолчанию "." - текущая директория).
 * @returns {Promise<object>} - Promise, разрешающийся в JSON-объект со списком папок.
 *                             В случае ошибки Promise отклоняется с сообщением об ошибке.
 */
async function scanDirectoryForFolders(directoryPath = '.') {
  try {
    const items = await fs.promises.readdir(directoryPath, { withFileTypes: true });

    const folders = items
      .filter(item => item.isDirectory())//Оставляем в масиве items только то что директория
      .map(item => ({ name: item.name }));

    return { folders: folders };

  } catch (err) {
    console.error('Error scanning directory:', err);
    throw new Error(`Failed to scan directory: ${err.message}`); // Пробрасываем ошибку для обработки
  }
}

// Пример использования:
async function main() {
  try {
    const folderList = await scanDirectoryForFolders('.'); // Сканируем текущую директорию
    console.log(JSON.stringify(folderList, null, 2)); // Выводим JSON в консоль
  } catch (error) {
    console.error('Error:', error.message); // Обрабатываем ошибку
  }
}

main();