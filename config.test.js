// config.test.js
const { ROOT_DIR } = require('./config'); // Импортируем модуль config.js
const { DATA_DIR } = require('./config'); 
const { FULL_PATH } = require('./config'); 
const { PATH_ILE_NAME_NEW } = require('./config'); 

const path = require('path');

describe('Config Module', () => {
  it('should correctly define ROOT_DIR', () => {
    const expectedRootDir = process.cwd();
    console.log('Expected ROOT_DIR:', expectedRootDir);
    console.log('Actual ROOT_DIR:', ROOT_DIR);
    expect(ROOT_DIR).toBe(expectedRootDir);
  });

  it('should correctly define DATA_DIR', () => {
    const expectedDataDir = path.join(process.cwd(), 'data');
    console.log('Expected DATA_DIR:', expectedDataDir);
    console.log('Actual DATA_DIR:', DATA_DIR);
    expect(DATA_DIR).toBe(expectedDataDir);
  });

  it('should correctly define FULL_PATH', () => {
     
    console.log('Actual FULL_PATH:', FULL_PATH);
 
  });

  it('should correctly define FULL_PATH', () => {
     
    console.log('Actual PATH_ILE_NAME_NEW:', PATH_ILE_NAME_NEW);
 
  });

});