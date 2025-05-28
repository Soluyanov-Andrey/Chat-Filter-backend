
const { apiCreatePage , initPath , createPage , createArrayIterator , createFileNameIterator } = require('./apiCreatePage');


//Путь где находится файл  root.html приедт с фронта
const path ='/media/andrey/project/project/servers/SERVER-node-chatGPT/document';

const fileName = 'root.html';

//Тема на которой нажали в файле root.html
let indexTheme =2;

describe('apiCreatePage', () => {
  it('apiCreatePage', () => {

    // let b = apiCreatePage(path, fileName, indexTheme);
    // console.log(b);
 
  });
});

describe('createFileNameIterator}', () => {
  it('createFileNameIterator}', () => {

   let b = createFileNameIterator([5,1]);
   console.log(b());
   

  });
});


indexTheme =1;
describe('initPath', () => {
  it('initPath', () => {

    let b = initPath(path,indexTheme);
    console.log(b);
    console.log("file name interator", b.fileNameIterator());
  });
});

describe('createArrayIterator', () => {
  it('createArrayIterator', () => {

// Пример использования:
const extractContexts = [
  'как в текстовом фармате обозначется перенос на следующую строку,',
  'На node js например у меня есть переменнаяя text = "привет мир", ее надо записать в файл и между словами привет и мир поставить знак разделитель',
  '. Используя fs.writeFile (простой, но не подходит для больших файлов): Почему неподходит и какой критерий большого файла конкретно в размерах'

];

    let getNextContext = createArrayIterator(extractContexts);

    console.log(getNextContext()); // Выведет: 1 элемент массива
    console.log(getNextContext()); 
    console.log(getNextContext()); 
    console.log(getNextContext());  // Выведет: false так как это конечный элемент
  });
});



describe('createPage', () => {
  it('createPage', () => {

    let obj = initPath(path,indexTheme);
    // console.log(obj);
     createPage(obj);
     createPage(obj);
     createPage(obj);
  });
});
