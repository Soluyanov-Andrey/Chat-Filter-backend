// my-api-get.test.js
const request = require('supertest');

describe('GET /folder-structure (тестирование запущенного сервера)', () => {
    const baseURL = 'http://localhost:3000'; // URL вашего *запущенного* сервера
    const testPath = '/media/andrey/Рабочий/flash/linux/manul'; // Пример пути к папке
  
    it('должен возвращать 200 OK и ожидаемые данные с path', async () => {
      const encodedPath = encodeURIComponent(testPath); // URL-кодируем путь
  
      const response = await request(baseURL)
        .get('/folder-structure')
        .query({ path: encodedPath }); // Передаем закодированный путь как query-параметр
  
      
      console.dir(response.body, { depth: null, colors: true });

      expect(response.status).toBe(200);
     
    });
  });

  describe('GET /scan (тестирование запущенного сервера)', () => {
    const baseURL = 'http://localhost:3000'; // URL вашего *запущенного* сервера
    const testPath = '/media/andrey/Рабочий/flash/linux/manul'; // Пример пути к папке
  
    it('должен возвращать 200 OK и ожидаемые данные с path', async () => {
      const encodedPath = encodeURIComponent(testPath); // URL-кодируем путь
  
      const response = await request(baseURL)
        .get('/scan')
        .query({ path: encodedPath }); // Передаем закодированный путь как query-параметр
  
      
      console.dir(response.body, { depth: null, colors: true });

      expect(response.status).toBe(200);
     
    });
  });