/**
 * Оставляем указаные строки остальное удаляем
 */

const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');

/**
 * Фильтрует блоки .chat-box__human--prompt, оставляя блоки
 * .wrap-ai-completed и .chat-box human, содержащие текст из массива targetTexts.
 * Ищет .wrap-ai-completed следующий за .chat-box human
 * @param {string} filePath - Путь к исходному HTML файлу.
 * @param {string} outputPath - Путь для сохранения отфильтрованного HTML.
 * @param {string[]} targetTexts - Массив текстов, которые нужно сохранить.
 * @returns {Promise<void>}
 */
async function filterChatBoxesKeepParentsNextMultiple(filePath, outputPath, targetTexts) {
    try {
        const htmlContent = await fs.readFile(filePath, 'utf-8');
        const $ = cheerio.load(htmlContent);

        let elementsToRemove = []; // Массив для хранения элементов для удаления

        $('.chat-box__human--prompt').each((index, element) => {
            const boxText = $(element).text().trim();
            let shouldKeep = false; // Флаг, указывающий, нужно ли оставить блок

            // Проверяем, содержится ли текст блока в массиве targetTexts
            for (const targetText of targetTexts) {
                if (boxText === targetText) {
                    shouldKeep = true;
                    break; // Если текст найден, выходим из цикла
                }
            }

            if (!shouldKeep) {
                // Если текст не совпадает ни с одним из targetTexts, добавляем блоки для удаления
                let parentChatBox = $(element).closest('.chat-box.human');
                let wrapAiCompleted = parentChatBox.next('.wrap-ai-completed');

                if (wrapAiCompleted.length > 0) {
                    elementsToRemove.push(wrapAiCompleted[0]);
                }

                if (parentChatBox.length > 0) {
                    elementsToRemove.push(parentChatBox[0]);
                }
            }
        });

        // Удаляем элементы из DOM (важно делать это после итерации)
        elementsToRemove.forEach(el => {
            $(el).remove();
        });

        const filteredHtml = $.html();

        await fs.writeFile(outputPath, filteredHtml, 'utf-8');
        console.log(`Отфильтрованный HTML сохранен в ${outputPath}`);

    } catch (error) {
        console.error(`Ошибка при обработке файла: ${error}`);
    }
}

// Пример использования:
const inputFile = path.join(__dirname, 'copy.html');
const outputFile = path.join(__dirname, 'output.html');
const targetTexts = ['как mdфайл приобразовать в html используя node js', 
                     'есть html файл как сделать чтоб он отобразился через node js сервер']; // Массив текстов для сохранения

filterChatBoxesKeepParentsNextMultiple(inputFile, outputFile, targetTexts);
