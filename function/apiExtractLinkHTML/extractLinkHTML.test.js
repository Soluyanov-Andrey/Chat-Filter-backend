const { extractLinkTextFromHTML } = require('./extractLinkHTML'); 
const { readFileTextFromHTML } = require('./extractLinkHTML'); 

describe('extractLinkTextFromHTML', () => {
  it('should extract link texts from HTML with multiple links', () => {
    const htmlContent = `
      <html>
      <body>
        <div>
          <ul id="list">
            <li><a href="./pages/1.html" target="rightframe">Ссылка 1 (из in1)</a></li>
            <li><a href="./pages/2.html" target="rightframe">Ссылка 2 (из in1)</a></li>
            <li><a href="./pages/3.html" target="rightframe">Ссылка 3 (из in1)</a></li>
          </ul>
        </div>
      </body>
      </html>
    `;

    const expectedLinkTexts = [
      'Ссылка 1 (из in1)',
      'Ссылка 2 (из in1)',
      'Ссылка 3 (из in1)',
    ];

    const actualLinkTexts = extractLinkTextFromHTML(htmlContent);

    expect(actualLinkTexts).toEqual(expectedLinkTexts);
  });

  it('should return an empty array if the HTML does not contain the list with id="list"', () => {
    const htmlContent = `
      <html>
      <body>
        <div>
          <p>Some other content</p>
        </div>
      </body>
      </html>
    `;

    const actualLinkTexts = extractLinkTextFromHTML(htmlContent);

    expect(actualLinkTexts).toEqual([]);
  });

  it('should return an empty array if the list is empty', () => {
    const htmlContent = `
      <html>
      <body>
        <div>
          <ul id="list"></ul>
        </div>
      </body>
      </html>
    `;

    const actualLinkTexts = extractLinkTextFromHTML(htmlContent);

    expect(actualLinkTexts).toEqual([]);
  });

  it('should handle links with special characters in the text', () => {
    const htmlContent = `
      <html>
      <body>
        <div>
          <ul id="list">
            <li><a href="#">Ссылка с &amp; знаком</a></li>
            <li><a href="#">Ссылка с &lt; &gt; символами</a></li>
          </ul>
        </div>
      </body>
      </html>
    `;

    const expectedLinkTexts = [
      'Ссылка с & знаком', // Cheerio преобразует HTML entities
      'Ссылка с < > символами',
    ];

    const actualLinkTexts = extractLinkTextFromHTML(htmlContent);
    expect(actualLinkTexts).toEqual(expectedLinkTexts); // Используем toEqual для точного сравнения
  });

  it('Выводим результат в кансоль без анализа', () => {
    const htmlContent = `
      <html>
      <body>
        <div>
          <ul id="list">
            <li><a href="#">Ссылка 1</a></li>
            <li><a href="#">Ссылка 2</a></li>
            <li><a href="#">Ссылка 3</a></li>
            <li><a href="#">Ссылка 4</a></li>
          </ul>
        </div>
      </body>
      </html>
    `;

    const expectedLinkTexts = [
      'Ссылка с & знаком', // Cheerio преобразует HTML entities
      'Ссылка с < > символами',
    ];

    const actualLinkTexts = extractLinkTextFromHTML(htmlContent);
    console.log(actualLinkTexts);
    
  });

});

describe('readFileTextFromHTML', () => {
  it('Тест просто выводит результат работы функции readFileTextFromHTML', async () => {
    // 1. Подготовка (Arrange)
    const existingFilePath = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/root.html'; // Путь к существующему файлу

    // 2. Действие (Act)
    let result;
    try {
      result =  readFileTextFromHTML(existingFilePath);

      console.log(result); // Выводим результат в консоль
    } catch (error) {
      console.error('Ошибка при выполнении теста:', error);
      return; // Важно выйти из теста, если произошла ошибка
    }
  });
});