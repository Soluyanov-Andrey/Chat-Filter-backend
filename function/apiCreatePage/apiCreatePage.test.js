
const { apiCreatePage } = require('./apiCreatePage');

//Путь где находится файл  root.html приедт с фронта
const path ='/media/andrey/project/project/servers/SERVER-node-chatGPT/document';

const fileName = 'root.html';

//Тема на которой нажали в файле root.html
const indexTheme =2;

describe('apiCreatePage', () => {
  it('apiCreatePage', () => {

    let b = apiCreatePage( path, fileName, indexTheme);
    console.log(b);
 
  });
});