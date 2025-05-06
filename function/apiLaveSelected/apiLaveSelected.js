const { laveSelected } = require('./../apiDeleteSelect/arraySelect');
//Читает содержимое файла, извлекает текст ссылок из HTML, содержащегося в файле.
async function apiLaveSelect( selectedIds ) {
    try {
    
      const success = await laveSelected(selectedIds); // Передаем selectedIds
     
  
      return success; // Возвращаем извлеченные контексты
  
    } catch (error) {
      console.error('Ошибка при вызове apiLaveSelect(:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiLaveSelect = apiLaveSelect;