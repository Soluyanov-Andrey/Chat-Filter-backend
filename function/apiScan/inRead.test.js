const { extractLinksAndTextFromSecondUl } = require('./inRead');
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
        <ul id="links">
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
        
        
        <ul id="links">
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
        <ul id="links">
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