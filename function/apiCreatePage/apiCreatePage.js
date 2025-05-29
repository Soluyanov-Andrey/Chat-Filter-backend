
const { getHrefFromHTMLFiles } = require('./../apiOpenDocument/getHrefByIndex'); 
const { readFileContent } = require('./../subsidiaryFunction/fileUtils'); 
const { hasLiElementsInsideList } = require('./../apiCreatePage/additionalFunctions'); 
const { extractContextsFromChatPrompts } = require('./../apiScan/scan'); 
const { findMaxPgNumber , extractAndTransformHrefs , findMaxSecondDigitInFilenames } = require('./additionalFunctions'); 
const { shortenStrings } = require('./../subsidiaryFunction/shortenStrings'); 

const { saveFilterHTML } = require('../subsidiaryFunction/deleteAllScaner');
const { addListItems } = require('./additionalFunctions'); 
const { saveHtmlToFile } = require('../subsidiaryFunction/fileUtils'); 

const { FULL_PATH , DOCUMENT_PAGE_HREF } = require('./../../config'); // Импортируем переменные


function initPath(path, indexTheme){

    // Берем изначальный путь до папки document
    // media/andrey/project/project/servers/SERVER-node-chatGPT/document

    const pathFull = path + '/' + DOCUMENT_PAGE_HREF;

    // формируем путь до папки themes/pages внутри document
    const pathPage = path + '/' + 'themes/pages';

    //-------------------------------------------------------------------------------------------------------------------
    // 1 Берем ссылку из файла root это ссылка будет указывать файл in в который будем производить запись
    // вернет из файла root содержание сылки a href="in3.html", какую по счёту  брать ссылку будет зависит от indexTheme
    const pathInFailes = getHrefFromHTMLFiles(pathFull, indexTheme);

     // создаем полный путь до файла in будет в итоге подобен /media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/in1.html
    const pathRead = path + '/' + pathInFailes;

    // Извлекаем из файла основного массив тем, из которых будем формировать страницы
    const extractContexts = extractContextsFromChatPrompts(FULL_PATH);

    // Сокращаем до нужной длины массив с темами
    const shortenStringsContexts = shortenStrings(extractContexts, 100);

    // Читаем файл In
    const contentIn = readFileContent(pathRead);

    //В конце файл будет исходный файл ChatGPT _ ChatGPT 4o Free _ Support all countries.html
    const filePath = FULL_PATH;

    // По файлу in определяем это новая тема или в ней уже есть записи. true если ссылки есть
    bool = hasLiElementsInsideList(contentIn);

    // В итоге будет хранить массив из двух числес например [5 , 4]первая цифра говорит что имя файла будет начинаться  pg5 
    // а префикс pg5-4 будет 4.
    let pgNumber;

    if (!bool) {
        // Обработка случая, когда hasLiElementsInsideList вернула false
        // Когда элементов li нет
        //a) если новая тема то в папке pages нужно определить какое имя файла pg[цифра будем формировать]
        //Если темы в in файле нет, то надо из папки pages опредлить найти pg[max] и оттуда начать формировать страницы
          pgNumber = findMaxPgNumber(pathPage, 'pg');

          //и возвращает массив первая цифра имя файла pg[цифра] вторая задаем по умолчанию 1 
          // так как с нее начнем создавать файлы +1 потомучто конечный файл например pg4 создавать начинаем новую серию pg5
          pgNumber = [pgNumber+1,1];
          console.log('элементов li нет');
          
          
    
      } else {
          // Обработка случая, когда hasLiElementsInsideList вернула true
          // Когда есть li элементы
          //b) если тема есть то нужно определит какой файл pg[цифра] брать, и какая цифра последняя pg[цифра]- цифра
          //Если тема есть то из файла in[цифра] прочитать сылку на файл и определить pg[цифру] и максемальный pg[цифру]- max.html
    
          console.log('элементы li есть');
          const arrayHref = extractAndTransformHrefs(contentIn);

          pgNumber = findMaxSecondDigitInFilenames(arrayHref);
    
          fileNameIterator =  createFileNameIterator(pgNumber);
          
      }
      // хранит ссылку на функцию, при повторном вызове 
      const element = createArrayIterator(shortenStringsContexts);

    // Возвращаем объект с переменными
    return {
        fileNameIterator: fileNameIterator,
        filePath: filePath,
        element: element,
        pathFull: pathFull,
        pathPage: pathPage,
        pathInFailes: pathInFailes,
        pathRead: pathRead,
        extractContexts: extractContexts,
        contentIn: contentIn,
        bool: bool,
        pgNumber: pgNumber,
        shortenStringsContexts: shortenStringsContexts
    };


}


/**
 * Создает функцию-итератор, которая при каждом вызове увеличивает последний элемент
 * переданного при создании массива на единицу.
 *
 * @param {Array<number>} initialArray Массив из двух чисел, переданный при создании итератора.
 * @returns {Function} Функция-итератор, которая при каждом вызове возвращает новый массив,
 *                     где последний элемент увеличен на единицу.
 */
function createFileNameIterator(initialArray) {
  let [first, last] = initialArray; // Деструктуризация при создании

  return function() {
    last++; // Увеличиваем последний элемент
    return [first, last]; // Возвращаем новый массив
  };
}

/**
 * Создает функцию-итератор для последовательного перебора элементов массива.
 *
 * @param {Array} arr Массив, элементы которого будут последовательно возвращаться при каждом вызове итератора.
 * @returns {Function} Функция-итератор, которая при каждом вызове возвращает следующий элемент массива.
 *                     Если массив закончился, возвращает `false`.
 *
 * @example
 * const myArray = [1, 2, 3];
 * const getNext = createArrayIterator(myArray);
 *
 * console.log(getNext()); // Выведет: 1
 * console.log(getNext()); // Выведет: 2
 * console.log(getNext()); // Выведет: 3
 * console.log(getNext()); // Выведет: false
 */
function createArrayIterator(arr) {
    let currentIndex = 0;
  
    return function() {
      if (currentIndex < arr.length) {
        return arr[currentIndex++];
      } else {
        return false;
      }
    };
  }

/**
 * Асинхронно создает  HTML файлы на основе извлеченных контекстов из исходного файла.
 *
 * @async
 * @function createPage
 * @param {string} outputDir - Директория, в которую будут сохранены отфильтрованные HTML файлы.
 * @param {number} initialFileNumber - Начальный номер файла для генерации имен новых файлов.
 * @param {array} arrayResult - 
 * @throws {Error} Если происходит ошибка при извлечении контекстов или сохранении отфильтрованных HTML файлов, ошибка пробрасывается дальше для обработки.
 * @returns {Promise<Array<any>>} - Promise, который разрешается с массивом извлеченных контекстов (`arrayResult`) после успешного создания и сохранения всех файлов.
 */
 async function createPage(obj) {

    const element = obj.element();
  
    const filePath = obj.filePath;

    //При вызове obj.fileNameIterator();  увеличивает последний элемент переданного при создании массива на единицу
    const arrayIntegrator = obj.fileNameIterator();

    // создаем имя например pg1-1.html
    const newFileName = `pg${arrayIntegrator[0]}-${arrayIntegrator[1]}.html`;
    const pathFileNew = obj.pathPage + '/' + newFileName;

  

    console.log("element---",element);
    console.log("pathFileNew---",pathFileNew);
    console.log("filePath---",filePath);

    await saveFilterHTML(filePath, pathFileNew, element); // Используем импортированную функцию
      
    

  }

 async function createPageAndListItems(obj) {

    const html = obj.html;
    const linkTexts = obj.linkTexts;
    const startNumber = obj.startNumber;
    const htmlContent = obj.htmlContent;

      await createPage(obj);
     addListItems(html, linkTexts, startNumber);
    //  saveHtmlToFile(filePath, htmlContent);

  } 

function apiCreatePage(path, indexTheme){



}

//Для тестов
module.exports.initPath = initPath;
module.exports.createPage = createPage;  
module.exports.createArrayIterator = createArrayIterator;  
module.exports.createFileNameIterator = createFileNameIterator;

//Для экспорта
module.exports.apiCreatePage = apiCreatePage;