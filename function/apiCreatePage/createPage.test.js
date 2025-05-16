const fs = require('fs');
const { createPageWrapper ,createPage } = require('./createPage');


const filePath= '/media/andrey/project/project/servers/SERVER-node-chatGPT/rootDocument/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
const outputDir = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/'; // Базовый путь к папке, где будут сохраняться файлы
const scanDerectory = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/document/themes/pages';
const nameFile = 'in1-';

describe('createPage1', () => {
 const initialFileNumber = 1;
 const nameFile ="in";
  const arrayResult = [
    'как в текстовом фармате обозначется перенос на следующую строку,',
    'На node js например у меня есть переменнаяя text = "привет мир", ее надо записат',
    '. Используя fs.writeFile (простой, но не подходит для больших файлов): Почему не',
    'могу ли я в сепаратор записать \\n',
    'Ты пишишь что во всех операционых системах знак переноса разный, но как тогда он',
    'Есть длинная строка которая может быть с любым количеством символов. Нужно напис',
    'мне кажится алгоритм немного запутаный давай попробуеме по другому у нас есто не',
    'добавь если нужна закругка модулей, и сделай документацию к функции в виде комен',
    'та не понял про модули, все перепиши срипт оставь как был, модули загрузки в нод'
  ];

  it('createPage', () => {
    createPage(outputDir,filePath, initialFileNumber,nameFile, arrayResult)
   

  });
});
