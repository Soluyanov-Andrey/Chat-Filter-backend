
const { apiCreatePage , initPath , createPage } = require('./apiCreatePage');


//Путь где находится файл  root.html приедт с фронта
const path ='/media/andrey/project/project/servers/SERVER-node-chatGPT/document';

const fileName = 'root.html';

//Тема на которой нажали в файле root.html
let indexTheme =2;

describe('apiCreatePage', () => {
  it('apiCreatePage', () => {

    let b = apiCreatePage(path, fileName, indexTheme);
    console.log(b);
 
  });
});

indexTheme =1;
describe('initPath', () => {
  it('initPath', () => {

    let b = initPath(path,indexTheme);
    console.log(b);
 
  });
});

describe('createPage', () => {
  it('createPage', () => {

    let b = createPage(path,indexTheme);
    console.log(b);
 
  });
});
