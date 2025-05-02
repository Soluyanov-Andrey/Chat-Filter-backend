const { getHrefByIndex } = require('./getHrefByIndex.js'); 
const { getHrefFromHTMLFiles} = require('./getHrefByIndex.js'); 

describe('getHrefByIndex', () => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Главная страница</title>
    </head>
    <body>
        <h1>Навигация</h1>
        <ul id="list">
            <li><a href="./themes/in1.html" target="leftframe">Установка аапач</a></li>
            <li><a href="in1.html" target="leftframe">Установка php</a></li>
            <li><a href="in2.html" target="leftframe">Страница 2</a></li>
            <li><a href="in3.html" target="leftframe">Страница 3</a></li>
        </ul>
    </body>
    </html>
    `;
  
    test('возвращает правильный href для индекса 1', () => {
      expect(getHrefByIndex(html, 1)).toBe('./themes/in1.html');
    });
  
    test('возвращает правильный href для индекса 2', () => {
      expect(getHrefByIndex(html, 2)).toBe('in1.html');
    });
  
    test('возвращает правильный href для последнего элемента', () => {
      expect(getHrefByIndex(html, 4)).toBe('in3.html');
    });
  
    test('выбрасывает ошибку при индексе меньше 1', () => {
      expect(() => getHrefByIndex(html, 0)).toThrow('Index 0 out of range (1-4)');
    });
  
    test('выбрасывает ошибку при индексе больше количества элементов', () => {
      expect(() => getHrefByIndex(html, 5)).toThrow('Index 5 out of range (1-4)');
    });
  
    test('корректно обрабатывает пустой список', () => {
      const emptyHtml = '<ul id="list"></ul>';
      expect(() => getHrefByIndex(emptyHtml, 1)).toThrow('Index 1 out of range (1-0)');
    });
  });
  describe('getHrefFromHTML', () => {
    const html1 = `/media/andrey/project/project/servers/SERVER-node-chatGPT/document/root.html`;
    const html = `/media/andrey/Рабочий/flash/linux/manul/7zip/document/root.html`;
    test('возвращает href для индекса ', () => {
        console.log(getHrefFromHTMLFiles(html, 1));
        console.log('сработало');
    });
  
  
  });
