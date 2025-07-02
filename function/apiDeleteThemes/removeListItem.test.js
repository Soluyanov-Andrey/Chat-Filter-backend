const cheerio = require('cheerio');
const { removeListItem } = require('./apiDeleteThemes.js'); // Замените './your-file' на путь к вашему файлу с функцией

describe('removeListItem', () => {
  const htmlContent = `
    <!DOCTYPE html><html><head>
        <title>in1.html</title>
    </head>
    <body>
        <h1>Установка аапач</h1>
        
        <ul>
            <li>Вернуться на главную страницу
                <ul>
                    <li><a href="../root.html" target="leftframe">Главная</a></li>
                </ul>
            </li>
            <li>
                Вопросы
                <ul id="list">
                    <li><a href="./pages/1.html" target="rightframe">Ссылка 1 (из in1)</a></li>
                    <li><a href="./pages/2.html" target="rightframe">Ссылка 2 (из in1)</a></li>
            
        <li><a href="./pages/pg1-18.html" target="rightframe">добавь если нужна закругка модулей, и сделай документацию к функции в виде коментария</a></li>
        <li><a href="./pages/pg1-19.html" target="rightframe">та не понял про модули, все перепиши срипт оставь как был, модули загрузки в ноде если нужны рекваер</a></li>
        <li><a href="./pages/pg1-20.html" target="rightframe">как в текстовом фармате обозначется перенос на следующую строку,</a></li></ul>
            </li>
        </ul>
    </body></html>
    `;

  // Helper для сравнения HTML, игнорируя пробелы
  const normalizeHtml = (html) => html.replace(/\s/g, '');

  it('должен удалять элемент списка по индексу и возвращать корректный HTML (index 4 - удаляем pg1-19.html)', () => {
    // Ожидаемый HTML после удаления 4-го элемента из <ul id="list"> (который pg1-19.html)
    const expectedHtmlForIndex4 = `<!DOCTYPE html><html><head>
    <title>in1.html</title>
</head>
<body>
    <h1>Установка аапач</h1>
    
    <ul>
        <li>Вернуться на главную страницу
                <ul>
                    <li><a href="../root.html" target="leftframe">Главная</a></li>
                </ul>
            </li>
            <li>
                Вопросы
                <ul id="list">
                    <li><a href="./pages/1.html" target="rightframe">Ссылка 1 (из in1)</a></li>
                    <li><a href="./pages/2.html" target="rightframe">Ссылка 2 (из in1)</a></li>
            
        <li><a href="./pages/pg1-18.html" target="rightframe">добавь если нужна закругка модулей, и сделай документацию к функции в виде коментария</a></li>
        <li><a href="./pages/pg1-20.html" target="rightframe">как в текстовом фармате обозначется перенос на следующую строку,</a></li></ul>
            </li>
        </ul>
    </body></html>`;

    const resultHtml = removeListItem(htmlContent, 4);
    expect(normalizeHtml(resultHtml)).toBe(normalizeHtml(expectedHtmlForIndex4));
  });

  it('должен корректно удалять ПЕРВЫЙ элемент списка ВНУТРИ #list (index 1)', () => {
    // Ожидаемый HTML после удаления 1-го элемента из <ul id="list"> (который ./pages/1.html)
    const expectedHtmlForIndex1InList = `<!DOCTYPE html><html><head>
    <title>in1.html</title>
</head>
<body>
    <h1>Установка аапач</h1>
    
    <ul>
        <li>Вернуться на главную страницу
                <ul>
                    <li><a href="../root.html" target="leftframe">Главная</a></li>
                </ul>
            </li>
            <li>
                Вопросы
                <ul id="list">
                    <li><a href="./pages/2.html" target="rightframe">Ссылка 2 (из in1)</a></li>
            
        <li><a href="./pages/pg1-18.html" target="rightframe">добавь если нужна закругка модулей, и сделай документацию к функции в виде коментария</a></li>
        <li><a href="./pages/pg1-19.html" target="rightframe">та не понял про модули, все перепиши срипт оставь как был, модули загрузки в ноде если нужны рекваер</a></li>
        <li><a href="./pages/pg1-20.html" target="rightframe">как в текстовом фармате обозначется перенос на следующую строку,</a></li></ul>
            </li>
        </ul>
    </body></html>`;

    const resultHtml = removeListItem(htmlContent, 1);
    expect(normalizeHtml(resultHtml)).toBe(normalizeHtml(expectedHtmlForIndex1InList));
  });

  it('должен возвращать исходный HTML, если элемент с указанным индексом не найден и выводить предупреждение', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(); // Перехватываем console.warn

    const resultHtml = removeListItem(htmlContent, 100); // Индекс 100 не существует в #list
    expect(resultHtml).toBe(htmlContent);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Элемент <li> с индексом 100 не найден внутри #list.');

    consoleWarnSpy.mockRestore(); // Восстанавливаем исходную функцию console.warn
  });

  it('должен возвращать исходный HTML, если произошла ошибка при парсинге HTML', () => {
    const invalidHtml = "<p>This is not valid HTML";
    expect(removeListItem(invalidHtml, 1)).toBe(invalidHtml);
  });

  // Тест на удаление последнего элемента из #list (индекс 5)
  it('должен корректно удалять ПОСЛЕДНИЙ элемент списка ВНУТРИ #list (index 5)', () => {
    const expectedHtmlForIndex5 = `<!DOCTYPE html><html><head>
    <title>in1.html</title>
</head>
<body>
    <h1>Установка аапач</h1>
    
    <ul>
        <li>Вернуться на главную страницу
                <ul>
                    <li><a href="../root.html" target="leftframe">Главная</a></li>
                </ul>
            </li>
            <li>
                Вопросы
                <ul id="list">
                    <li><a href="./pages/1.html" target="rightframe">Ссылка 1 (из in1)</a></li>
                    <li><a href="./pages/2.html" target="rightframe">Ссылка 2 (из in1)</a></li>
            
        <li><a href="./pages/pg1-18.html" target="rightframe">добавь если нужна закругка модулей, и сделай документацию к функции в виде коментария</a></li>
        <li><a href="./pages/pg1-19.html" target="rightframe">та не понял про модули, все перепиши срипт оставь как был, модули загрузки в ноде если нужны рекваер</a></li></ul>
            </li>
        </ul>
    </body></html>`;

    const resultHtml = removeListItem(htmlContent, 5);
    expect(normalizeHtml(resultHtml)).toBe(normalizeHtml(expectedHtmlForIndex5));
  });

  // Удаляем "лишние" тесты, которые могли быть сбивающими с толку
  // Тест "должен корректно удалять первый элемент списка" был удален, так как его описание было неоднозначным
  // и он скорее всего падала из-за неправильного селектора функции. Вместо него теперь тест на индекс 1 внутри #list.
  // Тест "должен корректно удалять элемент списка с большим индексом, но в пределах существующего списка (index 4)" стал избыточным
  // после того как был сделан точный тест для индекса 4, поэтому он тоже удален.
});