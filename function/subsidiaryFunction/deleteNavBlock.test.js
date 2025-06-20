const { readFileContent } = require('./fileUtils');
const { saveHtmlToFile } = require('./fileUtils');
const { removeSidebarNav , removeFooterNav ,removeheaderNav ,saveNewFile , deleteBlock} = require('./deleteNavBlock');
const { IP , FULL_PATH } = require('../../config'); // Импортируем cors
const fs = require('fs');
const path = require('path'); // Import the 'path' module

const currentDir = __dirname;



// Формируем абсолютные пути к нужным папкам, используя path.resolve()
const sourceDir = path.resolve(currentDir, '../../rootDocument/ChatGPT _ ChatGPT 4o Free _ Support all countries.html');
const baseDir = path.resolve(currentDir, '../..//test/C1.html');



describe('Интеграционный тест: removeSidebarNav с реальными операциями с файлами', () => {
  // const path = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
  // const pathNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C1.html';

  const path = sourceDir;
  const pathNew = baseDir;

  it('должен прочитать HTML-файл, удалить боковую навигацию и сохранить измененный контент в новый файл', () => {
    // 1. Прочитать HTML-файл
    console.log(path);
    
    const read = readFileContent(path);

    // 2. Удалить боковую панель
    const contDel = removeSidebarNav(read);

    // const contFooter = removeFooterNav(contDel);

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

  it('должен прочитать HTML-файл, и удалить форму ввода', () => {
    // 1. Прочитать HTML-файл
    console.log(path);
    
    const read = readFileContent(path);

    // 2. Удалить панель ввода
     const contFooter = removeFooterNav(read);

    // 3. Сохранить измененный HTML в новый файл
    saveHtmlToFile(pathNew, contFooter);

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
    const expectedContent = removeFooterNav(readFileContent(path));

    // Теперь делаем утверждения:
    expect(savedContent).toEqual(expectedContent);

  });

  it('должен прочитать HTML-файл, верхний блок из файла', () => {
    // 1. Прочитать HTML-файл
    console.log(path);
    
    const read = readFileContent(path);

    // 2. Удалить header
     const contFooter = removeheaderNav(read);

    // 3. Сохранить измененный HTML в новый файл
    saveHtmlToFile(pathNew, contFooter);

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
    const expectedContent = removeheaderNav(readFileContent(path));

    // Теперь делаем утверждения:
    expect(savedContent).toEqual(expectedContent);

  });
  
 
  it('проверяем конечный saveNewFile', () => {
    // 1. Прочитать HTML-файл
    console.log("sourceDir-",sourceDir);
    console.log("baseDir-",baseDir);
    
    async function main() {
      try {
        await saveNewFile(sourceDir, baseDir);
        console.log("Файл успешно обработан и сохранен.");
      } catch (error) {
        console.error("Произошла ошибка при обработке файла:", error);
        // Здесь можно выполнить другие действия по обработке ошибки,
        // например, логирование или отображение сообщения пользователю.
      }
    }
    
    main();


  });

 it('проверяем конечный saveNewFile', () => {
    // 1. Прочитать HTML-файл
    console.log("sourceDir-",sourceDir);
    console.log("baseDir-",baseDir);

    const read = readFileContent(path);

    async function main() {
      try {
       const re = await deleteBlock(read);
         console.log(re);
      } catch (error) {
        console.error("Произошла ошибка при обработке файла:", error);
        // Здесь можно выполнить другие действия по обработке ошибки,
        // например, логирование или отображение сообщения пользователю.
      }
    }
    
    main();


  });
});