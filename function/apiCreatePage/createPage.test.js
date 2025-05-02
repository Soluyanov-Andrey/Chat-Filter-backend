const fs = require('fs');
const { createPageWrapper } = require('./createPage');


const filePath= '/media/andrey/project/project/servers/SERVER-node-chatGPT/rootDocument/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
const outputDir = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/'; // Базовый путь к папке, где будут сохраняться файлы
const scanDerectory = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/document/themes/pages';
const nameFile = 'in1-';

describe('createPage', () => {
  it('createPage', () => {

    createPageWrapper(filePath, scanDerectory, outputDir, nameFile);


  });
});