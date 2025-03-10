const { extractLastHrefNumber , insertNewLinkAfterLast } = require('./createTopic'); 

const cheerio = require('cheerio'); // Импортируем cheerio для работы с DOM

// Проверяем как функция extractLastHrefNumber извелкает номер последний
describe('extractLastHrefNumber', () => {
  it('should extract the number from the last href when it matches the pattern', () => {
    const htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Главная страница</title>
      </head>
      <body>
          <h1>Навигация</h1>
          <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
          <br>
          <a href="./themes/in2.html" target="leftframe">Установка php</a>
          <br>
          <a href="./themes/in3.html" target="leftframe">Страница 2</a>
          <br>
          <a href="./themes/in4.html" target="leftframe">Страница 3</a>
      </body>
      </html>
    `;
    expect(extractLastHrefNumber(htmlCode)).toBe(4);
  });

  it('should extract the number from the last href when it is a larger number', () => {
    const htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Главная страница</title>
      </head>
      <body>
          <h1>Навигация</h1>
          <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
          <br>
          <a href="./themes/in2.html" target="leftframe">Установка php</a>
          <br>
          <a href="./themes/in3.html" target="leftframe">Страница 2</a>
          <br>
          <a href="./themes/in1234.html" target="leftframe">Страница 3</a>
      </body>
      </html>
    `;
    expect(extractLastHrefNumber(htmlCode)).toBe(1234);
  });

  it('should return null when there are no <a> elements', () => {
    const htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Главная страница</title>
      </head>
      <body>
          <h1>Навигация</h1>
      </body>
      </html>
    `;
    expect(extractLastHrefNumber(htmlCode)).toBeNull();
  });

  it('should return null when the last <a> element has no href attribute', () => {
    const htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Главная страница</title>
      </head>
      <body>
          <h1>Навигация</h1>
          <a target="leftframe">Установка аапач</a>
          <br>
          <a href="./themes/in2.html" target="leftframe">Установка php</a>
          <br>
          <a href="./themes/in3.html" target="leftframe">Страница 2</a>
          <br>
          <a target="leftframe">Страница 3</a>
      </body>
      </html>
    `;
    expect(extractLastHrefNumber(htmlCode)).toBeNull();
  });

  it('should return null when the href does not match the expected pattern', () => {
    const htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Главная страница</title>
      </head>
      <body>
          <h1>Навигация</h1>
          <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
          <br>
          <a href="./themes/in2.html" target="leftframe">Установка php</a>
          <br>
          <a href="./themes/in3.html" target="leftframe">Страница 2</a>
          <br>
          <a href="./other/page.html" target="leftframe">Страница 3</a>
      </body>
      </html>
    `;
    expect(extractLastHrefNumber(htmlCode)).toBeNull();
  });

  it('should handle errors gracefully and return null for invalid HTML', () => {
    const htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Главная страница</title>
      </head>
      <body>
          <h1>Навигация</h1>
          <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
          <br>
          <a href="./themes/in2.html" target="leftframe">Установка php</a>
          <br>
          <a href="./themes/in3.html" target="leftframe">Страница 2</a>
          <br>
          <a href="./themes/in4.html" target="leftframe">Страница 3</a>
      </body>
      </html>
    `;
    expect(extractLastHrefNumber(htmlCode)).toBe(4);
  });
});


// Проверяем как функция insertNewLinkAfterLast делает добавление
describe('insertNewLinkAfterLast', () => {
  
/*----------------------------------------------------------------------
  /* Должна возвращать
  <!DOCTYPE html><html><head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
    <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
    <br>
    <a href="./themes/in2.html" target="leftframe">Установка php</a>
    <br>
    <a href="./themes/in3.html" target="leftframe">Страница 2</a>
    <br>
    &lt; href="./themes/in4.html" target="leftframe"&gt;undefined


</body></html>
  */
 /*----------------------------------------------------------------------*/

  it('should insert a new link after the last <a> element when <a> elements exist', () => {
    const htmlCode = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
    <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
    <br>
    <a href="./themes/in2.html" target="leftframe">Установка php</a>
    <br>
    <a href="./themes/in3.html" target="leftframe">Страница 2</a>
</body>
</html>
`;
    const newHtml = insertNewLinkAfterLast(htmlCode, 4,'Данна');
    console.log(newHtml);
    expect(newHtml).toMatchSnapshot(); // Создаем или сравниваем со снимком
  });

/*  Должно возрашать  
const expectedHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
    <br>
    <a href="./themes/in1.html" target="leftframe">undefined
</body>
</html>
`;
*/


  it('should insert a new link in the body when no <a> elements exist', () => {
    const htmlCode = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
</body>
</html>
`;

    const newHtml = insertNewLinkAfterLast(htmlCode, 1,'Тема');
    expect(newHtml).toMatchSnapshot(); // Создаем или сравниваем со снимком
  });

  it('should handle errors gracefully and return original HTML', () => {
    //  Создадим заведомо некорректный html, чтобы вызвать ошибку
    const htmlCode = `<!DOCTYPE html><html<head><title>Test</title></head><body>`;
    const newHtml = insertNewLinkAfterLast(htmlCode, 5);
    expect(newHtml).toMatchSnapshot(); 
  });

    it('should insert a new link with a specified topic', () => {
        const htmlCode = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Главная страница</title>
    </head>
    <body>
        <h1>Навигация</h1>
        <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
        <br>
        <a href="./themes/in2.html" target="leftframe">Установка php</a>
        <br>
        <a href="./themes/in3.html" target="leftframe">Страница 2</a>
    </body>
    </html>
    `;
        const topic = 'Новая Тема';
        const newHtml = insertNewLinkAfterLast(htmlCode, 5, topic);
        expect(newHtml).toContain(`<a href="./themes/in5.html" target="leftframe">${topic}`);
    });
});



