const scanFoldersForDocs = require('./function/apiFolderStructure/folderStructure'); 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// Middleware для разбора JSON-тел запросов
app.use(bodyParser.urlencoded());

//--------------------------------------
///folder-structure
//--------------------------------------

app.get('/folder-structure',async  (req, res) => {

   // 1. Получаем параметр path из req.query
   const encodedPath = req.query.path;
//    console.log(req.query);
   // 2. URL-декодируем значение параметра
   const path = decodeURIComponent(encodedPath);
 
//    console.log('Полученный и декодированный path:', path);

  const responseData = {
    message: 'Данные /folder-structure!',
    receivedData: await scanFoldersForDocs(path)
  };
  res.json(responseData);
});


//--------------------------------------
//delete-list
//--------------------------------------
app.get('/delete-list',async  (req, res) => {

   
   
    const id = parseInt(req.query.id,10); 

    // 2. URL-декодируем значение параметра
    const path = decodeURIComponent(encodedPath);
    
   const responseData = {
     message: 'Данные id приняты',
     receivedData: id
   };
   res.json(responseData);
 });


//--------------------------------------
//create-folder
//--------------------------------------

// Асинхронный обработчик POST-запроса
app.post('/create-folder', async (req, res) => {
  try {
    console.log(req.body);
    console.log(' /folder-structure called');
    // Вызываем асинхронную функцию и ждем её завершения
    const scanResult = await scanFoldersForDocs();

    const responseData = {
      message: 'Данные успешно обработаны!',
      receivedData: scanResult, // Результат сканирования
      timestamp: new Date()
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

//--------------------------------------
///open-folder
//--------------------------------------

app.get('/open-folder',async  (req, res) => {

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





// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});