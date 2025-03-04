const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware для разбора JSON-тел запросов
app.use(bodyParser.json());

app.post('/create-folder', (req, res) => {
    console.log(req.body);

    const responseData = {
        message: 'Данные успешно обработаны!',
        receivedData: req.body,
        timestamp: new Date()
      };
    
      // Отправляем JSON-ответ
      res.json(responseData);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

