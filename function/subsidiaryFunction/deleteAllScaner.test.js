const fs = require('fs');
const { saveFilterHTML } = require('./deleteAllScaner');
const { FULL_PATH, FULL_PATH_FILE_TEST } = require('../../config');

describe('saveFilterHTML', () => {

  const targetTexts = [
    'могу ли я в сепаратор записать \n',
    'На node js например у меня '
  ];

  it('should read, filter, and save HTML based on target texts', async () => {
    try {
      await saveFilterHTML(FULL_PATH, FULL_PATH_FILE_TEST, targetTexts);

      // Проверка: убедимся, что файл был создан
      expect(fs.existsSync(FULL_PATH_FILE_TEST)).toBe(true);  // Исправлено здесь

      // Дальнейшие проверки (например, содержимого файла)
      const savedContent = fs.readFileSync(FULL_PATH_FILE_TEST, 'utf-8');
      expect(typeof savedContent).toBe('string');

      // TODO: Add more specific assertions about the file content here
      // expect(savedContent).toContain('expected text');

    } catch (error) {
      console.error("Тест завершился с ошибкой:", error);
      throw error; // Это приведет к провалу теста
    }
  });
});

// Передаем вместо массива строку 

describe('saveSrtingFilterHTML', () => {

  const targetTexts = 'могу ли я в сепаратор записать \\n';

  it('should read, filter, and save HTML based on target texts', async () => {
    // Вызываем функцию
    try {
      await saveFilterHTML(FULL_PATH, FULL_PATH_FILE_TEST, targetTexts);

      // Проверка: убедимся, что файл был создан
      expect(fs.existsSync(FULL_PATH_FILE_TEST)).toBe(true);

      // Дальнейшие проверки (например, содержимого файла)
      // Добавьте код для чтения содержимого файла и проверки,
      // что оно соответствует вашим ожиданиям.

      const savedContent = fs.readFileSync(FULL_PATH_FILE_TEST, 'utf-8');
      expect(typeof savedContent).toBe('string');  // Sanity check: is it a string?

      // TODO: Add more specific assertions about the file content here,
      //  based on what filterHTMLElementsByText is supposed to do.
      //  For example:
      // expect(savedContent).toContain('expected text');

    } catch (error) {
      // Если произошла ошибка, выводим ее в консоль и завершаем тест
      console.error("Тест завершился с ошибкой:", error);
      throw error; // Это приведет к провалу теста
    }
  });
});
