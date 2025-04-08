/**
 * Синхронно сохраняет HTML-контент в файл по указанному пути.
 *
 * Функция записывает предоставленный HTML-контент в файл,
 * используя синхронную операцию записи `fs.writeFileSync`.
 * В случае успеха, функция выводит сообщение в консоль об успешном
 * сохранении файла. В случае ошибки при записи, функция выводит
 * сообщение об ошибке в консоль.
 *
 * @param {string} filePath - Путь к файлу, в который нужно сохранить HTML-контент.
 * @param {string} htmlContent - HTML-контент, который нужно сохранить в файл.
 * @returns {void} Функция ничего не возвращает.
 * @throws {Error}  Функция не выбрасывает исключения напрямую, но
 * `fs.writeFileSync` может выбросить исключение в случае ошибки
 * записи (например, нет доступа к файлу).  Вместо этого функция
 * перехватывает ошибку и выводит её в консоль.
 */

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


/**
 * Читает содержимое текстового файла по указанному пути.
 *
 * Функция выполняет базовую проверку входных параметров,
 * читает файл синхронно, проверяет, что содержимое является строкой,
 * и возвращает содержимое файла.  В случае ошибки при чтении или
 * парсинге файла, функция логирует ошибку в консоль и выбрасывает
 * исключение.
 *
 * @param {string} path - Путь к текстовому файлу.  Должен быть
 * строкой, не может быть пустым или null.
 * @param {string} [encoding='utf8'] - Кодировка файла (по умолчанию 'utf8').
 * @returns {string} Содержимое текстового файла.
 * @throws {Error} Если путь к файлу не является строкой или является
 * пустым.
 * @throws {Error} Если не удалось прочитать файл или содержимое файла
 * не является строкой.  Сообщение об ошибке будет содержать детали
 * произошедшей ошибки.
 */

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

/**
 * Синхронно копирует файл из исходного пути в целевой путь с возможностью переименования.
 *
 * @param {string} source - Путь к исходному файлу, который нужно скопировать.
 * @param {string} destination - Путь, куда нужно скопировать файл. Это может быть директория или полный путь к файлу.
 * @param {string} [newFileName=null] - Опциональное новое имя файла. Если указано, файл будет переименован при копировании.
 *
 * @example
 * Копирует файл в директорию без переименования
 * copyFileSync('source/file.txt', 'destination/');
 *
 * @example
 * Копирует файл в директорию с переименованием
 * copyFileSync('source/file.txt', 'destination/', 'newfile.txt');
 *
 * @example
 * Копирует файл с указанием полного пути и переименованием
 * copyFileSync('source/file.txt', 'destination/oldfile.txt', 'newfile.txt');
 */


function copyFileSync(source, destination, newFileName = null) {
  try {
    // Если destination — это директория, добавляем имя файла
    if (fs.existsSync(destination) && fs.lstatSync(destination).isDirectory()) {
      const fileName = newFileName || path.basename(source); // Используем новое имя или исходное
      destination = path.join(destination, fileName);
    } else if (newFileName) {
      // Если destination — это путь к файлу, заменяем имя файла
      const dir = path.dirname(destination);
      destination = path.join(dir, newFileName);
    }

    // Копируем файл
    fs.copyFileSync(source, destination);
    console.log(`Файл скопирован из ${source} в ${destination}`);
  } catch (err) {
    console.error(`Ошибка при копировании файла: ${err}`);
  }
}

/**
 * Синхронно проверяет существование файла по указанному пути.
 *
 * @param {string} filePath Путь к файлу.
 * @returns {boolean} `true`, если файл существует, `false` в противном случае.
 */
function doesFileSyncExist(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true; // Если fs.accessSync не выбрасывает исключение, файл существует
  } catch (err) {
    return false; // Файл не существует или нет прав доступа
  }
}

module.exports.doesFileSyncExist =  doesFileSyncExist;
module.exports.copyFileSync =  copyFileSync;
module.exports.readFileContent = readFileContent;
module.exports.saveHtmlToFile = saveHtmlToFile;