const { extractContextsFromChatPrompts } = require('./scan');
const { PATH_FILE_NAME_NEW } = require('../../config');

/**
 * Selects specific elements from the result of extractContextsFromChatPrompts based on provided indices.
 * @param {number[]} array - Array of indices (1-based) to select from the contexts array.
 * @returns {string[]} - Array of selected contexts.
 */
function delete_select(array) {
  // Call extractContextsFromChatPrompts with PATH_FILE_NAME_NEW
  const contexts = extractContextsFromChatPrompts(PATH_FILE_NAME_NEW);
  
  // Convert 1-based indices to 0-based indices by subtracting 1 from each element
  const zeroBasedIndices = array.map(index => index - 1);
  
  // Select elements from contexts array using the zero-based indices
  const selectedContexts = zeroBasedIndices.map(index => contexts[index]);
  
  return selectedContexts;
}

module.exports.delete_select = delete_select; 