const scanFoldersForDocs = require('./function/scanfolder.js'); // Убедитесь, что путь правильный
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware для разбора JSON-тел запросов
app.use(bodyParser.urlencoded());

app.get('/folder-structure',async  (req, res) => {

   // 1. Получаем параметр path из req.query
   const encodedPath = req.query.path;
   console.log(req.query);
   // 2. URL-декодируем значение параметра
   const path = decodeURIComponent(encodedPath);
 
   console.log('Полученный и декодированный path:', path);

  const responseData = {
    message: 'Данные успешно обработаны!',
    receivedData: await scanFoldersForDocs(path)
  };
  res.json(responseData);
});

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

// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});