const { createTopic } = require('./createTopic'); 
const { createInFile } = require('./createTopic'); 

const { DOCUMENT_PAGE_HREF } = require('./../../config'); 
const { DOCUMENT_PAGE } = require('./../../config'); 
const { PATH_THEMES } = require('./../../config'); 

 it('should read file content and return it as a string', () => {

    path = "/media/andrey/project/flash/linux/manul/7zip/document/root.html";
    theme = "новая тема"
    createTopic(path,theme);

    });

   it('createInFile', () => {
    
    path = "/media/andrey/project/flash/linux/manul/7zip/document/root.html";
    
    createInFile(path,theme);

    });  
  