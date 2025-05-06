const { lookPageBtn } = require('./../apiDeleteSelect/arraySelect');


async function apiLookPage( selectedIds ) {
    try {
    
      const success = await lookPageBtn(selectedIds); 
     
  
      return success; 
  
    } catch (error) {
      console.error('Ошибка при вызове apiLookPage:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiLookPage = apiLookPage;

