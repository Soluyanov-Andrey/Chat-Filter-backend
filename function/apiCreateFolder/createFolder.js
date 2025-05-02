const fs = require('fs-extra');
const path = require('path');

/**
 * Синхронно копирует содержимое директории из исходного местоположения в целевое.
 * 
 * Эта функция выполняет копирование синхронно, что означает, что она блокирует
 * основной поток выполнения Node.js до тех пор, пока копирование не завершится.
 *
 * @param {string} source - Полный путь к исходной директории, которую необходимо скопировать.
 * @param {string} destination - Полный путь к целевой директории, куда будет скопировано содержимое.
 *                               Если целевая директория не существует, она будет создана.
 * @throws {Error} Если параметр `destination` не указан, функция выбросит ошибку.
 *
 * @example
 * // Копирование папки 'my-source-folder' из /path/to в /path/to/destination/my-source-folder
 * copyDirectory('/path/to/my-source-folder', '/path/to/destination');
 * 
 * @remarks
 * Используйте эту функцию с осторожностью, так как она блокирует основной поток.
 * Рассмотрите возможность использования асинхронной версии, если копирование может занять длительное время.
 * 
 * @see {@link https://github.com/jprichardson/node-fs-extra | fs-extra} - Библиотека, используемая для синхронного копирования.
 */

function copyDirectory(source, destination) {
  if (!destination) {
    throw new Error('Не указан параметр destination');
  }

  try {
    // Получаем имя папки из исходного пути
    const folderName = path.basename(source);
    // Создаем новый путь для назначения, включая имя папки
    const newDestination = path.join(destination, folderName);
    console.log('newDestination--',newDestination);
    console.log('source--',source);

    console.log('Текущий рабочий каталог:', process.cwd());
    console.log('Абсолютный путь к source:', path.resolve(source));
    console.log('Файл/каталог document существует?', fs.existsSync(source));


    // Копируем папку с её содержимым
    fs.copySync(source, newDestination);
    console.log(`Папка "${folderName}" скопирована успешно в "${newDestination}"!`);
  } catch (err) {
    console.error('Ошибка при копировании папки:', err);
  }
}

module.exports.copyDirectory = copyDirectory;