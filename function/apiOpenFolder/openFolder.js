const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Extracts href and topic from all <a> tags in an HTML file.
 *
 * @param {string} filePath - The path to the HTML file.
 * @returns {Array<Object>} An array of objects, each containing `href` and `topic`.
 *                           Returns an empty array if no <a> tags are found or if an error occurs.
 */
function extractHrefAndTopicFromFile(filePath) {
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(htmlContent);
    const results = [];

    $('a').each((index, element) => {
      const href = $(element).attr('href');
      const topic = $(element).text().trim(); // Extract text content of the <a> tag

      if (href && topic) { // Check if both href and topic are valid
          // Extract just the filename "in*.html" from the relative path
          const filename = href.split('/').pop();

          results.push({
            href: filename,  // Store just the filename
            topic: topic,
          });
      }
    });

    return results;
  } catch (error) {
    console.error("Error reading or parsing HTML file:", error);
    return [];  // Return an empty array in case of errors.
  }
}

// Example usage:  (Assuming you save the HTML content in a file named 'index.html')
// const results = extractHrefAndTopicFromFile('index.html');
// console.log(results);

module.exports.extractHrefAndTopicFromFile = extractHrefAndTopicFromFile; // Export the function for testing