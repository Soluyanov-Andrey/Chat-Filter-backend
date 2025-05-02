const fs = require('fs');
const path = require('path');

/**
 * Находит максимальную цифру в именах файлов в указанной директории и выводит результат в консоль.
 * имена файлов  без префикса просто цифры  1 2 3 4 и тд
 * @param {string} directory - Путь к директории с файлами.
 */
function findMaxNumberInFilenames(directory) {
    try {
        const filenames = fs.readdirSync(directory);
        let maxNumber = -1;

        for (const filename of filenames) {
            // Извлекаем числовую часть имени файла (без расширения)
            const baseName = path.basename(filename, path.extname(filename));
            const number = parseInt(baseName, 10); // Преобразуем имя файла в число

            if (!isNaN(number)) {
                maxNumber = Math.max(maxNumber, number);
            }
        }

        if (maxNumber !== -1) {
            return maxNumber;
        } else {
            console.log('В именах файлов не найдены цифры.');
        }

    } catch (err) {
        console.error(`Ошибка при чтении директории: ${err.message}`);
    }
}

/**
 * Находит максимальную цифру после дефиса в именах файлов, начинающихся с определенной строки, в указанной директории.
 *
 * @param {string} directory - Путь к директории с файлами.
 * @param {string} prefix - Префикс, с которого должны начинаться имена файлов (например, 'in2').
 * @returns {number} - Максимальное число после дефиса или -1, если файлы не найдены.
 */
function findMaxNumberAfterDash(directory, prefix) {
    try {
      const filenames = fs.readdirSync(directory);
      let maxNumber = -1;
  
      for (const filename of filenames) {
        if (filename.startsWith(prefix)) {
          const baseName = path.basename(filename, path.extname(filename)); // in2-1 , in2-2
          const parts = baseName.split('-'); //  [in2, 1]
          if (parts.length === 2) {
            const number = parseInt(parts[1], 10); // 1
            if (!isNaN(number)) {
              maxNumber = Math.max(maxNumber, number);
            }
          }
        }
      }
  
      if (maxNumber !== -1) {
        return maxNumber;
      } else {
        console.log(`Файлы с префиксом '${prefix}' не найдены или не содержат чисел после дефиса.`);
        return -1; // Вернуть -1 если не найдены файлы с числом
      }
    } catch (err) {
      console.error(`Ошибка при чтении директории: ${err.message}`);
      return -1; // Вернуть -1 при ошибке
    }
  }


module.exports.findMaxNumberAfterDash = findMaxNumberAfterDash;
module.exports.findMaxNumberInFilenames = findMaxNumberInFilenames;

