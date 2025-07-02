
const { getHrefFromHTMLFiles } = require('./../apiOpenDocument/getHrefByIndex'); 
const { readFileContent } = require('./../subsidiaryFunction/fileUtils'); 
const { hasLiElementsInsideList } = require('./../apiCreatePage/additionalFunctions'); 
const { extractContextsFromChatPrompts } = require('./../apiScan/scan'); 
const { findMaxPgNumber ,
        extractAndTransformHrefs , 
        findMaxSecondDigitInFilenames ,
        filterFilesByPage,
        extractNumberFromPath ,
        getFileNamesInDirectory ,
        addListItemsIn } = require('./additionalFunctions'); 


const { shortenStrings } = require('./../subsidiaryFunction/shortenStrings'); 
const { saveFilterHTML } = require('../subsidiaryFunction/deleteAllScaner');
const { saveHtmlToFile } = require('../subsidiaryFunction/fileUtils'); 

const { PATH_FILE_NAME_NEW , DOCUMENT_PAGE_HREF } = require('./../../config'); // Импортируем переменные


function initPath(path, indexTheme){

    // Берем изначальный путь до папки document
    // media/andrey/project/project/servers/SERVER-node-chatGPT/document + root.html
    // путь будет подобным
    // media/andrey/project/project/servers/SERVER-node-chatGPT/document/root.html
    const pathFull = path + '/' + DOCUMENT_PAGE_HREF;

    // путь будет подобным
    // media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages
    // формируем путь до папки themes/pages внутри document
    const pathPage = path + '/' + 'themes/pages';

    //-------------------------------------------------------------------------------------------------------------------
    // 1 Берем ссылку из файла root это ссылка будет указывать файл in в который будем производить запись
    // вернет из файла root содержание сылки a href="in3.html", какую по счёту  брать ссылку будет зависит от indexTheme
    // вернет подобное  themes/in1.html
    const pathInFailes = getHrefFromHTMLFiles(pathFull, indexTheme);

     // создаем полный путь до файла in будет в итоге подобен 
     // /media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/in1.html
    const pathRead = path + '/' + pathInFailes;

    // Извлекаем из файла основного массив тем, из которых будем формировать страницы
    const extractContexts = extractContextsFromChatPrompts(PATH_FILE_NAME_NEW);

    // Сокращаем до нужной длины массив с темами
    const shortenStringsContexts = shortenStrings(extractContexts, 100);

    // Читаем файл In
    const contentIn = readFileContent(pathRead);

    //В конце файл будет исходный файл ChatGPT_NEW.html
    const filePath = PATH_FILE_NAME_NEW;

    // Вернет массив из имен файлов в папке pages
    const arrayFileNames = getFileNamesInDirectory(pathPage);

    // Извлекает число из пути к файлу, следующего за сегментом "themes/in
    const numberIn = extractNumberFromPath(pathInFailes);

    // выберем все нужные pg в массив
    const pageSelect = filterFilesByPage(arrayFileNames ,numberIn);

    let arrayMax;
    if(!pageSelect){
       arrayMax = [numberIn, 1];
    } else {
      // вернет массив содержащий два значения например [1,5] что соотведственно pg[1]-5.html
       arrayMax = findMaxSecondDigitInFilenames(pageSelect);
    }
   

    // Возвращаем объект с переменными
    return {
        filePath: filePath,
        pathFull: pathFull,
        pathPage: pathPage,
        pathInFailes: pathInFailes,
        pathRead: pathRead,
        extractContexts: extractContexts,
        contentIn: contentIn,
        shortenStringsContexts: shortenStringsContexts,
        arrayFileNames: arrayFileNames,
        numberIn: numberIn,
        pageSelect: pageSelect,
        arrayMax: arrayMax,
        topic: createArrayIterator(extractContexts),
        fileNameIterator: createFileNameIterator(arrayMax)
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
 * 
 *  Используем для перебора тем которые хранятся в shortenStringsContexts пример масива тем написан ниже
 * 'как в текстовом фармате обозначется перенос на следующую строку,',
 * 'На node js например у меня есть переменнаяя text = "привет мир", ее надо записать в файл и между словами привет и мир поставить знак разделитель',
 * '. Используя fs.writeFile (простой, но не подходит для больших файлов): Почему неподходит и какой критерий большого файла конкретно в размерах'
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
 async function createPage(obj, arrayIntegrator, topic) {

    const filePath = obj.filePath;

    // создаем имя например pg1-1.html
    const newFileName = `pg${arrayIntegrator[0]}-${arrayIntegrator[1]}.html`;
    const pathFileNew = obj.pathPage + '/' + newFileName;

  

    // console.log("topic---",topic);
    // console.log("pathFileNew---",pathFileNew);
    // console.log("filePath---",filePath);
    // console.log("arrayIntegrator ---",arrayIntegrator);

     await saveFilterHTML(filePath, pathFileNew, topic); // Используем импортированную функцию
      
  }

 async function createPageAndListItems(obj, arrayIntegrator, topic) {

 
    const filePath = obj.pathRead;
    const html = obj.contentIn;
    const pgIndex = arrayIntegrator[0];
    const indexHtml = arrayIntegrator[1];
    

    // console.log("topic---", topic);
    // console.log("html---", html);
    // console.log("pgIndex---", pgIndex);
    // console.log("indexHtml ---", indexHtml);

    // console.log("arrayIntegrator ---", arrayIntegrator);
    // console.log("filePath ---", filePath);

      
      
        try {
          await createPage(obj,arrayIntegrator, topic );
        } catch (error) {
          
          console.error("Ошибка при обработки createPage:", error);
         
        }

       try {
          const htmlContent = addListItemsIn(html, topic, pgIndex, indexHtml);
          await saveHtmlToFile(filePath, htmlContent); // Предполагаем, что saveHtmlToFile - асинхронная функция (как правило)
          obj.contentIn = htmlContent;
        } catch (error) {
          // Обработка ошибок, если saveHtmlToFile не удалось
          console.error("Ошибка при сохранении HTML в файл:", error);
          //  Можно также:
          //  1.  Записать ошибку в лог файл
          //  2.  Вывести сообщение об ошибке пользователю (если это UI-код)
          //  3.  Выполнить другие действия по обработке ошибки
        }

  } 

async function apiCreatePage(path, indexTheme){


    const obj = initPath(path, indexTheme);
    const filePath = obj.pathRead;
    const extractContexts = obj.extractContexts;

  for (const context of extractContexts) {
   //При вызове obj.fileNameIterator();  увеличивает последний элемент переданного при создании массива на единицу
     let arrayIntegrator = obj.fileNameIterator();
     let topic = obj.topic();

    // console.log("arrayIntegrator---", arrayIntegrator);
    // console.log("topic---", topic);
    // console.log("---------------------------------------", topic);
     await createPageAndListItems(obj, arrayIntegrator, topic);
  }

}

//Для тестов

module.exports.createPageAndListItems = createPageAndListItems;
module.exports.initPath = initPath;
module.exports.createPage = createPage;  
module.exports.createArrayIterator = createArrayIterator;  
module.exports.createFileNameIterator = createFileNameIterator;

//Для экспорта
module.exports.apiCreatePage = apiCreatePage;