const { extractContextsFromChatPrompts } = require('../apiScan/scan');
const { PATH_FILE_NAME_NEW, PATH_FILE_TEMP_NEW } = require('../../config');
const { saveListedHTML } = require('../subsidiary/deleteBlokScaner');
const { replaceFile } = require('../subsidiary/fileUtils');
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
function array_select(array) {
 
  const contexts = extractContextsFromChatPrompts(PATH_FILE_NAME_NEW);

  // Преобразуем индексы, начинающиеся с 1, в индексы, начинающиеся с 0,
  // вычитая 1 из каждого элемента массива `array`. Это необходимо, поскольку массивы в JavaScript индексируются с 0.
  const zeroBasedIndices = array.map(index => index - 1);

  // Выбираем элементы из массива `contexts` с использованием преобразованных индексов, начинающихся с 0.
  // Результатом является новый массив, содержащий только выбранные контексты.
  const selectedContexts = zeroBasedIndices.map(index => contexts[index]);


  return selectedContexts;
}

async function delete_select(array) {
  let contexts;

  try {
    contexts = array_select(array);
  } catch (error) {
    console.error("Ошибка при вызове array_select:", error);
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

module.exports.array_select = array_select;
module.exports.delete_select = delete_select;