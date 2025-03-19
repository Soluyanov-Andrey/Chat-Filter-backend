const cheerio = require('cheerio');
const fs = require('fs');
const { extractHrefAndTopicFromFile } = require('./openFolder'); // Replace 'yourFileName'

// Mock the fs module
jest.mock('fs');

describe('extractHrefAndTopicFromFile', () => {
  const filePath = 'test.html';
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head><title>Test Page</title></head>
    <body>
      <a href="./themes/in1.html">Link 1</a>
      <a href="page2.html">Link 2</a>
      <a href="https://example.com/page3.html">Link 3</a>
    </body>
    </html>
  `;

  beforeEach(() => {
    // Clear mock implementations before each test
    fs.readFileSync.mockClear();
    console.error = jest.fn(); // Mock console.error
  });

  it('should extract href and topic from all a tags in the file', () => {
    fs.readFileSync.mockReturnValue(htmlContent);

    const expected = [
      { href: 'in1.html', topic: 'Link 1' },
      { href: 'page2.html', topic: 'Link 2' },
      { href: 'page3.html', topic: 'Link 3' },
    ];
    const actual = extractHrefAndTopicFromFile(filePath);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
    expect(actual).toEqual(expect.arrayContaining(expected)); // Use expect.arrayContaining
    expect(actual.length).toBe(expected.length); // Ensure the same number of elements
  });

  it('should handle an empty HTML file', () => {
    fs.readFileSync.mockReturnValue('<!DOCTYPE html><html><head></head><body></body></html>');
    const result = extractHrefAndTopicFromFile(filePath);
    expect(result).toEqual([]);
  });

  it('should return an empty array if the file does not exist', () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });
    const result = extractHrefAndTopicFromFile(filePath);
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalled(); // Log the error

  });

  it('should handle a file with no a tags', () => {
    fs.readFileSync.mockReturnValue('<!DOCTYPE html><html><head></head><body><h1>No links here</h1></body></html>');
    const result = extractHrefAndTopicFromFile(filePath);
    expect(result).toEqual([]);
  });

  it('should handle a tags with no href attribute', () => {
    fs.readFileSync.mockReturnValue('<!DOCTYPE html><html><head></head><body><a>Link</a></body></html>');
    const result = extractHrefAndTopicFromFile(filePath);
    expect(result).toEqual([]);
  });



    it('should return an empty array if no topic exist', () => {
        fs.readFileSync.mockReturnValue('<!DOCTYPE html><html><head></head><body><a href="test.html"></a></body></html>');
        const result = extractHrefAndTopicFromFile(filePath);
        expect(result).toEqual([]);
    });

    it('should handle special characters in topic', () => {
        fs.readFileSync.mockReturnValue('<!DOCTYPE html><html><head></head><body><a href="test.html">Topic with &amp; and &lt; and &gt;</a></body></html>');
        const result = extractHrefAndTopicFromFile(filePath);
        expect(result).toEqual([{ href: 'test.html', topic: 'Topic with & and < and >' }]);
    });

    it('should handle absolute URLs', () => {
        fs.readFileSync.mockReturnValue('<!DOCTYPE html><html><head></head><body><a href="https://example.com/test.html">Absolute URL</a></body></html>');
        const result = extractHrefAndTopicFromFile(filePath);
        expect(result).toEqual([{ href: 'test.html', topic: 'Absolute URL' }]);
    });

});