const { apiCreateFolder } = require('./function/apiCreateFolder/apiCreateFolder'); 
const { apiScan } = require('./function/apiScan/apiScan');
const { apiFolderStructure } = require('./function/apiFolderStructure/apiFolderStructure');
const { apiOpenDocument } = require('./function/apiOpenDocument/apiOpenDocument');
const { apiOpenThemes } = require('./function/apiOpenThemes/apiOpenThemes');
const { apiDeleteSelect } = require('./function/apiDeleteSelect/apiDeleteSelect');
const { apiLaveSelect } = require('./function/apiLaveSelected/apiLaveSelected');
const { apiLookPage } = require('./function/apiLookPage/apiLookPage');
const { apiCreatePage } = require('./function/apiCreatePage/apiCreatePage');
const { apiCreateTopic } = require('./function/apiCreateTopic/apiCreateTopic');

const { uploadHtmlFileMiddleware } = require('./function/apiUploadHtmlFile/multerConfig'); // Предполагаем, что multerConfig.js находится в корне проекта

const express = require('express');
const app = express();
const port = 3000;

const { 
   IP , 
   FULL_PATH ,
   PATH_FILE_NAME_NEW, 
   DOCUMENT_ROOT,
   DOCUMENT_PAGE_HREF
  } = require('./config'); // Импортируем переменные


const cors = require('cors'); // Импортируем cors

// Настройка CORS с помощью пакета cors
const corsOptions = {
  origin: [IP], //  Разрешенные домены
  methods: 'GET,POST,OPTIONS', // Разрешенные методы
  allowedHeaders: ['Content-Type', 'Authorization'] // Разрешенные заголовки
};



app.use(cors(corsOptions)); // Применяем middleware cors  <---- ЭТО ОЧЕНЬ ВАЖНО!
// Middleware для разбора JSON-тел запросов
app.use(express.json());
app.use(express.static('rootDocument'));  // Важно: нужно создать папку "public";




//--------------------------------------
///folder-structure
//--------------------------------------

app.get('/folder-structure',async  (req, res) => {
  
  
  const encodedPath = req.query.path;
  const path = decodeURIComponent(encodedPath);
  console.log('Полученный и декодированный path:', path);

  try {
   
    const extractFolder = await apiFolderStructure(path);

    const responseData = {
      status: 'folder-structure: completed',
      message: "Папка отсканирована",
      data: extractFolder,
    };
    res.json(responseData);

  } catch (error) {
    console.error('Ошибка при обработке /folder-structure:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса',
      error: error.message,
    });
  }


});

//--------------------------------------
// open-document
//--------------------------------------

app.get('/open-document',async  (req, res) => {

  
  // 1. Получаем параметр path из req.query
  const encodedPath = req.query.path;
//    console.log(req.query);
  // 2. URL-декодируем значение параметра
  const path = decodeURIComponent(encodedPath);

  console.log('сработало- /open-document');
  console.log('Полученный и декодированный path:', path);

  try {
    
    const extractFolder = await apiOpenDocument(path, DOCUMENT_PAGE_HREF);
    console.log(extractFolder);

    const responseData = {
      status: 'folder-structure: completed',
      message: "Папка отсканирована",
      data: extractFolder,
    };
    res.json(responseData);

  } catch (error) {
    console.error('Ошибка при обработке /open-document:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса',
      error: error.message,
    });
  }
 
});

//--------------------------------------
//open-themes
//--------------------------------------
app.get('/open-themes', async (req, res) => {

 const encodedPath = req.query.path;
 const encodedIndex = req.query.index;

   const path = decodeURIComponent(encodedPath);
   const pathHref = path  + '/' + DOCUMENT_PAGE_HREF;


  try {
    
    let hrefPath =  await apiOpenThemes(path, pathHref, encodedIndex);
    
    const responseData = {
      status: 'open-themes: completed',
      message: "Темы прочитаны",
      data: hrefPath ,
    };
    console.log(hrefPath);
    
    res.json(responseData);

  } catch (error) {
    console.error('Ошибка при обработке /open-themes:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса',
      error: error.message,
    });
  }


});


//--------------------------------------
//scan
//--------------------------------------
app.get('/scan',async  (req, res) => {

  const encodedPath = req.query.path;
  const path = decodeURIComponent(encodedPath);

  try {
   
    const extractContexts = await apiScan(PATH_FILE_NAME_NEW, FULL_PATH, path);

    const responseData = {
      status: 'scan: completed',
      message: "Данные обработаны успешно",
      data: extractContexts,
    };
    res.json(responseData);

  } catch (error) {
    console.error('Ошибка при обработке /scan:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса',
      error: error.message,
    });
  }
});

//--------------------------------------
//delete-list
//--------------------------------------
app.get('/delete-list', async (req, res) => {
  try {
    const id = parseInt(req.query.id, 10);
    const encodedPath = req.query.path;
    const path = decodeURIComponent(encodedPath);
    
    // Implement actual deletion logic here
    
    const responseData = {
      message: 'Item deleted successfully',
      id: id
    };
    res.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'An error occurred while processing the request',
      error: error.message
    });
  }
});



//--------------------------------------
//create-folder
//--------------------------------------

// Асинхронный обработчик POST-запроса
app.post('/create-folder', async (req, res) => {
  try {
    const filePath = req.body.path; // Получаем значение свойства "path" из req.body

    console.log('Полученный путь:', filePath); // Выводим только путь
    // console.log(' /folder-structure called');
    // // Вызываем асинхронную функцию и ждем её завершения
    // source = './test';
    // destination = '';
    source = './document';

    apiCreateFolder(source, filePath );
      
      const responseData = {
      message: 'Папка создана'
    };

    // Отправляем JSON-ответ
    res.json(responseData);
  } catch (error) {
    // Обработка ошибок
    console.error('Error:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса',
      error: error.message
    });
  }
});


app.post('/delete-select', async (req, res) => {

  const selectedIds = req.body; // Получаем массив ID напрямую из req.body

  console.log('сработал delete-select:'); 
  console.log('Полученные ID:', selectedIds);

  try {
   
    const success = await apiDeleteSelect(selectedIds); // Передаем selectedIds

    const responseData = {
      status: 'delete-select: completed',
      message: "Элементы успешно удалены",
      data: success,
    };
    res.json(responseData);

  } catch (error) {
    console.error('Ошибка при обработке /delete-select:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса',
      error: error.message,
    });
  }

});

app.post('/lave-selected', async (req, res) => {

 const selectedIds = req.body; // Получаем массив ID напрямую из req.body
 console.log('сработал /lave-selected'); 
 console.log('Полученные ID:', selectedIds); // Выводим массив ID для отладки

  try {
   
    const success = await apiLaveSelect(selectedIds); // Передаем selectedIds

    const responseData = {
      status: 'lave-selected: completed',
      message: "Элементы успешно удалены",
      data: [],
    };
    res.json(responseData);

  } catch (error) {
    console.error('Ошибка при обработке /lave-selected:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса (lave_selected)',
      error: error.message,
    });
  }

});

app.post('/look-page', async (req, res) => {

  const selectedIds = req.body; // Получаем массив ID напрямую из req.body
  console.log('Полученные ID:', selectedIds); // Выводим массив ID для отладки

  try {
   
   const success = await apiLookPage(selectedIds); // Передаем selectedIds
   if (success) {
    const responseData = {
      status: '/apiLookPage: completed',
      message: "Страница из выбранных элементов создана",
      data: [],
    };
    res.json(responseData);
  }
    

  } catch (error) {
    console.error('Ошибка при обработке /look-page:', error);
    res.status(500).json({
      message: 'Произошла ошибка при обработке запроса (look-page',
      error: error.message,
    });
  }

});


app.post('/create-page', async (req, res) => {
 
    try {
      const { path, indexTheme } = req.body; // Получаем path и indexTheme из req.body
  
      console.log('Полученный path:', path); // Выводим path для отладки
      console.log('Полученный indexTheme:', indexTheme); // Выводим indexTheme для отладки

      apiCreatePage(path,indexTheme);

      const responseData = {
        message: 'create-page'
      };
      return res.json(responseData); // Отправляем ответ с сообщением 'create-page'
  
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        message: 'Произошла ошибка при обработке запроса',
        error: error.message
      });
    }
});

app.post('/create-topic', async (req, res) => {
 
    try {
      const { path, topicValue } = req.body; // Получаем path и indexTheme из req.body
  
      console.log('Полученный path:', path); // Выводим path для отладки
      console.log('Полученный topicValue:', topicValue); // Выводим topicValue для отладки

       apiCreateTopic(path,topicValue);

      const responseData = {
        message: 'createTopic'
      };
      return res.json(responseData); // Отправляем ответ с сообщением 'create-page'
  
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({
        message: 'Произошла ошибка при обработке запроса',
        error: error.message
      });
    }
});


app.post('/upload', uploadHtmlFileMiddleware, (req, res) => {
    // req.file будет доступен, если multer успешно обработал файл
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не был отправлен или возникла ошибка при его обработке.' });
    }

    console.log('Файл успешно обработан Multer (upload-html-file):', req.file);

    res.status(200).json({
        message: 'Файл успешно сохранен на сервере!',
        fileName: req.file.filename,
        filePath: `/rootDocument/${req.file.filename}`, 
        originalName: req.file.originalname,
        size: req.file.size
    });
});



// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});