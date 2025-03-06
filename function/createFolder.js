//Вот так функция просто записывает создержание папки вовнутрь без создания самой папки
// если нужно чтоб папка создалась то в destination нужно передовать с создоваемой папкой
// например если есть папка test то чтоб в ней создалась папка document нужно передать
// test/document
const fs = require('fs-extra');
const path = require('path');

async function copyDirectory(source, destination) {

  try {
    await fs.copy(source, destination);
    console.log('Папка скопирована успешно!');
  } catch (err) {
    console.error('Ошибка при копировании папки:', err);
  }
}

module.exports = copyDirectory ;


