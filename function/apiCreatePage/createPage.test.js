const fs = require('fs');
const { createPage } = require('./createPage');


const pathFile = '/media/andrey/project/project/servers/SERVER-node-chatGPT/rootDocument/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
const basePathFileNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/'; // Базовый путь к папке, где будут сохраняться файлы


describe('createPage', () => {
  it('createPage', () => {



    createPage(pathFile, basePathFileNew, 5);


    
    
  });
});