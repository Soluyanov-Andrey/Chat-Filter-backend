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
 * // Копирование содержимого папки 'my-source-folder' из /path/to в /path/to/destination
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
    // Использовать непосредственно переданный destination, а не создавать подпапку
    console.log('destination--', destination);
    console.log('source--', source);

    console.log('Текущий рабочий каталог:', process.cwd());
    console.log('Абсолютный путь к source:', path.resolve(source));
    console.log('Файл/каталог source существует?', fs.existsSync(source));

    // Копируем папку с её содержимым
    fs.copySync(source, destination);
    console.log(`Папка "${source}" скопирована успешно в "${destination}"!`); // Изменено сообщение
  } catch (err) {
    console.error('Ошибка при копировании папки:', err);
  }
}

function createFolder(source){

  // Синхронный способ (блокирует основной поток)
  try {
    console.log('создаем папку-',source );
    fs.mkdirSync(source +'/document');
    console.log('Папка успешно создана.');
  } catch (err) {
    console.error('Ошибка при создании папки:', err);
  }

}

module.exports.createFolder = createFolder;
module.exports.copyDirectory = copyDirectory;