const axios = require('axios');

async function makeRequest(path) {
  try {
    const response = await axios.get('/folder-structure', {
      baseURL: 'http://localhost:3000',
      params: { // Параметры, которые будут автоматически URL-encoded
        path: path
      }
    });
    console.dir(response.data, { depth: null });
    
  } catch (error) {
    console.error(error);
  }
}

makeRequest('/media/andrey/Рабочий/flash/help.ru/javascript/help и заметки');


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
  
//   // Пример использования
//   createFolder('/tmp/новая папка');