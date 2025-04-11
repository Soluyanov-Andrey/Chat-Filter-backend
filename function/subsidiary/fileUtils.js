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


/**
 * Заменяет существующий файл, удаляя старую версию и переименовывая временный файл.
 *
 * Эта функция выполняет следующие действия:
 * 1. Пытается удалить файл, указанный в `finalFilePath`. Если файл не существует,
 *    функция продолжает выполнение без ошибок.  Если происходит другая ошибка при
 *    удалении файла, функция прекращает выполнение и возвращает `false`.
 * 2. Переименовывает файл, указанный в `tempFilePath`, в `finalFilePath`.
 *    Если происходит ошибка во время переименования, функция прекращает выполнение
 *    и возвращает `false`.
 *
 * **Важно:** Эта функция использует синхронные методы модуля `fs`, что может
 *           привести к блокировке основного потока выполнения Node.js.
 *           Рекомендуется использовать асинхронные методы для неблокирующей работы с файлами,
 *           если это возможно.
 *
 * @param {string} tempFilePath - Путь к временному файлу, который нужно переименовать.
 * @param {string} finalFilePath - Путь к финальному файлу, который должен быть заменен.
 * @returns {boolean} - `true`, если замена файла выполнена успешно, `false` в случае ошибки.
 *
 * @throws {Error} - Возможные ошибки файловой системы (например, отсутствие прав доступа,
 *                 несуществующий файл или директория, и т.д.), которые могут быть
 *                 выброшены синхронными методами `fs.unlinkSync` и `fs.renameSync`.
 *                 Однако, функция перехватывает и обрабатывает эти ошибки, возвращая `false`.
 *
 * @example
 * // Пример использования:
 * const TEMP_FILE = 'ChatGPT_NEW_TEMP.html';
 * const FINAL_FILE = 'ChatGPT_NEW.html';
 *
 * const success = replaceFile(TEMP_FILE, FINAL_FILE);
 *
 * if (success) {
 *   console.log("Замена файла выполнена успешно.");
 * } else {
 *   console.error("Замена файла не удалась.");
 * }
 */

function replaceFile(tempFilePath, finalFilePath) {
  console.log(finalFilePath);
  // if (fs.existsSync(finalFilePath)) {
  //   console.log("Файл существует. Попытка удаления.");
  //   // fs.unlinkSync(finalFilePath);
  // } else {
  //   console.log("Файл не существует.");
  // }
  
  try {
    // 1. Пытаемся удалить финальный файл (если он существует)
    try {
      fs.unlinkSync(finalFilePath);
      console.log(`Файл ${finalFilePath} успешно удален.`);
    } catch (unlinkError) {
      // Если файла не существует, то это не ошибка. Просто продолжаем.
      if (unlinkError.code !== 'ENOENT') {
        // Если это другая ошибка, то выбрасываем её.
        console.error(`Ошибка при удалении файла ${finalFilePath}:`, unlinkError);
        return false; // Прекращаем выполнение из-за ошибки
      } else {
        console.log(`Файл ${finalFilePath} не существует, продолжаем.`);
      }
    }

    // // 2. Переименовываем временный файл в финальный файл
    fs.renameSync(tempFilePath, finalFilePath);
    console.log(`Файл ${tempFilePath} успешно переименован в ${finalFilePath}.`);

    return true; // Успешное выполнение
  } catch (error) {
    console.error("Ошибка при замене файла:", error);
    return false; // Неудача
  }
}

module.exports.replaceFile =  replaceFile;
module.exports.doesFileSyncExist =  doesFileSyncExist;
module.exports.copyFileSync =  copyFileSync;
module.exports.readFileContent = readFileContent;
module.exports.saveHtmlToFile = saveHtmlToFile;