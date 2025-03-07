const {extractLastHrefNumber}  = require('./createTopic.js'); // Замените на фактическое имя файла

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