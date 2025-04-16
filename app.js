const { scanFoldersForDocs } = require('./function/apiFolderStructure/folderStructure'); 
const copyDirectory = require('./function/apiCreateFolder/createFolder'); 
const { extractContextsFromChatPrompts } = require('./function/apiScan/scan');
const express = require('express');

const { saveNewFile } = require('./function/subsidiary/deleteNavBlock');
const cors = require('cors'); // Импортируем cors
const { IP , FULL_PATH , PATH_FILE_NAME_NEW } = require('./config'); // Импортируем переменные
const { doesFileSyncExist } = require('./function/subsidiary/fileUtils');
const { deleteSelect, laveSelected, lookPageBtn } = require('./function/apiDeleteList/arraySelect');
const app = express();
const port = 3000;

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

  // 1. Получаем параметр path из req.query
  const encodedPath = req.query.path;
  //    console.log(req.query);
     // 2. URL-декодируем значение параметра
     const path = decodeURIComponent(encodedPath);
   
     console.log('Полученный и декодированный path:', path);
  
    const responseData = {
      status: "folder-structure: completed",
      message: 'Папка отсканирована',
      data: await scanFoldersForDocs(path)
    };
    res.json(responseData);
});

//--------------------------------------
///open-document
//--------------------------------------

app.get('/open-document',async  (req, res) => {

  // 1. Получаем параметр path из req.query
  const encodedPath = req.query.path;
//    console.log(req.query);
  // 2. URL-декодируем значение параметра
  const path = decodeURIComponent(encodedPath);

//    console.log('Полученный и декодированный path:', path);

 const responseData = {
   message: '/create-folder',
   receivedData: 'папака создана'
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
    // 1. Проверяем, существует ли файл
    const fileExists = await doesFileSyncExist(PATH_FILE_NAME_NEW);

    // 2. Выполняем saveNewFile, если файл не существует (или пропускаем)
    if (!fileExists) {
      await saveNewFile(FULL_PATH, PATH_FILE_NAME_NEW);
      console.log(`saveNewFile успешно завершена для path: ${path}`);
    }  else {
      console.log(`Файл по пути ${FULL_PATH} уже существует, saveNewFile пропущен.`);
    }

    // 3. Независимо от того, был ли файл обработан, извлекаем контексты
    const extractContexts = extractContextsFromChatPrompts(PATH_FILE_NAME_NEW);

    const responseData = {
      status: 'Scan completed',
      message: extractContexts,
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

      copyDirectory(source, filePath );

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






// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});