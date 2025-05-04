const fs = require('fs');
const { saveHtmlToFile } = require('./fileUtils'); 
const { readFileContent } = require('./fileUtils');
const { replaceFile } = require('./fileUtils');
const { PATH_FILE_NAME_NEW, PATH_FILE_TEMP_NEW}  = require('../../config');
// Mock the fs module to prevent actual file writes during tests
jest.mock('fs');

describe('saveHtmlToFile', () => {
  const filePath = 'test.html';
  const htmlContent = '<h1>Test HTML Content</h1>';

  beforeEach(() => {
    // Clear mock implementation before each test
    fs.writeFileSync.mockClear();
    console.log = jest.fn(); // Mock console.log
    console.error = jest.fn(); // Mock console.error
  });

  it('should successfully save HTML content to a file', () => {
    saveHtmlToFile(filePath, htmlContent);

    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, htmlContent);
    expect(console.log).toHaveBeenCalledWith('Файл успешно сохранен:', filePath);
    expect(console.error).not.toHaveBeenCalled(); // Should not call console.error
  });

  it('should handle and log errors during file writing', () => {
    const errorMessage = 'Simulated file writing error';
    fs.writeFileSync.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    saveHtmlToFile(filePath, htmlContent);

    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, htmlContent);
    expect(console.error).toHaveBeenCalledWith('Ошибка при записи файла:', new Error(errorMessage));
    expect(console.log).not.toHaveBeenCalled(); // Should not call console.log
  });

    it('should create the file if it doesnt exist', () => {
        saveHtmlToFile(filePath, htmlContent);
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('should overwrite the existing file if it exist', () => {
        // Simulating the file exists before running the function
        fs.existsSync.mockReturnValue(true);

        saveHtmlToFile(filePath, htmlContent);
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

});

describe('readFileContent', () => {
  const filePath = 'test.txt';
  const fileContent = 'This is the content of the test file.';
  const encoding = 'utf8';

  beforeEach(() => {
    // Clear mock implementations before each test
    fs.readFileSync.mockClear();
    console.error = jest.fn(); // Mock console.error
  });

  it('should successfully read file content and return it as a string', () => {
    fs.readFileSync.mockReturnValue(fileContent);

    const content = readFileContent(filePath, encoding);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, encoding);
    expect(content).toBe(fileContent);
  });

  it('should use the default encoding (utf8) if none is provided', () => {
    fs.readFileSync.mockReturnValue(fileContent);

    readFileContent(filePath);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
  });

  it('should throw an error if the file path is missing or empty', () => {
    expect(() => readFileContent('')).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');
    expect(() => readFileContent(null)).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');
    expect(() => readFileContent(undefined)).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');
  });

  it('should throw an error if the file path is not a string', () => {
    expect(() => readFileContent(123)).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');
    expect(() => readFileContent({})).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');
  });

  it('should catch and re-throw any errors that occur during file reading', () => {
    const errorMessage = 'Simulated file reading error';
    fs.readFileSync.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(() => readFileContent(filePath, encoding)).toThrowError(errorMessage);
    expect(console.error).toHaveBeenCalledWith('Ошибка при чтении файла:', errorMessage);
  });

  it('should throw an error if the file content is not a string', () => {
    fs.readFileSync.mockReturnValue(123); // Simulate reading non-string content

    expect(() => readFileContent(filePath, encoding)).toThrowError('Не удалось прочитать файл как строку');
  });
});

