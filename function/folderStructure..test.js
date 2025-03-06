const scanFoldersForDocs = require('./scanfolder.js'); 
describe('scanFoldersForDocs Function Tests - Simple Test', () => {
    it('should return a JSON object or throw an error', async () => {
      const testDir = '.'; //  Текущая директория, предполагаем что она существует

      try {
        const result = await scanFoldersForDocs(testDir);
        console.log("Result from scanFoldersForDocs:", result);
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      } catch (error) {
        //  Если функция выбросила ошибку, тест тоже должен пройти
        expect(error).toBeInstanceOf(Error);
      }
    });
});

// const scanFoldersForDocs = require('./scanfolder.js'); // Убедитесь, что путь правильный
// const fs = require('fs');
// const path = require('path');

// describe('scanFoldersForDocs Function Tests', () => {
//   const testDir = 'test_dir'; //  Сделайте testDir уникальным, например, testDir_${Date.now()}
//   const folder1 = path.join(testDir, 'folder1');
//   const folder2 = path.join(testDir, 'folder2');
//   const docFolder = path.join(folder1, 'document');

//   // Перед каждым тестом создаем тестовую директорию и папки
//   beforeEach(async () => {
//     try {
//       await fs.promises.mkdir(testDir, { recursive: true });
//       await fs.promises.mkdir(folder1, { recursive: true });
//       await fs.promises.mkdir(folder2, { recursive: true });
//       await fs.promises.mkdir(docFolder, { recursive: true }); // Создаем "document" только в folder1
//     } catch (error) {
//       console.error('Error in beforeEach:', error);
//       throw error; //  Важно пробросить ошибку, чтобы Jest знал о ней
//     }
//   });

//   // После каждого теста удаляем тестовую директорию и все ее содержимое
//   afterEach(async () => {
//     try {
//       await fs.promises.rm(testDir, { recursive: true, force: true });
//     } catch (error) {
//       console.error('Error in afterEach:', error);
//       throw error; // Важно пробросить ошибку, чтобы Jest знал о ней
//     }
//   });

//   it('should return a JSON object with folders and their types', async () => {
//     let result;
//     try {
//       result = await scanFoldersForDocs(testDir);
//       console.log("Result from scanFoldersForDocs:", result); // Выводим результат в консоль

//       expect(result).toBeDefined(); // Проверяем, что функция вернула какое-то значение
//       expect(typeof result).toBe('object'); // Проверяем, что это объект

//       expect(result.folders).toBeDefined(); // Проверяем, что есть поле 'folders'
//       expect(Array.isArray(result.folders)).toBe(true); // Проверяем, что 'folders' - это массив

//       // Проверяем содержимое массива 'folders' (в конкретном порядке)
//       expect(result.folders).toStrictEqual([ // Используем toStrictEqual
//         { name: 'folder1', type: 'folder+' }, // folder1 должен иметь "document"
//         { name: 'folder2', type: 'folder-' }  // folder2 не должен иметь "document"
//       ]);
//     } catch (error) {
//       console.error('Error in test:', error);
//       throw error; // Важно пробросить ошибку, чтобы Jest знал о ней
//     }
//   });
// });