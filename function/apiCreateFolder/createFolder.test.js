const fs = require('fs-extra');
const path = require('path');
const copyDirectory  = require('./createFolder.js');
const { exec } = require('child_process'); // Для запуска команд в терминале

const currentDir = __dirname;

console.log(currentDir);

// Формируем абсолютные пути к нужным папкам, используя path.resolve()
const sourceDir = path.resolve(currentDir, '../../document');
const baseDir = path.resolve(currentDir, '../../test');

baseDirPlus = baseDir + '/document';

// Перед каждым тестом убедимся, что папка tmpTest пуста
beforeEach(async () => {
    await fs.ensureDir(baseDir);
    await fs.emptyDir(baseDir);
  });

describe('copyDirectory', () => {
  it('должна успешно скопировать содержимое директории', async () => {
    await copyDirectory(sourceDir, baseDir);

    // Запускаем команду diff для сравнения директорий
    const command = `diff -r ${sourceDir} ${baseDirPlus}`;

    // Функция для выполнения команды в терминале
    const executeCommand = (command) => {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve({ stdout, stderr });
          }
        });
      });
    };


    const { stdout, stderr } = await executeCommand(command);

    // Если diff не вернул ничего (stdout пустой), значит, директории идентичны
    expect(stdout).toBe('');
    expect(stderr).toBe(''); // Проверяем наличие ошибок
  });
});