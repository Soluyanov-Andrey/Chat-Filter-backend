const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

/**
 * Получает массив имен файлов, находящихся в указанной директории.
 *
 * @param {string} dirPath Путь к директории, из которой нужно получить список файлов.
 * @returns {string[]} Массив строк, содержащий имена файлов (без путей) в указанной директории.
 *                     Возвращает пустой массив, если директория не существует, недоступна или возникает другая ошибка при чтении.
 *                     В случае ошибки информация об ошибке выводится в консоль.
 *
 * @example
 * // Предположим, что в директории '/my/directory' находятся файлы 'file1.txt' и 'file2.jpg'
 * const files = getFileNamesInDirectory('/my/directory');
 * // files будет равен: ['file1.txt', 'file2.jpg']
 *
 * @example
 * // Если директория '/nonexistent/directory' не существует
 * const files = getFileNamesInDirectory('/nonexistent/directory');
 * // в консоль будет выведено сообщение об ошибке и files будет равен: []
 */
function getFileNamesInDirectory(dirPath) {
  try {
    return fs.readdirSync(dirPath)
      .filter(file => { // Добавлена фильтрация
        try {
          return fs.statSync(path.join(dirPath, file)).isFile();
        } catch (statErr) {
          console.error(`Ошибка при получении информации о файле ${file}: ${statErr.message}`);
          return false; // Исключаем элемент из результата, если не удалось получить информацию о нем
        }
      });
  } catch (err) {
    console.error(`Ошибка при чтении директории: ${err.message}`);
    return []; // Возвращаем пустой массив в случае ошибки, или обработайте ошибку по-другому
  }
}


/**
 * Проверяет, содержит ли HTML-фрагмент теги <li> внутри тега <ul id="list">.
 *
 * @param {string} htmlString Строка, содержащая HTML-фрагмент для анализа.
 * @returns {boolean} `true`, если теги <li> найдены внутри <ul id="list">, `false` в противном случае.
 */
function hasLiElementsInsideList(htmlString) {
  try {
    const $ = cheerio.load(htmlString); // Загружаем HTML с помощью Cheerio
    const list = $('ul#list'); // Находим элемент <ul id="list">

    if (!list.length) {
      return false; // Если <ul id="list"> не найден, возвращаем false
    }

    const liElements = list.find('li'); // Находим все элементы <li> внутри <ul id="list">
    return liElements.length > 0; // Возвращаем true, если найден хотя бы один элемент <li>, иначе false
  } catch (error) {
    console.error('Ошибка при анализе HTML:', error.message);
    return false; // В случае ошибки при парсинге HTML, возвращаем false
  }
}



/**
 * Находит максимальную цифру в префиксе имени файла "pg" в указанной папке.
 * @param {string} directoryPath Путь к папке для сканирования.
 * @returns {number} Максимальная цифра в префиксе "pg" или 0, если файлов с таким префиксом не найдено.
 */
function findMaxPgNumber(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    let maxPgNumber = 0;

    for (const file of files) {
      const match = file.match(/^pg(\d+)-\d+\.html$/i); // Регулярное выражение для "pgN-N.html" (N - цифры)

      if (match) {
        const pgNumber = parseInt(match[1], 10); // Извлекаем и преобразуем цифру в число
        maxPgNumber = Math.max(maxPgNumber, pgNumber);
      }
    }

    return maxPgNumber;
  } catch (error) {
    console.error(`Ошибка при сканировании папки: ${error.message}`);
    return 0; // Возвращаем 0 в случае ошибки.
  }
}




/**
 * Находит максимальное число, содержащееся в начале имен файлов в указанной директории.
 *
 * @param {string} directory - Путь к директории, в которой нужно искать файлы.
 * @returns {number | undefined} Максимальное число, найденное в начале имен файлов.
 * Возвращает `undefined`, если директория не существует, нет доступа к ней, или в именах файлов не найдено ни одного числа, начинающегося с начала имени файла.
 *
 * @example
 * // Пример 1: Директория с файлами, имена которых начинаются с чисел
 * const maxNumber1 = findMaxNumberInFilenames('./images');
 * // Если директория './images' содержит файлы '1.jpg', '2.png', '10.gif', maxNumber1 будет равен 10.
 *
 * @example
 * // Пример 2: Директория с файлами, имена которых не начинаются с чисел
 * const maxNumber2 = findMaxNumberInFilenames('./documents');
 * // Если директория './documents' содержит файлы 'report.pdf', 'notes.txt', maxNumber2 будет равен undefined.
 *
 * @example
 * // Пример 3: Директория содержит смешанные файлы
 * const maxNumber3 = findMaxNumberInFilenames('./mixed');
 * // Если директория './mixed' содержит файлы '5.txt', 'abc.jpg', '12test.png', 'test.pdf', maxNumber3 будет равен 12.
 *
 * @example
 * // Пример 4: Директория не существует или нет доступа
 * const maxNumber4 = findMaxNumberInFilenames('./nonexistent');
 * // Если директории './nonexistent' не существует, maxNumber4 будет равен undefined,
 * // а в консоль будет выведено сообщение об ошибке.
 *
 * @throws {Error} Выводит сообщение об ошибке в консоль, если не удается прочитать директорию.
 */

function findMaxNumberInFilenames(directory) {
    try {
        const filenames = fs.readdirSync(directory);
        let maxNumber = -1;
        console.log('filename ', filenames);

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
 * @param {string} prefix - Префикс, с которого должны начинаться имена файлов (например, 'pg3').
 * @returns {number} - Максимальное число после дефиса или -1, если файлы не найдены.
 */
function findMaxNumberAfterDash(directory, prefix) {
    try {
      const filenames = fs.readdirSync(directory);
      let maxNumber = -1;
  
      for (const filename of filenames) {function findMaxNumberAfterDash(directory, prefix) {
        try {
          const filenames = fs.readdirSync(directory);
          let maxNumber = -1;
      
          for (const filename of filenames) {
            if (filename.startsWith(prefix)) {
              const baseName = path.basename(filename, path.extname(filename));
              const parts = baseName.split('-'); 
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
        if (filename.startsWith(prefix)) {
          const baseName = path.basename(filename, path.extname(filename));
          const parts = baseName.split('-'); 
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



/**
 * Удаляет указанную строку из текста.  Если нужно удалить все вхождения,
 * то значение 'removeAll' для параметра options.occurrence удалит все вхождения.
 *
 * @param {string} text Исходный текст.
 * @param {string} stringToRemove Строка, которую нужно удалить.
 * @param {object} [options] Дополнительные параметры.
 * @param {string} [options.occurrence='first'] 'first' (по умолчанию) для удаления только первого вхождения,
 *                                             'removeAll' для удаления всех вхождений.
 * @param {boolean} [options.caseSensitive=true] `true` (по умолчанию) для учета регистра, `false` для игнорирования регистра.
 * @returns {string} Текст с удаленной строкой.
 */
function removeStringFromText(text, stringToRemove, options = {}) {
  const { occurrence = 'first', caseSensitive = true } = options;

  let regexFlags = caseSensitive ? '' : 'i'; // 'i' для игнорирования регистра
  let regex;

  if (occurrence === 'removeAll') {
    // Экранируем специальные символы в stringToRemove для безопасного использования в регулярном выражении
    const escapedString = stringToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    regex = new RegExp(escapedString, `g${regexFlags}`); // 'g' для глобального поиска
  } else {
    // Удаляем только первое вхождение
    const escapedString = stringToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    regex = new RegExp(escapedString, regexFlags);
  }

  return text.replace(regex, '');
}



/**
 * Извлекает все значения атрибутов `href` из элементов `<a>`, находящихся внутри элемента `<ul id="list">` в HTML-строке,
 * и возвращает их в виде массива.  Предполагается, что значения `href` начинаются с './pages/'.
 *
 * @param {string} htmlString Строка, содержащая HTML для анализа.
 * @returns {string[]} Массив значений `href`.  Возвращает пустой массив, если `<ul id="list">` не найден,
 * или если в нем нет элементов `<a>` с атрибутом `href`, начинающимся с './pages/'.
 */
/**
 * Извлекает и преобразует значения атрибутов `href` из элементов `<a>`, находящихся внутри элемента `<ul id="list">` в HTML-строке.
 * Удаляет префикс "./pages/" из каждого значения `href`.
 *
 * @param {string} htmlString Строка, содержащая HTML для анализа.
 * @returns {string[]} Массив преобразованных значений `href`. Возвращает пустой массив, если `<ul id="list">` не найден,
 * или если в нем нет элементов `<a>` с атрибутом `href`, начинающимся с './pages/'.
 */
function extractAndTransformHrefs(htmlString) {
  try {
    const $ = cheerio.load(htmlString);
    const hrefs = [];

    $('ul#list li a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('./pages/')) {
        hrefs.push(href.replace('./pages/', '')); // Удаляем префикс
      }
    });

    return hrefs;
  } catch (error) {
    console.error('Ошибка при анализе HTML:', error.message);
    return [];
  }
}



/**
 * Анализирует массив имен файлов, имеющих вид 'pg[цифра]-[цифра].html', где первая цифра одинакова для всех файлов.
 * Возвращает массив из двух элементов:
 *  1. Первая цифра (pg[цифра] - эта цифра одинакова для всех файлов).
 *  2. Максимальное значение второй цифры (например, для 'pg2-1.html' это 1).
 *
 * @param {string[]} filenames Массив строк, представляющих имена файлов, где все имена начинаются с одного и того же pg[цифра].
 * @returns {[number, number] | [null, null]} Массив из двух чисел: [первая цифра, максимальное вторая цифра].
 *  Возвращает [null, null], если массив пуст или ни один из файлов не соответствует формату.
 *  Возвращает [null, null] также, если первая цифра в именах файлов не совпадает.
 */
function findMaxSecondDigitInFilenames(filenames) {
  if (!filenames || filenames.length === 0) {
    return [null, null];
  }

  let firstDigit = null;
  let maxSecondDigit = null;

  for (const filename of filenames) {
    const match = filename.match(/^pg(\d+)-(\d+)\.html$/);

    if (match) {
      const currentFirstDigit = parseInt(match[1], 10);
      const secondDigit = parseInt(match[2], 10);

      if (firstDigit === null) {
        firstDigit = currentFirstDigit; // Устанавливаем firstDigit из первого файла
      } else if (currentFirstDigit !== firstDigit) {
        // Если первая цифра не совпадает с ранее установленной, возвращаем null
        console.warn("Warning: Inconsistent first digit in filenames.");
        return [null, null];
      }

      if (maxSecondDigit === null || secondDigit > maxSecondDigit) {
        maxSecondDigit = secondDigit;
      }
    } else {
      console.warn(`Warning: Filename "${filename}" does not match the expected pattern.`);
      return [null, null]; // Если файл не соответствует формату, выходим
    }
  }

  if (firstDigit === null) {
    return [null, null]; // Если ни один файл не соответствует формату
  }

  return [firstDigit, maxSecondDigit];
}



/**
 * Добавляет новые элементы li в HTML-код с переносом строки между ними в файле root
 *
 * @param {string} html - Исходный HTML-код.
 * @param {string[]} linkTexts - Массив текстов ссылок для новых элементов li.
 * @param {number} startNumber - Начальное число для формирования href.
 * @returns {string} - HTML-код с добавленными элементами li.
 */
function addListItemsRoot(html, text, startNumber){
  const $ = cheerio.load(html);
  const $list = $('ul#list');

  if (!$list.length) {
    console.warn('Элемент ul#list не найден в HTML.');
    return html; // Возвращаем исходный HTML, если список не найден.
  }

    const href = `in${startNumber}.html`;
    const newListItem = `\n    <li><a href="${href}" target="leftframe">${text}</a></li>`; // Добавляем перенос строки и отступ
  
    //Добавляем в конец  UL

  $list.append(newListItem); // Append all new items at once
    return $.html();
}

/**
 * Добавляет новые элементы li в HTML-код с переносом строки между ними в файле in
 * @param {string} html - Исходный HTML-код.
 * @param {string[]} linkTexts - Массив текстов ссылок для новых элементов li.
 * @param {number} pgIndex- Начальное число для формирования href.
 * @param {number} indexHtml - HTML-код с добавленными элементами li.
 * @returns {buli} 
 */
function addListItemsIn(html, text, pgIndex, indexHtml){
  const $ = cheerio.load(html);
  const $list = $('ul#list');

  if (!$list.length) {
    console.warn('Элемент ul#list не найден в HTML.');
    return html; // Возвращаем исходный HTML, если список не найден.
  }

    const href = `./pages/pg${pgIndex}-${indexHtml}.html`;
    const newListItem = `\n    <li><a href="${href}" target="rightframe">${text}</a></li>`; // Добавляем перенос строки и отступ
  
    //Добавляем в конец  UL

  $list.append(newListItem); // Append all new items at once
    return $.html();
}

/**
 * Находит файлы в массиве, начинающиеся с заданного префикса.
 *
 * @param {string[]} files Массив строк, представляющих имена файлов.  Например: ["pg1-1.html", "pg2-3.html", "other.txt"].
 * @param {string} prefix Префикс, с которого должны начинаться имена файлов для включения в результат.  Например: "pg1".
 * @returns {string[]} Массив строк, содержащий имена файлов, которые начинаются с заданного префикса и соответствуют шаблону "префиксN-M.html", где N и M - цифры.  Возвращает пустой массив, если файлы с таким префиксом не найдены.
 *
 * @example
 * const files = ["pg1-1.html", "pg1-2.html", "pg2-1.html"];
 * const prefix = "pg1";
 * const foundFiles = findFilesByPrefix(files, prefix);
 * вернет все файлы с pg1
 *
 * @example
 * const files = ["pg1-1.html", "pg2-1.html","pg2-2.html","pg2-3.html"];
 * const prefix = "pg3";
 * const foundFiles = findFilesByPrefix(files, prefix);
 * вернет все файлы с pg3
 */

function findFilesByPrefix(files, prefix) {
  return files.filter(file => file.startsWith(prefix));
}

/**
 * Фильтрует массив имен файлов, возвращая только те, которые соответствуют
 * указанному номеру страницы.
 *
 * Функция использует регулярное выражение для поиска файлов, имена которых
 * содержат указанный номер страницы в формате "pg[pageNumber]-[number].html".
 * Например, для pageNumber = 3, функция будет искать файлы вида "pg3-1.html",
 * "pg3-25.html" и т.д.
 *
 * @param {string[]} files - Массив имен файлов для фильтрации.
 * @param {number} pageNumber - Номер страницы, по которому нужно отфильтровать файлы.
 * @returns {string[]} - Новый массив, содержащий только те имена файлов,
 *                         которые соответствуют указанному номеру страницы.
 *
 * @example
 * const files = [
 *   'pg1-1.html',
 *   'pg2-1.html',
 *   'pg1-2.html',
 *   'otherfile.txt',
 *   'pg3-1.html'
 * ];
 *
 * const filteredFiles = filterFilesByPage(files, 1);
 * console.log(filteredFiles); // Output: ['pg1-1.html', 'pg1-2.html']
 */

function filterFilesByPage(files, pageNumber) {
  // Создаем регулярное выражение, которое ищет файлы с указанным номером страницы
  const pattern = new RegExp(`pg${pageNumber}-\\d+\\.html$`);

  // Фильтруем массив, оставляя только подходящие файлы
  const filteredFiles = files.filter(fileName => pattern.test(fileName));

  if (filteredFiles.length === 0) {
    return false;
  }

  return filteredFiles;
}

/**
 * Извлекает число из пути к файлу, следующего за сегментом "themes/in".
 *
 * Функция использует регулярное выражение для поиска числового значения
 * в пути к файлу, которое находится сразу после "themes/in" и перед ".html".
 * Функция предполагает, что путь к файлу имеет формат " .../themes/in[number].html".
 *
 * @param {string} path - Путь к файлу, из которого нужно извлечь число.
 * @returns {number | null} - Извлеченное число в виде целого числа (integer),
 *                             или `null`, если число не найдено в пути.
 *
 * @example
 * const path1 = '/path/to/file/themes/in123.html';
 * const number1 = extractNumberFromPath(path1);
 * console.log(number1); // Output: 123
 *
 * const path2 = '/path/to/another/file/themes/invalid.html';
 * const number2 = extractNumberFromPath(path2);
 * console.log(number2); // Output: null
 */

function extractNumberFromPath(path) {
  // Используем регулярное выражение для поиска числа после "themes/in"
  const match = path.match(/themes\/in(\d+)\.html$/);
  
  // Если совпадение найдено, преобразуем число в integer и возвращаем
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  
  // Если число не найдено, возвращаем null или можно выбросить ошибку
  return null;
}



module.exports.getFileNamesInDirectory = getFileNamesInDirectory;
module.exports.filterFilesByPage = filterFilesByPage;
module.exports.extractNumberFromPath = extractNumberFromPath;


module.exports.hasLiElementsInsideList = hasLiElementsInsideList;
module.exports.findMaxPgNumber = findMaxPgNumber;
module.exports.findMaxNumberInFilenames = findMaxNumberInFilenames;
module.exports.findMaxNumberAfterDash = findMaxNumberAfterDash;
module.exports.removeStringFromText = removeStringFromText;
module.exports.extractAndTransformHrefs = extractAndTransformHrefs;
module.exports.findMaxSecondDigitInFilenames = findMaxSecondDigitInFilenames;
module.exports.addListItemsRoot = addListItemsRoot;
module.exports.addListItemsIn = addListItemsIn;
module.exports.findFilesByPrefix = findFilesByPrefix;










