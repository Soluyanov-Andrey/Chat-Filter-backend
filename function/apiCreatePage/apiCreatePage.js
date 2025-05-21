
const { getHrefFromHTMLFiles } = require('./../apiOpenDocument/getHrefByIndex'); 
const { readFileContent } = require('./../subsidiaryFunction/fileUtils'); 
const { hasLiElementsInsideList } = require('./../apiCreatePage/additionalFunctions'); 
const { extractContextsFromChatPrompts } = require('./../apiScan/scan'); 
const { findMaxPgNumber , extractAndTransformHrefs , findMaxSecondDigitInFilenames } = require('./additionalFunctions'); 
const { shortenStrings } = require('./../subsidiaryFunction/shortenStrings'); 

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
          pgNumber =[pgNumber+1,1];
          console.log('элементов li нет');
          
          
    
      } else {
          // Обработка случая, когда hasLiElementsInsideList вернула true
          // Когда есть li элементы
          //b) если тема есть то нужно определит какой файл pg[цифра] брать, и какая цифра последняя pg[цифра]- цифра
          //Если тема есть то из файла in[цифра] прочитать сылку на файл и определить pg[цифру] и максемальный pg[цифру]- max.html
    
          console.log('элементы li есть');
          const arrayHref = extractAndTransformHrefs(contentIn);
           pgNumber = findMaxSecondDigitInFilenames(arrayHref);
    
          
      }

    // Возвращаем объект с переменными
    return {
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
 function createPage(path,indexTheme) {
    
    let myObject;

    try {
        myObject = initPath(path,indexTheme);
 
    } catch (error) {
      console.error("Произошла ошибка при вызове initPath:", error);
      throw error;
    }
   
    return myObject.extractContexts;

  }


function apiCreatePage(path, indexTheme){


}
//Для тестов
module.exports.initPath = initPath;
module.exports.createPage = createPage;  

//Для экспорта
module.exports.apiCreatePage = apiCreatePage;