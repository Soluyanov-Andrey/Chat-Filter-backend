// config.test.js
const { ROOT_DIR, DATA_DIR, FULL_PATH} = require('./config'); // Импортируем модуль config.js
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

});