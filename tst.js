// // Импортируем функцию copyDirectory
// const  copyDirectory  = require('./function/createFolder');
// const path = require('path');
// // Указываем пути к исходной и целевой папкам
// const sourcePath = './document'; // Путь к папке, которую нужно скопировать
// const destinationPath = './test'; // Путь, куда нужно скопировать

// // Вызываем функцию
// copyDirectory( sourcePath, destinationPath);


const  { readFileContent } = require('./function/fileUtils');
const  { saveHtmlToFile } = require('./function/fileUtils');

const  { removeSidebarNav } = require('./function/deleteNavBlock');

let path = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
let pathNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C1.html';
let read = readFileContent(path);
let contDel = removeSidebarNav(read);
saveHtmlToFile(pathNew, contDel);

// console.log(extractContextsFromChatPrompts(path));

