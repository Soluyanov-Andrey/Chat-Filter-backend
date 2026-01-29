// multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Конфигурация Multer ---
const rootDocumentDir = path.join(__dirname, '../../rootDocument'); 

// Создаем папку rootDocument, если она не существует
if (!fs.existsSync(rootDocumentDir)){
    console.log('Папка rootDocument есть');
    
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootDocumentDir);
    },
    filename: function (req, file, cb) {
        const desiredFileName = 'ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
        cb(null, desiredFileName); 
    }
});

// Экспортируем middleware multer, настроенный для одного файла 'myFile'
const uploadHtmlFile = multer({ 
    storage: storage,
    // fileFilter: function (req, file, cb) { ... } // Опционально: фильтр типов файлов
}).single('myFile');

module.exports = {
    uploadHtmlFileMiddleware: uploadHtmlFile, // Экспортируем middleware
    uploadDir: rootDocumentDir // Можно экспортировать и путь, если нужно
};