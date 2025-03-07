// // Импортируем функцию copyDirectory
// const  copyDirectory  = require('./function/createFolder');
// const path = require('path');
// // Указываем пути к исходной и целевой папкам
// const sourcePath = './document'; // Путь к папке, которую нужно скопировать
// const destinationPath = './test'; // Путь, куда нужно скопировать

// // Вызываем функцию
// copyDirectory( sourcePath, destinationPath);


const  {insertNewLinkAfterLast} = require('./function/createTopic');

// Примеры использования
const htmlCode1 = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
    <a href="./themes/in1.html" target="leftframe">Установка аапач</a>
    <br>
    <a href="./themes/in2.html" target="leftframe">Установка php</a>
    <br>
    <a href="./themes/in3.html" target="leftframe">Страница 2</a>
</body>
</html>
`;

const newHtml1 = insertNewLinkAfterLast(htmlCode1, 4);
console.log(newHtml1);

const htmlCode2 = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
</body>
</html>
`;

const newHtml2 = insertNewLinkAfterLast(htmlCode2, 1);
console.log(newHtml2);