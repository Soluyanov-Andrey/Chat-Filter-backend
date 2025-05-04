const { apiCreateFolder } = require('./function/apiCreateFolder/apiCreateFolder'); 
const { apiScan } = require('./function/apiScan/apiScan');
const { apiFolderStructure } = require('./function/apiFolderStructure/apiFolderStructure');

const express = require('express');
const app = express();
const port = 3000;

const { getHrefFromHTMLFiles } = require('./function/apiOpenDocument/getHrefByIndex'); 
const { deleteSelect, laveSelected, lookPageBtn } = require('./function/apiDeleteList/arraySelect');
const { readFileTextFromHTML } = require('./function/apiOpenDocument/extractLinkHTML'); 

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
  console.log('Полученный и декодированный path:', path);

  
 const responseData = {
  status: 'open-document',
  message: 'читаем root фаил',
  data: readFileTextFromHTML(path + '/' + DOCUMENT_PAGE_HREF)
 };
 res.json(responseData);


 
});

//--------------------------------------
//open-themes
//--------------------------------------
app.get('/open-themes', async (req, res) => {

 const encodedPath = req.query.path;
 const encodedIndex = req.query.index;

   const path = decodeURIComponent(encodedPath);
   const pathHref = path  + '/' + DOCUMENT_PAGE_HREF;

   console.log('Полученный и декодированный path:', path);

 
  let hrefPath =  getHrefFromHTMLFiles(pathHref, encodedIndex);
  
  

  const responseData = {
   status: '/open-themes',
   message: 'читаем in файл',
   data: readFileTextFromHTML(path + '/' + hrefPath)
  };
  res.json(responseData);

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
  try {
    const selectedIds = req.body; // Получаем массив ID напрямую из req.body

    console.log('Полученные ID:', selectedIds); // Выводим массив ID для отладки

    // Вызываем асинхронную функцию delete_select и ждем её завершения
    const success = await deleteSelect(selectedIds); // Передаем selectedIds

    if (success) {
      const responseData = {
        message: 'Элементы успешно удалены'
      };
      return res.json(responseData); // Добавлено return
    } else {
      return res.status(500).json({ // Добавлено return
        message: 'Произошла ошибка при обработке запроса (delete_select)',
        error: 'Ошибка внутри delete_select'
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ // Добавлено return
      message: 'Произошла ошибка при обработке запроса',
      error: error.message
    });
  }
});

app.post('/lave-selected', async (req, res) => {
  try {
    const selectedIds = req.body; // Получаем массив ID напрямую из req.body

    console.log('Полученные ID:', selectedIds); // Выводим массив ID для отладки

    // Вызываем асинхронную функцию delete_select и ждем её завершения
    const success = await laveSelected(selectedIds); // Передаем selectedIds

    if (success) {
      const responseData = {
        message: 'Элементы успешно удалены'
      };
      return res.json(responseData); // Добавлено return
    } else {
      return res.status(500).json({ // Добавлено return
        message: 'Произошла ошибка при обработке запроса (lave_selected)',
        error: 'Ошибка внутри lave_selected'
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ // Добавлено return
      message: 'Произошла ошибка при обработке запроса',
      error: error.message
    });
  }
});

app.post('/look-page', async (req, res) => {
  try {
    const selectedIds = req.body; // Получаем массив ID напрямую из req.body

    console.log('Полученные ID:', selectedIds); // Выводим массив ID для отладки

    // Вызываем асинхронную функцию delete_select и ждем её завершения
    const success = await lookPageBtn(selectedIds); // Передаем selectedIds

    if (success) {
      const responseData = {
        message: 'Страница из выбранных элементов создана'
      };
      return res.json(responseData); // Добавлено return
    } else {
      return res.status(500).json({ // Добавлено return
        message: 'Произошла ошибка при обработке запроса (look_selected)',
        error: 'Ошибка внутри look_selected'
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ // Добавлено return
      message: 'Произошла ошибка при обработке запроса',
      error: error.message
    });
  }
});


app.post('/create-page', async (req, res) => {
 
    try {
      const { path, indexTheme } = req.body; // Получаем path и indexTheme из req.body
  
      console.log('Полученный path:', path); // Выводим path для отладки
      console.log('Полученный indexTheme:', indexTheme); // Выводим indexTheme для отладки
  
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





// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});