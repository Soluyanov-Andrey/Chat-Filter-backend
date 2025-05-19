
const { getHrefFromHTMLFiles } = require('./../apiOpenDocument/getHrefByIndex'); 
const { readFileContent } = require('./../subsidiaryFunction/fileUtils'); 
const { hasLiElementsInsideList } = require('./../apiCreatePage/additionalFunctions'); 
const { findMaxPgNumber , extractAndTransformHrefs , findMaxSecondDigitInFilenames } = require('./../apiCreatePage/additionalFunctions'); 
const { FULL_PATH } = require('./../../config'); // Импортируем переменные


//faileName будет передоватся в главном файле app из файла config, faileName = 'root.html'

function apiCreatePage(path, faileName, indexTheme){

    // Берем изначальный путь до папки document
    // media/andrey/project/project/servers/SERVER-node-chatGPT/document

    const pathFull = path + '/' + faileName;

    // формируем путь до папки themes/pages внутри document
    const pathPage = path + '/' + 'themes/pages';

    let pgNumber = 0;
    let htmlNumber = 0;

    //-------------------------------------------------------------------------------------------------------------------
    // 1 Берем ссылку из файла root это ссылка будет указывать файл in в который будем производить запись
    // вернет из файла root содержание сылки a href="in3.html", какую по счёту  брать ссылку будет зависит от indexTheme
    const pathInFailes= getHrefFromHTMLFiles(pathFull, indexTheme);

    // создаем полный путь до файла in будет в итоге подобен /media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/in1.html
    const pathRead = path + '/' + pathInFailes;


    // Читаем файл in
    const content = readFileContent(pathRead);
    


    //-------------------------------------------------------------------------------------------------------------------
    // 2 По файлу in определяем это новая тема или в ней уже есть записи.
    // Проверяем наличие тегов li в файле in
    bool = hasLiElementsInsideList(content);
    
    if (!bool) {
    // Обработка случая, когда hasLiElementsInsideList вернула false
    // Когда элементов li нет
    //a) если новая тема то в папке pages нужно определить какое имя файла pg[цифра будем формировать]
    //Если темы в in файле нет, то надо из папки pages опредлить найти pg[max] и оттуда начать формировать страницы
      pgNumber = findMaxPgNumber(pathPage, 'pg');
      console.log('элементов li нет');
      
      return  pgNumber;

  } else {
      // Обработка случая, когда hasLiElementsInsideList вернула true
      // Когда есть li элементы
      //b) если тема есть то нужно определит какой файл pg[цифра] брать, и какая цифра последняя pg[цифра]- цифра
      //Если тема есть то из файла in[цифра] прочитать сылку на файл и определить pg[цифру] и максемальный pg[цифру]- max.html

      console.log('элементы li есть');
      const arrayHref = extractAndTransformHrefs(content);
      const findMax = findMaxSecondDigitInFilenames(arrayHref);

      return  findMax;
  }

    

    
       

       
      

      

     
    //   findMaxPgNumber

    // findMaxNumberAfterDash( pathPage, 'pg' );


    //3 читаем в масив содежимое сканируемого файла
    
    //4 проходим по масиву и сокращаем до определенной длины строк
    
    //5 записываем массив в сылки в файле in с сылками на нужные файлы pg[цифра]- цифра
    
    //6 Проходим по массиву выбирая каждую тему, и записываем каждую следующию тему в файл pg[цифра]- цифра
    }

module.exports.apiCreatePage = apiCreatePage;