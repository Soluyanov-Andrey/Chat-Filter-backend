
const { deleteSelect } = require('./../apiDeleteSelect/arraySelect');
//Читает содержимое файла, извлекает текст ссылок из HTML, содержащегося в файле.
async function apiDeleteSelect( selectedIds ) {
    try {
    
      const success = await deleteSelect(selectedIds); // Передаем selectedIds
     
  
      return success; // Возвращаем извлеченные контексты
  
    } catch (error) {
      console.error('Ошибка при вызове apiDeleteSelect:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiDeleteSelect = apiDeleteSelect;