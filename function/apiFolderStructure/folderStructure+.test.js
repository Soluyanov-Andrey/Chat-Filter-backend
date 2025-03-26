// Импортируем функцию напрямую:
const { scanFoldersForDocs } = require('./folderStructure');  // Нет деструктуризации!

// Теперь можно вызывать функцию:
per = scanFoldersForDocs()
console.log(per);
