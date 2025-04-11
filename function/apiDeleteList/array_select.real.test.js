const { array_select } = require('./array_select');
const { delete_select } = require('./array_select');


/**
 * Выбирает все выбраные элементы в масив возвращая в масиве значения строк
 */
describe('array_select with real path', () => {
  it('array_select [1, 2, 3]', () => {
  
    const indicesToSelect = [1, 2, 3];
  
    console.log(array_select(indicesToSelect));
   
  });

  it('delete_select with real path ', () => {
  
    const indicesToSelect = [5];
    success = delete_select(indicesToSelect);
    if (success) {
      console.log("delete_select в файле выполнена успешно");
    } else {
      console.error("delete_select не удался");
    }
  
 
   
  });

 


}); 