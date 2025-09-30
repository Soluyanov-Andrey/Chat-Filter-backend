const { createTopic } = require('./createTopic'); // Замените 'your-file-name'
const { createInFile } = require('./createTopic'); 
const { extractNumberAndContent } = require('./createTopic'); 

const { DOCUMENT_PAGE_HREF } = require('./../../config'); 
const { DOCUMENT_PAGE } = require('./../../config'); 
const { PATH_THEMES } = require('./../../config'); 



/**
 * Путь в котором выбранно для создание темы
 * path = /media/andrey/project/flash/linux/manul/7zip/document
 * 
 * topicValue = "тут будет название темы которое придет от клиента"
 */

function apiCreateTopic(path,topicValue) {

  console.log('path',path);
  console.log('topicValue',topicValue);

   extract = extractNumberAndContent(path + '/' + DOCUMENT_PAGE_HREF);

   console.log(extract.extractedNumber);

   pathNew = path + `/themes/in${extract.extractedNumber + 1}.html`;
  
   console.log("DOCUMENT_PAGE", DOCUMENT_PAGE);
   console.log("pathNew ", pathNew );

   createInFile(DOCUMENT_PAGE, pathNew );
 

  path = path + '/' + DOCUMENT_PAGE_HREF;
  console.log("path = path + '/' + DOCUMENT_PAGE_HREF;",path );
   createTopic(extract, path,topicValue);


}




module.exports.apiCreateTopic = apiCreateTopic;