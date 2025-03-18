// // Импортируем функцию copyDirectory
// const  copyDirectory  = require('./function/createFolder');
// const path = require('path');
// // Указываем пути к исходной и целевой папкам
// const sourcePath = './document'; // Путь к папке, которую нужно скопировать
// const destinationPath = './test'; // Путь, куда нужно скопировать

// // Вызываем функцию
// copyDirectory( sourcePath, destinationPath);


// const  { readFileContent } = require('./function/fileUtils');
// const  { saveHtmlToFile } = require('./function/fileUtils');

// const  { removeSidebarNav } = require('./function/deleteNavBlock');

// let path = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
// let pathNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C1.html';
// let read = readFileContent(path);
// let contDel = removeSidebarNav(read);
// saveHtmlToFile(pathNew, contDel);

// // console.log(extractContextsFromChatPrompts(path));

// filterHTMLElementsByText(filePath, outputPath, targetTexts)

const fs = require('fs');
const { saveFilterHTML } = require('./function/deleteAllScaner');

 let pathFile = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
 let pathFileNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C2.html';

    // const targetTexts = [
    //     'как в текстовом фармате обозначется перенос на следующую строку,',
    //     'На node js например у меня есть переменнаяя text = "привет мир", ее надо записать в файл и между словами привет и мир поставить знак разделитель',
    //     '. Используя fs.writeFile (простой, но не подходит для больших файлов): Почему неподходит и какой критерий большого файла конкретно в размерах',
    //     'могу ли я в сепаратор записать \\n',
    //     'Ты пишишь что во всех операционых системах знак переноса разный, но как тогда они открываются в разных системах. Например я создал файл под линуксом текстовый с переносом но он открывается замечательно и в виндоус редакторе',
    //     'Есть длинная строка которая может быть с любым количеством символов. Нужно написать функцию на node чтоб она перебирала эту строку и через 70 символов в стреченый пробел заменяла знаком переноса от линукс системы.Возвращаемая строка должна быть с переносами',
    //     'мне кажится алгоритм немного запутаный давай попробуеме по другому у нас есто некие переменые start и end когда мы начинаем перебирать строку мы имеем start=0 считаем 70 символов и после этого идем далее и ищем пробел. Если пробе найден фиксируем это как конечную точку и копируем строку от позиции start до этой точки в масив. В следующем просчоте start станет точкой которуюя мы нашли а новая опять высчитается . Таким образом мы собирем в масив из строк которые будут больше 70 . Потом останется только собрать все элементы масива поставив знак переноса. Мне кажится этот код легче отлаживать в случии каких то не учтных ошибок. Мы будем иметь масив выписаных кусков который можим посмотреть',
    //     'добавь если нужна закругка модулей, и сделай документацию к функции в виде коментария',
    //     'та не понял про модули, все перепиши срипт оставь как был, модули загрузки в ноде если нужны рекваер'
    // ];
    const targetTexts = [
        'как в текстовом ',
        'На node js например у меня '
    ];

    saveFilterHTML(pathFile, pathFileNew,targetTexts)
