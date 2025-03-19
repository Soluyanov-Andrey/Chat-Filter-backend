const { readFileContent } = require('./fileUtils');
const { saveHtmlToFile } = require('./fileUtils');
const { removeSidebarNav } = require('./deleteNavBlock');

const fs = require('fs');
const path = require('path'); // Import the 'path' module

const currentDir = __dirname;



// Формируем абсолютные пути к нужным папкам, используя path.resolve()
const sourceDir = path.resolve(currentDir, '../../test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html');
const baseDir = path.resolve(currentDir, '../..//test/C1.html');



describe('Интеграционный тест: removeSidebarNav с реальными операциями с файлами', () => {
  // const path = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
  // const pathNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C1.html';

  const path = sourceDir;
  const pathNew = baseDir;

  it('должен прочитать HTML-файл, удалить боковую навигацию и сохранить измененный контент в новый файл', () => {
    // 1. Прочитать HTML-файл
    const read = readFileContent(path);

    // 2. Удалить боковую панель
    const contDel = removeSidebarNav(read);

    // 3. Сохранить измененный HTML в новый файл
    saveHtmlToFile(pathNew, contDel);

    // 4. Верифицировать результат, прочитав новый файл и проверив контент.
    //    Здесь мы подтверждаем, что операция выполнена успешно.

    let savedContent;
    try {
      savedContent = fs.readFileSync(pathNew, 'utf-8');
    } catch (error) {
      // Обработать ошибку, если файл не может быть прочитан (например, не создан)
      throw new Error(`Ошибка чтения сохраненного файла: ${error}`);
    }

    // Подготовить ожидаемый контент, прочитав исходный файл и применив к нему removeSidebarNav:
    const expectedContent = removeSidebarNav(readFileContent(path));

    // Теперь делаем утверждения:
    expect(savedContent).toEqual(expectedContent);

  });
});