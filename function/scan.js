const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

/**
 * Читает HTML-файл, находит все элементы с классом "chat-box__human--prompt" и возвращает
 * массив их текстового содержимого.
 * @param {string} filePath - Путь к HTML-файлу.
 * @returns {string[]} - Массив текстового содержимого элементов с указанным классом.
 *                         Возвращает пустой массив, если файл не найден или произошла ошибка.
 */

function extractContextsFromChatPrompts(filePath) {
  try {
    // 1. Читаем файл синхронно.  Обработка ошибок обязательна.
    const html = fs.readFileSync(filePath, 'utf8');

    // 2. Используем Cheerio для парсинга HTML.
    const $ = cheerio.load(html);

    // 3. Выбираем все элементы с классом "chat-box__human--prompt".
    const elements = $('.chat-box__human--prompt');

    // 4. Преобразуем выбранные элементы в массив текстового содержимого.
    const contexts = elements.map((i, el) => $(el).text()).get();

    // 5. Возвращаем массив.
    return contexts;

  } catch (error) {
    console.error(`Ошибка при чтении или обработке файла ${filePath}:`, error);
    return []; // Важно: возвращаем пустой массив в случае ошибки.
  }
}

module.exports.extractContextsFromChatPrompts =  extractContextsFromChatPrompts; 
