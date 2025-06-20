const { 
        findMaxNumberInFilenames ,
        findMaxNumberAfterDash ,
        findMaxPgNumber,
        hasLiElementsInsideList,
        extractAndTransformHrefs,
        addListItemsRoot,     
        addListItemsIn,
        removeStringFromText,
        findMaxSecondDigitInFilenames,
        findFilesByPrefix,
        getFileNamesInDirectory,
        filterFilesByPage,
        extractNumberFromPath
      } = require('./additionalFunctions'); // Замените 'your-file-name'
    
const assert = require('assert');

/**
 * 
 * findMaxNumberInFilenames
 * Находит максимальное число, содержащееся в начале имен файлов в указанной директории.
 * 
 */

describe('findMaxNumberInFilenames', () => {
    it('Тест findMaxNumberInFilenames', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
      const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/page/1'; 
     
  
      // Act: Call the function
      const actualResult = findMaxNumberInFilenames(directoryToTest);
      console.log(actualResult);
      
      // Assert: Check if the returned value matches the expected result
      assert.strictEqual(actualResult, expectedResult);
    });
  });


/**
 * 
 * findMaxNumberAfterDash
 * Находит максимальную цифру после дефиса в именах файлов, начинающихся с определенной строки, в указанной директории.
 * 
 */

describe('findMaxNumberAfterDash', () => {
    it('Тест findMaxNumberAfterDash', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
    
      const directoryPath = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
      const prefixToSearch = 'pg1';
      maxNumber = findMaxNumberAfterDash(directoryPath, prefixToSearch);
      console.log(maxNumber);
      
    });
 });


/**
 * 
 * findMaxPgNumber
 * Находит максимальную цифру в префиксе имени файла "pg" в указанной папке.
 * 
 */

describe('findMaxPgNumber', () => {
  it('Тест findMaxPgNumber', () => {
    // Arrange: Prepare the directory to test (you still need to create this directory and files)
    const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
    

    // Act: Call the function
    const actualResult = findMaxPgNumber(directoryToTest);
    console.log(actualResult);
   
  });
});

/**
 * 
 * hasLiElementsInsideList
 * Проверяет, содержит ли HTML-фрагмент теги внутри тега
 * 
 */

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

/**
 * extractAndTransformHrefs
 * Извлекает и преобразует значения атрибутов href из элементов <a>, находящихся внутри элемента <ul id="list"> в HTML-строке.
 * Удаляет префикс "./pages/" из каждого значения href.
 */

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




/**
 * 
 * addListItems 
 * Добавляет новые элементы li в HTML-код с переносом строки между ними в файле root
 * 
 */

describe('addListItemsRoot', () => {
  const originalHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">

    <li><a href="themes/in1.html" target="leftframe">Установка аапач</a></li>
    
    <li><a href="in2.html" target="leftframe">Установка php</a></li>
    
    <li><a href="in3.html" target="leftframe">Страница 2</a></li>
    
    <li><a href="in4.html" target="leftframe">Страница 3</a></li>

 </ul>
</body>
</html>
`;

  it('should add new list items to the existing list', () => {
    const linkTexts = 'Страница 4';
    const startNumber = 5;
    console.log( addListItemsRoot(originalHtml, linkTexts, startNumber));

  });
})





/**
 * 
 * addListItemsIn
 * Добавляет новые элементы li в HTML-код с переносом строки между ними в файле in
 * 
 */

describe('addListItemsIn', () => {
  const html = `
  <!DOCTYPE html>
<html>
<head>
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
            <ul id = "list">
                  <li><a href="./pages/pg1-1.html" target="rightframe">Ссылка 1 (из in1)</a></li>
                <li><a href="./pages/pg1-2.html" target="rightframe">Ссылка 2 (из in1)</a></li>
                <li><a href="./pages/pg1-3.html" target="rightframe">Ссылка 2 (из in1)</a></li>
                <li><a href="./pages/pg1-4.html" target="rightframe">Ссылка 2 (из in1)</a></li>
            </ul>
        </li>
    </ul>

</body>
</html>
`;

  it('should add new list items to the existing list', () => {
    
    const text = 'Страница 4';
    const pgIndex = 5;
    const indexHtml = 1;
    console.log(addListItemsIn(html, text, pgIndex, indexHtml ));

  });
})


/**
 * removeStringFromText
 * Удаляет указанную строку из текста. Если нужно удалить все вхождения, то значение 'removeAll' 
 * для параметра options.occurrence удалит все вхождения.
 */


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



/**
 * findMaxSecondDigitInFilenames
 * Анализирует массив имен файлов, имеющих вид 'pg[цифра]-[цифра].html', где первая цифра одинакова для всех файлов.
 * Возвращает массив из двух элементов:
 */

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

/**
 * 
 * findFilesByPrefix
 * Находит файлы в массиве, начинающиеся с заданного префикса..
 * 
 */

describe('findFilesByPrefix', () => {
  it('should find files with the specified prefix', () => {
    const files = [
      "pg1-1.html",
      "pg1-2.html",
      "pg2-1.html",
      "pg3-1.html",
    ];
    const prefix = "pg1";
    const expectedFiles = ["pg1-1.html", "pg1-2.html"]; // Ожидаемый результат

    const foundFiles = findFilesByPrefix(files, prefix);
    console.log('foundFiles--', foundFiles);

    //  Убеждаемся, что найденные файлы соответствуют ожидаемым
    expect(foundFiles).toEqual(expectedFiles);
  });

  it('should return an empty array if no files match', () => {
    const files = [
      "pg2-1.html",
      "pg3-1.html",
    ];
    const prefix = "pg1";
    const expectedFiles = []; // Ожидаем пустой массив

    const foundFiles = findFilesByPrefix(files, prefix);

    expect(foundFiles).toEqual(expectedFiles);
  });

  it('should handle different prefixes', () => {
      const files = [
          "pg1-1.html",
          "pg2-1.html",
          "pg2-2.html",
          "pg3-1.html"
      ];
            
      const prefix = "pg2";
      const expectedFiles = ["pg2-1.html", "pg2-2.html"];
      const foundFiles = findFilesByPrefix(files, prefix);
      console.log(foundFiles);

      expect(foundFiles).toEqual(expectedFiles);
  });

  it('should work with a prefix that includes numbers', () => {
        const files = [
            "pg12-1-1.html",
            "pg12-1-2.html",
            "pg2-1.html"
        ];
        const prefix = "pg12-1";
        const expectedFiles = ["pg12-1-1.html", "pg12-1-2.html"];
        const foundFiles = findFilesByPrefix(files, prefix);
        expect(foundFiles).toEqual(expectedFiles);
    });

});



describe('getFileNamesInDirectory', () => {
  it('getFileNamesInDirectory', () => {


    const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
    
    const fileNames = getFileNamesInDirectory(directoryToTest);
    console.log('fileNames--', fileNames);

  });

});

describe('filterFilesByPage + findMaxSecondDigitInFilenames', () => {
  it('filterFilesByPage + findMaxSecondDigitInFilenames', () => {
  // Пример использования:
    const fileNames = [
      'pg1-1.html', 'pg1-2.html',
      'pg1-3.html', 'pg1-4.html',
      'pg1-5.html', 'pg20-1.html',
      'pg20-2.html', 'pg20-3.html',
      'pg3-1.html', 'pg3-2.html',
      'pg3-3.html', 'pg4-1.html'
    ];

    const result = filterFilesByPage(fileNames, 20);

    console.log('result--', result);
    // const findMax =  findMaxSecondDigitInFilenames(result);

    // console.log('findMax--', findMax);

  });
});

  describe('extractNumberFromPath', () => {
  it('extractNumberFromPath', () => {
  // Примеры использования:
    console.log(extractNumberFromPath("themes/in1.html"));    // 1
    console.log(extractNumberFromPath("themes/in48.html"));   // 48
    console.log(extractNumberFromPath("themes/in100.html"));  // 100
    console.log(extractNumberFromPath("themes/inabc.html"));  // null (нет числа)

  });

});