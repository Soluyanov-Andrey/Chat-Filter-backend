const { extractContextsFromChatPrompts } = require('../apiScan/scan');
const { PATH_FILE_NAME_NEW, PATH_FILE_TEMP_NEW, PATH_FILE_NAME_LOOK} = require('../../config');
const { saveListedHTML } = require('../subsidiaryFunction/deleteBlokScaner');
const { replaceFile } = require('../subsidiaryFunction/fileUtils');
const { saveFilterHTML } = require('../subsidiaryFunction/deleteAllScaner');

/**
 * @module delete_select
 * @description Модуль, предоставляющий функцию для выбора конкретных элементов из результата анализа чат-промптов.
 */

/**
 * Выбирает определенные элементы из массива контекстов, полученного из результатов функции `extractContextsFromChatPrompts`,
 * на основе предоставленных индексов.
 * @param {number[]} array - Массив индексов (начиная с 1) для выбора элементов из массива контекстов.
 * @returns {string[]} - Массив выбранных контекстов.
 */

function arraySelect(array) {
 
  const contexts = extractContextsFromChatPrompts(PATH_FILE_NAME_NEW);

  // Преобразуем индексы, начинающиеся с 1, в индексы, начинающиеся с 0,
  // вычитая 1 из каждого элемента массива `array`. Это необходимо, поскольку массивы в JavaScript индексируются с 0.
  const zeroBasedIndices = array.map(index => index - 1);

  // Выбираем элементы из массива `contexts` с использованием преобразованных индексов, начинающихся с 0.
  // Результатом является новый массив, содержащий только выбранные контексты.
  const selectedContexts = zeroBasedIndices.map(index => contexts[index]);


  return selectedContexts;
}

/**
 * Асинхронно выполняет выборку элементов из массива, сохранение HTML-листа и замену файла.
 *
 * Эта функция выполняет следующие действия:
 * 1. Вызывает функцию `array_select` для выборки элементов из входного массива.
 *    Если `array_select` выбрасывает исключение, функция записывает информацию об ошибке
 *    в консоль и возвращает `false`.
 * 2. Вызывает асинхронную функцию `saveListedHTML` для сохранения HTML-листа с использованием
 *    выбранных элементов. Если `saveListedHTML` выбрасывает исключение, функция записывает
 *    информацию об ошибке в консоль и возвращает `false`.
 * 3. Вызывает функцию `replaceFile` для замены файла, перемещая временный файл в финальный.
 *    Если `replaceFile` выбрасывает исключение, функция записывает информацию об ошибке
 *    в консоль и возвращает `false`.
 *
 * **Важно:** Функция `saveListedHTML` должна быть асинхронной (возвращать Promise),
 *           чтобы `await` работал правильно.
 *
 * @async
 * @param {Array} array - Входной массив, из которого выбираются элементы.
 * @returns {Promise<boolean>} - Promise, который разрешается в `true`, если все операции
 *                            выполнены успешно, и в `false` в случае ошибки.
 *
 * @throws {Error} - Функция может выбрасывать исключения, если `array_select` или
 *                  `replaceFile` выбрасывают исключения. Однако эти исключения
 *                  перехватываются и обрабатываются внутри функции, которая
 *                  возвращает `false` в случае ошибки. Функция `saveListedHTML` может выбрасывать
 *                   ошибки, связанные с файловой системой.
 *
 * @example
 * // Пример использования:
 * async function example() {
 *   const myArray = [1, 2, 3, 4, 5];
 *   const result = await delete_select(myArray);
 *
 *   if (result) {
 *     console.log("Функция выполнена успешно!");
 *   } else {
 *     console.error("Функция завершилась с ошибкой.");
 *   }
 * }
 *
 * example();
 */

async function deleteSelect(array) {
  let contexts;

  try {
    contexts = arraySelect(array);
  } catch (error) {
    console.error("Ошибка при вызове arraySelect:", error);
    return false; // Ошибка при выборе элементов.
  }
  console.log(contexts);

  try {
    await saveListedHTML(PATH_FILE_NAME_NEW, PATH_FILE_TEMP_NEW, contexts); // Добавлено await
  } catch (error) {
    console.error("Ошибка при сохранении HTML:", error);
    return false; // Ошибка при сохранении HTML.
  }

  try {
    replaceFile(PATH_FILE_TEMP_NEW, PATH_FILE_NAME_NEW);
  } catch (error) {
    console.error("Ошибка при изменениях имен файлов:", error);
    return false; // Ошибка при изменениях имен файлов
  }

  return true; // Все операции выполнены успешно.
}

async function laveSelected(array) {
  let contexts;

  try {
    contexts = arraySelect(array);
  } catch (error) {
    console.error("Ошибка при вызове arraySelect:", error);
    return false; // Ошибка при выборе элементов.
  }
  console.log(contexts);

  try {
    await saveFilterHTML (PATH_FILE_NAME_NEW, PATH_FILE_TEMP_NEW, contexts); // Добавлено await
  } catch (error) {
    console.error("Ошибка при сохранении HTML:", error);
    return false; // Ошибка при сохранении HTML.
  }
// Сначала реализовал запись во временный файл, а затем переименование в PATH_FILE_NAME_NEW.
// Это сделано из-за опасения конфликтов, так как PATH_FILE_NAME_NEW читается фронтендом,
// и производить изменения в этом же файле - плохое решение. 
// Изменения асинхронно выполняются во временном файле, а затем он переименовывается,
// что исключает возможные конфликты доступа.
  try {
    replaceFile(PATH_FILE_TEMP_NEW, PATH_FILE_NAME_NEW);
  } catch (error) {
    console.error("Ошибка при изменениях имен файлов:", error);
    return false; // Ошибка при изменениях имен файлов
  }

  return true; // Все операции выполнены успешно.
}


async function lookPageBtn(array) {
  let contexts;

  try {
    contexts = arraySelect(array);
  } catch (error) {
    console.error("Ошибка при вызове arraySelect:", error);
    return false; // Ошибка при выборе элементов.
  }
  console.log(contexts);

  try {
    await saveFilterHTML (PATH_FILE_NAME_NEW, PATH_FILE_NAME_LOOK, contexts); // Добавлено await
  } catch (error) {
    console.error("Ошибка при сохранении HTML:", error);
    return false; // Ошибка при сохранении HTML.
  }
  return true; // Все операции выполнены успешно.
}

module.exports.lookPageBtn = lookPageBtn;
module.exports.laveSelected = laveSelected;
module.exports.arraySelect = arraySelect;
module.exports.deleteSelect = deleteSelect;