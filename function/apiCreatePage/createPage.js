const fs = require('fs');
const path = require('path');

/**
 * Находит максимальную цифру в именах файлов в указанной директории и выводит результат в консоль.
 *
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


module.exports.findMaxNumberInFilenames = findMaxNumberInFilenames;
