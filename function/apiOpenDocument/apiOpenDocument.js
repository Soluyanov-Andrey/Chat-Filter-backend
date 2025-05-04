
const { readFileTextFromHTML } = require('./extractLinkHTML'); 

//Читает содержимое файла, извлекает текст ссылок из HTML, содержащегося в файле.
async function apiOpenDocument( path , document_page_href) {
    try {
      
      const extractedContexts = await readFileTextFromHTML(path + '/' + document_page_href);
  
      return extractedContexts; // Возвращаем извлеченные контексты
  
    } catch (error) {
      console.error('Ошибка в apiScan:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiOpenDocument = apiOpenDocument;