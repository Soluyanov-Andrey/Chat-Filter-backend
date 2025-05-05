
const { getHrefFromHTMLFiles } = require('./../apiOpenDocument/getHrefByIndex'); 
const { readFileTextFromHTML } = require('./../apiOpenDocument/extractLinkHTML'); 

async function apiOpenThemes(path, pathHref, encodedIndex) {
    try {
        
      const getHref = await getHrefFromHTMLFiles(pathHref, encodedIndex);
  
      const fileText = readFileTextFromHTML(path + '/' +  getHref);

      return fileText; // Возвращаем извлеченные контексты
  
    } catch (error) {
      console.error('Ошибка в apiOpenThemes:', error);
      throw error; // Перебрасываем ошибку, чтобы обработать ее в маршруте
    }
  }

module.exports.apiOpenThemes = apiOpenThemes;