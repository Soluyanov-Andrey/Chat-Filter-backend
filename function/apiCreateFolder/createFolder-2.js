const dir = require('node-dir');
const fs = require('fs');
const path = require('path');

async function copyDirectoryNodeDir(source, destination) {
  try {
    const files = await dir.promiseFiles(source); // Получаем список всех файлов

    for (const file of files) {
      const relativePath = path.relative(source, file); // Относительный путь от исходной папки
      const destinationPath = path.join(destination, relativePath); // Полный путь в целевой папке

      // Создаем необходимые поддиректории
      await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });

      // Копируем файл
      await fs.promises.copyFile(file, destinationPath);
    }
    console.log(`Папка скопирована из ${source} в ${destination}`);
  } catch (err) {
    console.error(`Ошибка при копировании папки: ${err}`);
  }
}

// Пример использования:
const sourceDir = '/путь/к/исходной/папке';
const destinationDir = '/путь/к/целевой/папке';

copyDirectoryNodeDir(sourceDir, destinationDir);

module.exports.copyDirectoryNodeDir = copyDirectoryNodeDir;