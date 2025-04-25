const { findMaxNumberInFilenames , findMaxNumberAfterDash } = require('./additionalFunctions'); // Замените 'your-file-name'
const assert = require('assert');

describe('findMaxNumberInFilenames', () => {
    it('Тест findMaxNumberInFilenames', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
      const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
      const expectedResult = 3;
  
      // Act: Call the function
      const actualResult = findMaxNumberInFilenames(directoryToTest);
      console.log(actualResult);
      
      // Assert: Check if the returned value matches the expected result
      assert.strictEqual(actualResult, expectedResult);
    });
  });

describe('findMaxNumberAfterDash', () => {
    it('Тест findMaxNumberAfterDash', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
    
      const directoryPath = '/media/andrey/project/project/servers/SERVER-node-chatGPT/document/themes/pages'; 
      const prefixToSearch = 'in2';
      maxNumber = findMaxNumberAfterDash(directoryPath, prefixToSearch);
      console.log(maxNumber);
      
    });
  });