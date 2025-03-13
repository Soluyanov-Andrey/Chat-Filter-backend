// // Импортируем функцию copyDirectory
// const  copyDirectory  = require('./function/createFolder');
// const path = require('path');
// // Указываем пути к исходной и целевой папкам
// const sourcePath = './document'; // Путь к папке, которую нужно скопировать
// const destinationPath = './test'; // Путь, куда нужно скопировать

// // Вызываем функцию
// copyDirectory( sourcePath, destinationPath);


const  { extractHrefAndTopicFromFile } = require('./function/openFolder');

let path = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/document/root.html';

console.log(extractHrefAndTopicFromFile(path));

