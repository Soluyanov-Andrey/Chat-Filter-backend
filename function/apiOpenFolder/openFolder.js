const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Извлекает атрибут href и текст из всех тегов <a> в HTML-файле.
 *
 * @param {string} filePath - Путь к HTML-файлу.
 * @returns {Array<Object>} Массив объектов, каждый из которых содержит `href` и `topic`.
 *                           Возвращает пустой массив, если теги <a> не найдены или если произошла ошибка.
 */
function extractHrefAndTopicFromFile(filePath) {
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(htmlContent);
    const results = [];

    $('a').each((index, element) => {
      const href = $(element).attr('href');
      const topic = $(element).text().trim(); // Извлекаем текстовое содержимое тега <a>

      if (href && topic) { // Проверяем, что и href, и topic являются допустимыми
          // Извлекаем только имя файла "in*.html" из относительного пути
          const filename = href.split('/').pop();

          results.push({
            href: filename,  // Сохраняем только имя файла
            topic: topic,
          });
      }
    });

    return results;
  } catch (error) {
    console.error("Ошибка чтения или разбора HTML-файла:", error);
    return [];  // Возвращаем пустой массив в случае ошибок.
  }
}

// Пример использования: (Предполагается, что вы сохранили HTML-контент в файле с именем 'index.html')
// const results = extractHrefAndTopicFromFile('index.html');
// console.log(results);

module.exports.extractHrefAndTopicFromFile = extractHrefAndTopicFromFile; // Экспортируем функцию для тестирования