const fs = require('fs-extra');
const path = require('path');
const { copyDirectoryNodeDir } = require('../apiCreateFolder/createFolder-2');

describe('copyDirectoryNodeDir', () => {
  it('should copy the contents of sourceDir to baseDir, replacing existing content', async () => {
    // Define test directories
    const currentDir = __dirname;
    const sourceDir = path.resolve(currentDir, '../../document');
    const baseDir = path.resolve(currentDir, '../../test');

    // // Create source dir and files
    // await fs.ensureDir(sourceDir);
    // await fs.writeFile(path.join(sourceDir, 'file1.txt'), 'Source file content');

    // // Create base dir and initial content
    // await fs.ensureDir(baseDir);
    // await fs.writeFile(path.join(baseDir, 'existing_file.txt'), 'Existing content');

    // Act: Copy directory
    await copyDirectoryNodeDir(sourceDir, baseDir);

 

  });
});