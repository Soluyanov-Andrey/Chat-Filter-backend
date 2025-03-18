const fs = require('fs/promises');
const path = require('path');

/**
 * Функция `isSimilar` определяет, является ли одна строка префиксом другой или полностью совпадает с ней.
 *
 * @param {string} str1 Первая строка для сравнения.
 * @param {string} str2 Вторая строка для сравнения.
 * @returns {boolean} `true`, если строки идентичны или `str2` является префиксом `str1`, иначе `false`.
 *
 * @throws {Error} Если любой из аргументов не является строкой.  (Раскомментируйте код, если хотите выбрасывать ошибки)
 *
 * @example
 * const a = "Если текст не совпадает ни с одним из targetTexts, добавляем блоки для удаления";
 * const b = "Если текст не совпадает ни с одним из targetTexts,";
 * isSimilar(a, b); // returns true
 *
 * @example
 * isSimilar("hello", "world"); // returns false
 */
function isSimilar(str1, str2) {
  // Проверка на типы данных.  Если любой из аргументов не строка, возвращаем false.
  // Альтернативно, можно выбрасывать исключение (раскомментируйте код ниже, если нужно):
  // if (typeof str1 !== 'string' || typeof str2 !== 'string') {
  //   throw new Error("Оба аргумента должны быть строками");
  // }
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    return false;
  }

  // Проверка на пустые строки. Если любая из строк пустая, возвращаем false.
  // Альтернативно, можно выбрасывать исключение (раскомментируйте код ниже, если нужно):
  // if (str1 === '' || str2 === '') {
  //   throw new Error("Строки не должны быть пустыми");
  // }
  if (str1 === '' || str2 === '') {
    return false;
  }

  // Если строки полностью идентичны, возвращаем true.
  if (str1 === str2) {
    return true;
  }

  // Если вторая строка короче первой, проверяем, является ли она префиксом первой строки.
  if (str2.length < str1.length) {
    const subStr1 = str1.substring(0, str2.length); // Получаем подстроку из str1, длиной равной str2.

    // Если подстрока из str1 равна str2, то str2 является префиксом str1, возвращаем true.
    if (subStr1 === str2) {
      return true;
    }
  }

  // В остальных случаях возвращаем false.
  return false;
}

// Экспорт функции
module.exports = isSimilar;

