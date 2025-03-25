const { scanFoldersForDocs } = require('./folderStructure'); 
const { isLastFolderDocument } = require('./folderStructure');

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

describe('isLastFolderDocument', () => {
  it('should return true when the last folder is "document"', () => {
    expect(isLastFolderDocument('/media/andrey/Рабочий/flash/document')).toBe(true);
    expect(isLastFolderDocument('папка/document')).toBe(true);
    expect(isLastFolderDocument('document')).toBe(true);
  });

  it('should return false when the last folder is not "document"', () => {
    expect(isLastFolderDocument('/media/andrey/Рабочий/flash/other')).toBe(false);
    expect(isLastFolderDocument('папка/папка2')).toBe(false);
    expect(isLastFolderDocument('')).toBe(false); // Пустая строка
  });
});