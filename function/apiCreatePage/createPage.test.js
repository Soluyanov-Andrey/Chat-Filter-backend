const { findMaxNumberInFilenames } = require('./createPage'); // Замените 'your-file-name'
const assert = require('assert');

describe('findMaxNumberInFilenames', () => {
    it('should return 110 when the directory contains files with numbers up to 110', () => {
      // Arrange: Prepare the directory to test (you still need to create this directory and files)
      const directoryToTest = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/pages'; 
      const expectedResult = 110;
  
      // Act: Call the function
      const actualResult = findMaxNumberInFilenames(directoryToTest);
      console.log(actualResult);
      
      // Assert: Check if the returned value matches the expected result
      assert.strictEqual(actualResult, expectedResult);
    });
  });