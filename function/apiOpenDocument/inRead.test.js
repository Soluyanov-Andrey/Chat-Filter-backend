const { extractLinksAndTextFromSecondUl , getHrefByLinkText } = require('./inRead');
const assert = require('assert');

describe('extractLinksAndTextFromSecondUl', () => {
  it('should return an empty array if the ul with id "links" is not found', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <ul>
          <li><a href="other.html">Other Link</a></li>
        </ul>
      </body>
      </html>
    `;
    const result = extractLinksAndTextFromSecondUl(html);
    assert.deepStrictEqual(result, []);
  });

  it('should extract links and text from the ul with id "links"', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <ul>
          <li><a href="../root.html">Главная</a></li>
        </ul>
        <ul id="list">
          <li><a href="1.html">Ссылка 1 (из in1)</a></li>
          <li><a href="2.html">Ссылка 2 (из in1)</a></li>
        </ul>
      </body>
      </html>
    `;
    const expected = [
      [ '1.html', 'Ссылка 1 (из in1)' ],
      [ '2.html', 'Ссылка 2 (из in1)' ]
    ];
    const result = extractLinksAndTextFromSecondUl(html);
    assert.deepStrictEqual(result, expected);
  });

  it('should handle HTML with extra whitespace and newlines', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <ul>
          <li><a href="../root.html">Главная</a></li>
        </ul>
        
        
        <ul id="list">
          <li><a href="1.html">Ссылка 1 (из in1)</a></li>
          <li><a href="2.html">Ссылка 2 (из in1)</a></li>
        </ul>
      </body>
      </html>
    `;
    const expected = [
      [ '1.html', 'Ссылка 1 (из in1)' ],
      [ '2.html', 'Ссылка 2 (из in1)' ]
    ];
    const result = extractLinksAndTextFromSecondUl(html);
    assert.deepStrictEqual(result, expected);
  });

  it('should return an empty array if the ul with id "links" has no links', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <ul id="list">
          <li>No link here</li>
          <li>Another one</li>
        </ul>
      </body>
      </html>
    `;
    const result = extractLinksAndTextFromSecondUl(html);
    assert.deepStrictEqual(result, []);
  });
});


describe('getHrefByLinkText', () => {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">

    <li><a href="./themes/in1.html" target="leftframe">Установка аапач</a></li>
    
    <li><a href="in1.html" target="leftframe">Установка php</a></li>
    
    <li><a href="in2.html" target="leftframe">Страница 2</a></li>
    
    <li><a href="in3.html" target="leftframe">Страница 3</a></li>

 </ul>
</body>
</html>
`;

  it('should return the correct href for "Страница 2"', () => {
    expect(getHrefByLinkText(htmlContent, 'Страница 2')).toBe('in2.html');
  });

  it('should return the correct href for "Установка php"', () => {
    expect(getHrefByLinkText(htmlContent, 'Установка php')).toBe('in1.html');
  });

  it('should return the correct href for "Установка аапач"', () => {
    expect(getHrefByLinkText(htmlContent, 'Установка аапач')).toBe('./themes/in1.html');
  });

  it('should return null for a non-existent link', () => {
    expect(getHrefByLinkText(htmlContent, 'Несуществующая ссылка')).toBeNull();
  });

  it('should handle leading/trailing whitespace in the search text', () => {
    expect(getHrefByLinkText(htmlContent, '  Страница 2  ')).toBe('in2.html');
  });

  it('should handle leading/trailing whitespace in the link text in the HTML', () => {
    const htmlWithWhitespace = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">

    <li><a href="./themes/in1.html" target="leftframe">  Установка аапач  </a></li>

 </ul>
</body>
</html>
`;
    expect(getHrefByLinkText(htmlWithWhitespace, 'Установка аапач')).toBe('./themes/in1.html');
  });

  it('should return null if the list element is empty', () => {
    const htmlWithEmptyList = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">
 </ul>
</body>
</html>
`;
    expect(getHrefByLinkText(htmlWithEmptyList, 'Установка аапач')).toBeNull();
  });

  it('should handle different casing in the search text', () => {
      const htmlWithMixedCase = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">
    <li><a href="./themes/in1.html" target="leftframe">Установка Аапач</a></li>
 </ul>
</body>
</html>
`;
      expect(getHrefByLinkText(htmlWithMixedCase, 'Установка Аапач')).toBe('./themes/in1.html');
  });

  it('should handle special characters in search text', () => {
    const htmlWithSpecialChars = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">

    <li><a href="./themes/in1.html" target="leftframe">Установка аапач&amp;тест</a></li>
 </ul>
</body>
</html>
`;
    expect(getHrefByLinkText(htmlWithSpecialChars, 'Установка аапач&тест')).toBe('./themes/in1.html');
  });

});