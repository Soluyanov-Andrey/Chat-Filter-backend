/**
 * Сокращает строки в массиве до заданной длины.
 *
 * @param {string[]} strings Массив строк для обработки.
 * @param {number} maxLength Максимальная длина строки.
 * @returns {string[]} Новый массив, содержащий сокращенные или исходные строки.
 */
function shortenStrings(strings, maxLength) {
    if (!Array.isArray(strings)) {
      console.error("Ошибка: Первый аргумент должен быть массивом.");
      return []; // Или выбросить ошибку: throw new Error("...");
    }
  
    if (typeof maxLength !== 'number' || !Number.isInteger(maxLength) || maxLength < 0) {
      console.error("Ошибка: Второй аргумент должен быть целым неотрицательным числом.");
      return [...strings]; // Return a copy of the original array to avoid modifying it
    }
  
    const shortenedStrings = strings.map(str => {
      if (typeof str !== 'string') {
        console.warn(`Предупреждение: элемент массива "${str}" не является строкой. Пропускаем.`);
        return str; // Пропускаем нестроковые элементы
      }
  
      if (str.length > maxLength) {
        return str.substring(0, maxLength);
      } else {
        return str;
      }
    });
  
    return shortenedStrings;
  }
  
  module.exports.shortenStrings = shortenStrings;
