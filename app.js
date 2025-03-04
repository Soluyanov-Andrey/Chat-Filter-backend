// Импортируем Express
const express = require('express');

// Создаем приложение
const app = express();

// Роут для главной страницы
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Запускаем сервер на порту 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});