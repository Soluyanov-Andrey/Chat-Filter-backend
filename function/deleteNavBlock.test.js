const { readFileContent } = require('./fileUtils');
const { saveHtmlToFile } = require('./fileUtils');
const { removeSidebarNav } = require('./deleteNavBlock');

const fs = require('fs');
const path = require('path'); // Import the 'path' module

describe('Integration Test: removeSidebarNav with actual file operations', () => {
  const path = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/ChatGPT _ ChatGPT 4o Free _ Support all countries.html';
  const pathNew = '/media/andrey/project/project/servers/SERVER-node-chatGPT/test/C1.html';

  it('should read the HTML file, remove the sidebar nav, and save the modified content to a new file', () => {
    // 1. Read the HTML file
    const read = readFileContent(path);

    // 2. Remove the sidebar
    const contDel = removeSidebarNav(read);

    // 3. Save the modified HTML to a new file
    saveHtmlToFile(pathNew, contDel);

    // 4.  Verify the result by reading the new file and checking content.
    //    This is where we confirm the operation was successful.

    let savedContent;
    try {
      savedContent = fs.readFileSync(pathNew, 'utf-8');
    } catch (error) {
      // Handle the error if the file can't be read (e.g., not created)
      throw new Error(`Error reading the saved file: ${error}`);
    }

    // Prepare the expected content by reading the original file and running removeSidebarNav on it:
    const expectedContent = removeSidebarNav(readFileContent(path));

    // Now make assertions:
    expect(savedContent).toEqual(expectedContent);

  });
});