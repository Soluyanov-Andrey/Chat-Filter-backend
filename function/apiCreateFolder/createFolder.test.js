const fs = require('fs-extra');
const path = require('path');
const { copyDirectory , createFolder } = require('./createFolder.js');

/**
 *  Функция exec из модуля child_process позволяет вам выполнить команду операционной системы в отдельном дочернем процессе.
 *  Она принимает строку с командой (например, "ls -l" или "python my_script.py") и необязательные аргументы (callback-функцию, опции). Когда команда завершается, 
 *  она возвращает stdout (стандартный вывод), stderr (стандартный вывод ошибок) и код выхода.
 * 
 */

const { exec } = require('child_process');

const currentDir = __dirname;
const sourceDir = path.resolve(currentDir, '../../document');
const baseDir = path.resolve(currentDir, '../../test');
baseDirPlus = baseDir + '/document';

// // Перед каждым тестом убедимся, что папка tmpTest пуста
beforeEach(() => {
    fs.ensureDirSync(baseDir);
    fs.emptyDirSync(baseDir);
});

// describe('copyDirectory', () => {
//     it('должна успешно скопировать содержимое директории', (done) => {  // Используем параметр done
//         copyDirectory(sourceDir, baseDir);

//         //Так проверяем из командной строки схожесть папок.
//         const command = `diff -r ${sourceDir} ${baseDirPlus}`;

//         const executeCommand = (command) => {
//             return new Promise((resolve, reject) => {
//                 exec(command, (error, stdout, stderr) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve({ stdout, stderr });
//                     }
//                 });
//             });
//         };

//         executeCommand(command)
//             .then(({ stdout, stderr }) => {
//                 expect(stdout).toBe('');
//                 expect(stderr).toBe('');
//                 done(); // Вызываем done, чтобы сообщить Jest, что тест завершен
//             })
//             .catch(error => {
//                 done(error); // Вызываем done с ошибкой, чтобы пометить тест как проваленный
//             });
//     });
// });



describe('createFolder', () => {
    it('тестируем создание папки', (done) => {  // Используем параметр done
        
        createFolder(baseDir);

    });
});