const express = require('express');
const bodyParser = require('body-parser');
const scanFoldersForDocs = require('./function/scanfolder.js'); // Убедитесь, что путь правильный

const app = express();
const port = 3000;

// Middleware для разбора JSON-тел запросов
app.use(bodyParser.json());

// Асинхронный обработчик POST-запроса
app.post('/create-folder', async (req, res) => {
    try {
        console.log(req.body);

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
