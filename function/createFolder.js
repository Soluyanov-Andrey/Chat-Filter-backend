const fs = require('fs-extra');
const path = require('path');

async function copyDirectory(source , destination) {
  if (!destination) {
    throw new Error('Не указан параметр destination');
  }

  try {
    // Получаем имя папки из исходного пути
    const folderName = path.basename(source);
    // Создаем новый путь для назначения, включая имя папки
    const newDestination = path.join(destination, folderName);
console.log(newDestination);
    // Копируем папку с её содержимым
    await fs.copy(source, newDestination);
    console.log(`Папка "${folderName}" скопирована успешно в "${newDestination}"!`);
  } catch (err) {
    console.error('Ошибка при копировании папки:', err);
  }
}

module.exports =  copyDirectory;