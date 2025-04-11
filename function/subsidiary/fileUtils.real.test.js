const fs = require('fs');

const { replaceFile } = require('./fileUtils');
const { PATH_FILE_NAME_NEW, PATH_FILE_TEMP_NEW}  = require('../../config');

describe('replaceFile', () => {


    it('Проверяем функцию replaceFile', () => {
     
      const success = replaceFile(PATH_FILE_TEMP_NEW, PATH_FILE_NAME_NEW);
  
      if (success) {
        console.log("Замена файла выполнена успешно.");
      } else {
        console.error("Замена файла не удалась.");
      }
  
    });
  
  });