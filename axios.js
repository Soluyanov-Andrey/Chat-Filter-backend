// const axios = require('axios');

// async function makeRequest(path) {
//   try {
//     const response = await axios.get('/folder-structure', {
//       baseURL: 'http://localhost:3000',
//       params: { // Параметры, которые будут автоматически URL-encoded
//         path: path
//       }
//     });
//     console.dir(response.data, { depth: null });
    
//   } catch (error) {
//     console.error(error);
//   }
// }

// makeRequest('/media/andrey/Рабочий/flash/help.ru/javascript/help и заметки');


// async function createFolder(path) {
//     const baseURL = 'http://localhost:3000';
//     const folderData = { path: path };
  
//     try {
//       const response = await axios.post(`${baseURL}/create-folder`, folderData);
//       console.dir(response.data, { depth: null });
//       console.log('Код статуса:', response.status);
//     } catch (error) {
//       console.error('Ошибка:', error.response ? error.response.data : error.message);
//     }
//   }
  
// //   // Пример использования
//   createFolder('/tmp/новая папка');

// const axios = require('axios');

// async function deleteList(id) {
//   try {
//     const response = await axios.get('/delete-list', {
//       baseURL: 'http://localhost:3000',
//       params: { // Параметры, которые будут автоматически URL-encoded
//         id: id
//       }
//     });
//     console.dir(response.data, { depth: null });
    
//   } catch (error) {
//     console.error(error);
//   }
// }

// deleteList('150');

const axios = require('axios');

// Данные, которые будут отправлены в теле запроса
const testData = {
  "path": "/media/andrey/Рабочий/flash/linux/manul/7zip"
};

// URL, на который будет отправлен запрос
const baseURL = 'http://localhost:3000';
const url = `${baseURL}/create-folder`; // Полный URL

// Конфигурация запроса (заголовки)
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Отправка POST-запроса с использованием axios
async function sendPostRequest() {
  try {
    console.log('Отправляемые данные (JSON):', JSON.stringify(testData));

    const response = await axios.post(url, testData, config);

    console.log('Код статуса:', response.status);
    console.log('Ответ сервера (данные):', response.data); // response.data содержит JSON

    // Обработка данных ответа (например, проверка message)
    if (response.data && response.data.message) {
      console.log('Сообщение от сервера:', response.data.message);
    }

  } catch (error) {
    console.error('Произошла ошибка при отправке запроса:', error.message);
    if (error.response) {
      // Сервер вернул код ошибки
      console.error('Код ответа:', error.response.status);
      console.error('Данные ответа:', error.response.data);
    } else if (error.request) {
      // Запрос был сделан, но ответ не был получен
      console.error('Нет ответа от сервера');
    } else {
      // Произошла ошибка при настройке запроса
      console.error('Ошибка при настройке запроса:', error.message);
    }
  }
}

// Вызов асинхронной функции
sendPostRequest();