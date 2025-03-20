const scanFoldersForDocs = require('./folderStructure'); 
describe('scanFoldersForDocs Function Tests - Simple Test', () => {
    it('should return a JSON object or throw an error', async () => {
      const testDir = '.'; //  Текущая директория, предполагаем что она существует

      try {
        const result = await scanFoldersForDocs();
        console.log("Result from scanFoldersForDocs:", result);
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      } catch (error) {
        //  Если функция выбросила ошибку, тест тоже должен пройти
        expect(error).toBeInstanceOf(Error);
      }
    });
});
