const request = require('supertest');

describe('POST /create-folder (подключение к существующему серверу)', () => {
  const baseURL = 'http://localhost:3000';

  it('должен возвращать 200 OK', async () => { //  Добавил проверку на 200 OK
    const testData = {
      "path": "/media/andrey/Рабочий/flash/linux/manul/7zip"
  };
  console.log('Отправляемые данные (JSON):', JSON.stringify(testData));

  
    const response = await request(baseURL)
      .post('/create-folder') // Обновляем путь
      .set('Content-Type', 'application/json') // Явно устанавливаем Content-Type
      .send(testData); // Отправляем данные
      
      console.log('Ответ сервера (JSON):', response.text); // Или response.body, если уверены, что это JSON
      console.log('Код статуса:', response.status);
    expect(response.status).toBe(200); // Проверяем код статуса
    //console.log(response.body);

    // Здесь можно добавить дополнительные проверки на тело ответа
    // Например, если сервер возвращает JSON:
    // expect(response.body.message).toBe('Папка успешно создана!');
    //  если возвращает text:
    //expect(response.text).toBe('Папка успешно создана!');
  });
});


describe('POST /lookPageBtn (подключение к существующему серверу)', () => {
  const baseURL = 'http://localhost:3000';

  it('должен возвращать 200 OK', async () => { //  Добавил проверку на 200 OK
    const testData = [1,2,3];
  console.log('Отправляемые данные (JSON):', JSON.stringify(testData));

  
    const response = await request(baseURL)
      .post('/lookPageBtn') // Обновляем путь
      .set('Content-Type', 'application/json') // Явно устанавливаем Content-Type
      .send(testData); // Отправляем данные
      
      console.log('Ответ сервера (JSON):', response.text); // Или response.body, если уверены, что это JSON
      console.log('Код статуса:', response.status);
    expect(response.status).toBe(200); // Проверяем код статуса
    //console.log(response.body);

    // Здесь можно добавить дополнительные проверки на тело ответа
    // Например, если сервер возвращает JSON:
    // expect(response.body.message).toBe('Папка успешно создана!');
    //  если возвращает text:
    //expect(response.text).toBe('Папка успешно создана!');
  });
});