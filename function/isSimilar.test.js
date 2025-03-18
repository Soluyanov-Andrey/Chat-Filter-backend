const isSimilar = require('./isSimilar.js'); // Замените your-file-name на имя файла, где находится функция

describe('isSimilar', () => {
  it('should return true if strings are identical', () => {
    expect(isSimilar('hello', 'hello')).toBe(true);
  });

  it('should return true if the second string is a prefix of the first', () => {
    expect(isSimilar('hello world', 'hello')).toBe(true);
    expect(isSimilar('this is a test', 'this is')).toBe(true);
  });

  it('should return false if strings are different and not a prefix', () => {
    expect(isSimilar('hello', 'world')).toBe(false);
    expect(isSimilar('hello world', 'world')).toBe(false); // world is not a prefix 
    expect(isSimilar('abc', 'abcd')).toBe(false); // 'abcd' is longer
  });

  it('should return false if either string is not a string', () => {
    expect(isSimilar(123, 'hello')).toBe(false);
    expect(isSimilar('hello', 123)).toBe(false);
    expect(isSimilar(null, 'hello')).toBe(false);
    expect(isSimilar('hello', undefined)).toBe(false);
    expect(isSimilar({}, 'hello')).toBe(false);
  });

  it('should return false if either string is empty', () => {
    expect(isSimilar('', 'hello')).toBe(false);
    expect(isSimilar('hello', '')).toBe(false);
    expect(isSimilar('', '')).toBe(false);
  });

  it('should handle unicode strings correctly', () => {
    expect(isSimilar('你好世界', '你好')).toBe(true);
    expect(isSimilar('你好世界', '世界')).toBe(false);
  });

  it('should handle strings with spaces at the beginning and end', () => {
      expect(isSimilar('  hello world', '  hello')).toBe(true);
      expect(isSimilar('hello world  ', 'hello')).toBe(true);
      expect(isSimilar('  hello world  ', '  hello')).toBe(true);
  });

  it('should handle a longer first string and a shorter second string that is the beginning', () => {
    const longString = "Если текст не совпадает ни с одним из targetTexts, добавляем блоки для удаления";
    const shortString = "Если текст не совпадает ни с одним из targetTexts,";
    expect(isSimilar(longString, shortString)).toBe(true);
  });

  it('should return false if the strings are similar but have different casing', () => {
    expect(isSimilar('Hello', 'hello')).toBe(false);
    expect(isSimilar('HELLO WORLD', 'hello')).toBe(false);
  });
});