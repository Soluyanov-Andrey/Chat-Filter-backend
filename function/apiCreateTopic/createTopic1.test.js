const fs = require('fs');
const { readFileContent } = require('../subsidiary/fileUtils'); // Замените на путь к вашему файлу

// Мокаем fs для изоляции тестов
jest.mock('fs');

describe('readFileContent', () => {
    afterEach(() => {
        jest.resetAllMocks(); // Сбрасываем моки после каждого теста
    });

    it('should read file content and return it as a string', () => {
        const filePath = 'test.txt';
        const fileContent = 'Hello, Jest!';
        fs.readFileSync.mockReturnValue(fileContent);

        const result = readFileContent(filePath);

        expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
        expect(result).toBe(fileContent);
    });
    

    it('should read file content with specified encoding', () => {
        const filePath = 'test.txt';
        const encoding = 'latin1';
        const fileContent = 'Test content';
        fs.readFileSync.mockReturnValue(fileContent);

        const result = readFileContent(filePath, encoding);

        expect(fs.readFileSync).toHaveBeenCalledWith(filePath, encoding);
        expect(result).toBe(fileContent);
    });


    it('should throw an error if file path is missing or not a string', () => {
        // Тест для null
        expect(() => readFileContent(null)).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');

        // Тест для undefined
        expect(() => readFileContent(undefined)).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');

        // Тест для пустой строки
        expect(() => readFileContent('')).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');

        // Тест для числа
        expect(() => readFileContent(123)).toThrowError('Путь к файлу должен быть строкой и не может быть пустым');
    });


    it('should handle errors from fs.readFileSync and rethrow them', () => {
        const filePath = 'test.txt';
        const errorMessage = 'Failed to read file';
        fs.readFileSync.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        try {
            readFileContent(filePath);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }
    });
    
    it('should handle errors from fs.readFileSync and rethrow them', () => {
        const filePath = 'test.txt';
        const errorMessage = 'Failed to read file';
        fs.readFileSync.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        try {
            readFileContent(filePath);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }
    });

   it('should handle invalid content type from fs.readFileSync', () => {
        const filePath = 'test.txt';
        const invalidContent = 123; // Число вместо строки
        fs.readFileSync.mockReturnValue(invalidContent);

        expect(() => readFileContent(filePath)).toThrowError('Не удалось прочитать файл как строку');
    });
});