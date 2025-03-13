const { extractLastHrefNumber , insertNewLinkAfterLast } = require('./createTopic'); 

const cheerio = require('cheerio'); // Импортируем cheerio для работы с DOM

// Проверяем как функция extractLastHrefNumber извелкает номер последний
describe('extractLastHrefNumber - patternType: inTheme', () => {
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
    expect(extractLastHrefNumber(htmlCode,'inTheme')).toBe(4);
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
    expect(extractLastHrefNumber(htmlCode,'inTheme')).toBe(1234);
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
    expect(extractLastHrefNumber(htmlCode,'inTheme')).toBeNull();
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
    expect(extractLastHrefNumber(htmlCode,'inTheme')).toBeNull();
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
    expect(extractLastHrefNumber(htmlCode,'inTheme')).toBeNull();
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
    expect(extractLastHrefNumber(htmlCode,'inTheme')).toBe(4);
  });
});


describe('extractLastHrefNumber - patternType: html', () => {
  it('should extract the number before ".html" from the last href', () => {
    const htmlCode = `
      <a href="page1.html">Link 1</a>
      <a href="page2.html">Link 2</a>
      <a href="page345.html">Link 3</a>
    `;
    const result = extractLastHrefNumber(htmlCode, 'html');
    expect(result).toBe(345);
  });

  it('should return null if no a elements exist', () => {
    const htmlCode = '<div>Some content</div>';
    const result = extractLastHrefNumber(htmlCode, 'html');
    expect(result).toBeNull();
  });

  it('should return null if the last a element has no href', () => {
    const htmlCode = '<a href="page1.html">Link 1</a><a >Link 2</a>';
    const result = extractLastHrefNumber(htmlCode, 'html');
    expect(result).toBeNull();
  });

  it('should return null if the last href does not match the pattern', () => {
    const htmlCode = '<a href="page1.html">Link 1</a><a href="other.txt">Link 2</a>';
    const result = extractLastHrefNumber(htmlCode, 'html');
    expect(result).toBeNull();
  });

  it('should handle href with other attributes', () => {
    const htmlCode = '<a href="page1.html" class="link">Link 1</a><a href="page23.html?param=value">Link 2</a>';
    const result = extractLastHrefNumber(htmlCode, 'html');
    expect(result).toBe(23);
  });

  it('should handle html with leading text', () => {
      const htmlCode = '<p>Some Text</p><a href="page456.html">Link</a>';
      const result = extractLastHrefNumber(htmlCode, 'html');
      expect(result).toBe(456);
  });

  it('should handle html with trailing text', () => {
      const htmlCode = '<a href="page789.html">Link</a><p>Some Text</p>';
      const result = extractLastHrefNumber(htmlCode, 'html');
      expect(result).toBe(789);
  });

    it('should return null if there are multiple matches and the last does not match', () => {
        const htmlCode = `
            <a href="123.html">Link 1</a>
            <a href="other.txt">Link 2</a>
        `;
        const result = extractLastHrefNumber(htmlCode, 'html');
        expect(result).toBeNull();
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

  //Проверяем в лоб есть ли `<a href="./themes/in5.html" target="leftframe"' такая строка

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
        console.log(newHtml);
        
        expect(newHtml).toContain(`<a href="./themes/in5.html" target="leftframe">${topic}`);
    });
});



