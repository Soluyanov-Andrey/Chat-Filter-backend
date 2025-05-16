const { 
        findMaxNumberInFilenames ,
        findMaxNumberAfterDash ,
        findMaxPgNumber,
        hasLiElementsInsideList,
        extractAndTransformHrefs,
        findMaxSecondDigitInFilenames
      } = require('./additionalFunctions'); // Замените 'your-file-name'
      
const assert = require('assert');

describe('hasLiElementsInsideList', () => {
  it('should return true if <li> elements are present inside <ul id="list">', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul id="list">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </body>
      </html>
    `;
    expect(hasLiElementsInsideList(html)).toBe(true);
  });

  it('should return false if there are no <li> elements inside <ul id="list">', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul id="list">
        </ul>
      </body>
      </html>
    `;
    expect(hasLiElementsInsideList(html)).toBe(false);
  });

  it('should return false if <ul id="list"> does not exist', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul>
          <li>Item 1</li>
        </ul>
      </body>
      </html>
    `;
    expect(hasLiElementsInsideList(html)).toBe(false);
  });

  it('should handle empty HTML string', () => {
    const html = '';
    expect(hasLiElementsInsideList(html)).toBe(false);
  });

  it('should handle malformed HTML', () => {
    const html = '<ul id="list"><li>'; // Unclosed <li> tag
    expect(hasLiElementsInsideList(html)).toBe(true); // Cheerio might still find the <li>
  });

  it('should handle HTML with attributes on the <li> elements', () => {
    const html = `
      <ul id="list">
        <li class="active">Item 1</li>
        <li data-id="123">Item 2</li>
      </ul>
    `;
    expect(hasLiElementsInsideList(html)).toBe(true);
  });

  it('should handle nested <li> elements (only direct children should be counted)', () => {
      const html = `
      <ul id="list">
        <li>Item 1
           <ul>
              <li>Nested Item</li>
           </ul>
        </li>
      </ul>
      `;
    expect(hasLiElementsInsideList(html)).toBe(true);
  });


});





describe('findMaxPgNumber', () => {
  it('Тест findMaxPgNumber', () => {
    // Arrange: Prepare the directory to test (you still need to create this directory and files)
    const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
    

    // Act: Call the function
    const actualResult = findMaxPgNumber(directoryToTest);
    console.log(actualResult);
   
  });
});




describe('findMaxNumberInFilenames', () => {
    it('Тест findMaxNumberInFilenames', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
      const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
      const expectedResult = 1;
  
      // Act: Call the function
      const actualResult = findMaxNumberInFilenames(directoryToTest);
      console.log(actualResult);
      
      // Assert: Check if the returned value matches the expected result
      assert.strictEqual(actualResult, expectedResult);
    });
  });




describe('findMaxNumberAfterDash', () => {
    it('Тест findMaxNumberAfterDash', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
    
      const directoryPath = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
      const prefixToSearch = 'pg3';
      maxNumber = findMaxNumberAfterDash(directoryPath, prefixToSearch);
      console.log(maxNumber);
      
    });
 });



/**
 * @jest-environment jsdom
 */

const { removeStringFromText } = require('./additionalFunctions'); // Замените на правильный путь к файлу

describe('removeStringFromText', () => {
  it('should remove the first occurrence of a string (case-sensitive)', () => {
    const text = "This is a test string.  This is another test.";
    const stringToRemove = "test";
    const result = removeStringFromText(text, stringToRemove);
    expect(result).toBe("This is a  string.  This is another test.");
  });

  it('should remove all occurrences of a string (case-sensitive)', () => {
    const text = "test test test";
    const stringToRemove = "test";
    const result = removeStringFromText(text, stringToRemove, { occurrence: 'removeAll' });
    console.log(result);
    
    expect(result).toBe("  "); // Три пробела
  });

  it('should remove the first occurrence of a string (case-insensitive)', () => {
    const text = "This is a Test string.";
    const stringToRemove = "test";
    const result = removeStringFromText(text, stringToRemove, { caseSensitive: false });
    expect(result).toBe("This is a  string.");
  });

  it('should remove all occurrences of a string (case-insensitive)', () => {
    const text = "Test tEst TEST";
    const stringToRemove = "test";
    const result = removeStringFromText(text, stringToRemove, { occurrence: 'removeAll', caseSensitive: false });
    console.log(result);
    expect(result).toBe("  "); //Три пробела
  });

  it('should handle strings with special characters', () => {
    const text = "Special characters: . * + ? ^ $ {} () [] \\ |";
    const stringToRemove = ".";
    const result = removeStringFromText(text, stringToRemove);
    expect(result).toBe("Special characters:  * + ? ^ $ {} () [] \\ |");
  });

  it('should handle removing an empty string', () => {
    const text = "Some text";
    const stringToRemove = "";
    const result = removeStringFromText(text, stringToRemove);
    expect(result).toBe("Some text"); // Removing an empty string should not change the text
  });

  it('should handle an empty text string', () => {
    const text = "";
    const stringToRemove = "test";
    const result = removeStringFromText(text, stringToRemove);
    expect(result).toBe(""); // Removing from an empty text string should return an empty string
  });

    it('should not modify the text if the string to remove is not found', () => {
        const text = "This is some text.";
        const stringToRemove = "notfound";
        const result = removeStringFromText(text, stringToRemove);
        expect(result).toBe("This is some text.");
    });

    it('should handle numbers in the string to remove', () => {
        const text = "This is a test string with 12345 in it.";
        const stringToRemove = "12345";
        const result = removeStringFromText(text, stringToRemove);
        expect(result).toBe("This is a test string with  in it.");
    });

    it('should handle unicode characters correctly', () => {
      const text = "Привет мир!";
      const stringToRemove = "мир";
      const result = removeStringFromText(text, stringToRemove);
      expect(result).toBe("Привет !");
    });

    it('should handle unicode characters correctly', () => {
      const text = "./pages/1.html";
      const stringToRemove = "./pages/";
      const result = removeStringFromText(text, stringToRemove);
      expect(result).toBe("1.html");
    });

     
});


describe('extractAndTransformHrefs', () => {
  it('should extract and transform hrefs from ul#list, removing "./pages/"', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul id="list">
          <li><a href="./pages/pg1-1.html">Link 1</a></li>
          <li><a href="./pages/pg1-2.html">Link 2</a></li>
          <li><a href="./pages/pg1-3.html">Link 3</a></li>
          <li><a href="./pages/pg2-1.html">Link 1</a></li>
          <li><a href="./pages/pg2-2.html">Link 2</a></li>
          <li><a href="./pages/pg25-3.html">Link 3</a></li>
        </ul>
      </body>
      </html>
    `;
    const expected = ['pg1-1.html', 'pg1-2.html', 'pg1-3.html','pg2-1.html','pg2-2.html','pg25-3.html'];
    expect(extractAndTransformHrefs(html)).toEqual(expect.arrayContaining(expected));
    expect(extractAndTransformHrefs(html).length).toBe(expected.length);
  });

  it('should return an empty array if ul#list does not exist', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul>
          <li><a href="./pages/pg1-1.html">Link 1</a></li>
        </ul>
      </body>
      </html>
    `;
    expect(extractAndTransformHrefs(html)).toEqual([]);
  });

  it('should return an empty array if there are no <a> tags inside ul#list', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul id="list">
          <li>No links here</li>
        </ul>
      </body>
      </html>
    `;
    expect(extractAndTransformHrefs(html)).toEqual([]);
  });

  it('should return an empty array if no hrefs start with "./pages/"', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul id="list">
          <li><a href="../other/link.html">Link 1</a></li>
          <li><a href="http://example.com">Link 2</a></li>
        </ul>
      </body>
      </html>
    `;
    expect(extractAndTransformHrefs(html)).toEqual([]);
  });

  it('should handle mixed hrefs, transforming only those that start with "./pages/"', () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head><title>Test</title></head>
      <body>
        <ul id="list">
          <li><a href="./pages/pg1-1.html">Link 1</a></li>
          <li><a href="../other/link.html">Link 2</a></li>
          <li><a href="./pages/pg1-2.html">Link 3</a></li>
          <li><a href="http://example.com">Link 4</a></li>
        </ul>
      </body>
      </html>
    `;
    const expected = ['pg1-1.html', 'pg1-2.html'];
    expect(extractAndTransformHrefs(html)).toEqual(expect.arrayContaining(expected));
    expect(extractAndTransformHrefs(html).length).toBe(expected.length);
  });

  it('should handle empty HTML string', () => {
    const html = '';
    expect(extractAndTransformHrefs(html)).toEqual([]);
  });

  it('should handle malformed HTML (incomplete tags)', () => {
    const html = '<ul id="list"><li><a href="./pages/link.html">'; // Unclosed tags
    const expected = ['link.html'];
    expect(extractAndTransformHrefs(html)).toEqual(expect.arrayContaining(expected));
    expect(extractAndTransformHrefs(html).length).toBe(expected.length);
  });
});


describe('findMaxSecondDigitInFilenames', () => {
  it('should return the first digit and the maximum second digit', () => {
    const filenames = ['pg1-1.html', 'pg1-2.html', 'pg1-3.html'];
    const expected = [1, 3];
    expect(findMaxSecondDigitInFilenames(filenames)).toEqual(expected);
  });

  it('should handle different second digit ranges', () => {
    const filenames = ['pg2-1.html', 'pg2-5.html', 'pg2-2.html'];
    const expected = [2, 5];
    expect(findMaxSecondDigitInFilenames(filenames)).toEqual(expected);
  });

  it('should return [null, null] if filenames have inconsistent first digits', () => {
    const filenames = ['pg1-1.html', 'pg2-2.html', 'pg1-3.html'];
    const expected = [null, null];
    expect(findMaxSecondDigitInFilenames(filenames)).toEqual(expected);
  });

  it('should return [null, null] for an empty array', () => {
    const filenames = [];
    const expected = [null, null];
    expect(findMaxSecondDigitInFilenames(filenames)).toEqual(expected);
  });

  it('should return [null, null] if no filenames match the pattern', () => {
    const filenames = ['abc.txt', 'def.html'];
    const expected = [null, null];
    expect(findMaxSecondDigitInFilenames(filenames)).toEqual(expected);
  });

  it('should handle a single valid filename', () => {
      const filenames = ['pg7-4.html'];
      const expected = [7, 4];
      expect(findMaxSecondDigitInFilenames(filenames)).toEqual(expected);
  });
});