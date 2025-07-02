const cheerio = require('cheerio');
const { getFilenameFromListItem } = require('./apiDeleteThemes.js'); 

describe('getFilenameFromListItem', () => {
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

  it('должен извлекать имя файла из ссылки в элементе списка с указанным индексом', () => {
    expect(getFilenameFromListItem(htmlContent, 4)).toBe('pg1-19.html');
    expect(getFilenameFromListItem(htmlContent, 1)).toBe('root.html');

  });

  it('должен возвращать null, если элемент списка с указанным индексом не найден', () => {
    expect(getFilenameFromListItem(htmlContent, 100)).toBe(null);
    expect(getFilenameFromListItem('<p>Нет списка</p>', 1)).toBe(null); // Добавлено
  });

  it('должен возвращать null, если в элементе списка отсутствует ссылка (href)', () => {
    const htmlWithoutHref = `<ul><li><a>Текст без ссылки</a></li></ul>`;
    expect(getFilenameFromListItem(htmlWithoutHref, 1)).toBe(null);
  });

  it('должен обрабатывать HTML с различными структурами URL', () => {
    const htmlWithDifferentUrls = `<ul><li><a href="pg1-1.html">Ссылка 1</a></li><li><a href="/absolute/pg1-2.html">Ссылка 2</a></li><li><a href="https://example.com/pg1-3.html">Ссылка 3</a></li></ul>`;
    expect(getFilenameFromListItem(htmlWithDifferentUrls, 1)).toBe('pg1-1.html');
    expect(getFilenameFromListItem(htmlWithDifferentUrls, 2)).toBe('pg1-2.html');
    expect(getFilenameFromListItem(htmlWithDifferentUrls, 3)).toBe('pg1-3.html');
  });

  it('должен корректно обрабатывать ошибки при парсинге HTML', () => {
    // Этот тест проверяет, что функция не вылетает с ошибкой при некорректном HTML
    expect(getFilenameFromListItem('<<>>', 1)).toBe(null);
  });

  it('должен возвращать null, если внутри ul находятся только текстовые li, а не со ссылкой', () => {
    const htmlWithoutLinks = `<ul><li>текст</li><li>еще текст</li></ul>`;
    expect(getFilenameFromListItem(htmlWithoutLinks, 1)).toBe(null);
    expect(getFilenameFromListItem(htmlWithoutLinks, 2)).toBe(null);
  });

});