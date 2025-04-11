const fs = require('fs');
const { saveListedHTML } = require('./deleteBlokScaner');
const { FULL_PATH_FILE_TEST , FULL_PATH } = require('../../config');

describe('saveFilterHTML', () => {
 
  const targetTexts = [
    'как в текстовом ',
    'На node js например у меня есть переменнаяя text = '
  ];

  it('should read, filter, and save HTML based on target texts', async () => {
    // Вызываем функцию
    try {
      await saveListedHTML( FULL_PATH, FULL_PATH_FILE_TEST, targetTexts);

      // Проверка: убедимся, что файл был создан
      expect(fs.existsSync(FULL_PATH_FILE_TEST)).toBe(true);

      

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