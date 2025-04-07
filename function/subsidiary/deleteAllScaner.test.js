const fs = require('fs');
const { saveFilterHTML } = require('./deleteAllScaner');

describe('saveFilterHTML', () => {
  const pathFile = '/media/andrey/project/project/servers/SERVER-node-chatGPT/rootDocument/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
  const pathFileNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C2.html';

  const targetTexts = [
    'как в текстовом ',
    'На node js например у меня '
  ];

  it('should read, filter, and save HTML based on target texts', async () => {
    // Вызываем функцию
    try {
      await saveFilterHTML(pathFile, pathFileNew, targetTexts);

      // Проверка: убедимся, что файл был создан
      expect(fs.existsSync(pathFileNew)).toBe(true);

      // Дальнейшие проверки (например, содержимого файла)
      // Добавьте код для чтения содержимого файла и проверки,
      // что оно соответствует вашим ожиданиям.

      const savedContent = fs.readFileSync(pathFileNew, 'utf-8');
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
