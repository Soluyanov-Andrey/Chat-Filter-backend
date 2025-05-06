const { extractContextsFromChatPrompts } = require('../apiScan/scan');
const { array_select } = require('./array_select');
const { PATH_FILE_NAME_NEW } = require('../../config');

// Mock the extractContextsFromChatPrompts function
jest.mock('../apiScan/scan', () => ({
  extractContextsFromChatPrompts: jest.fn()
}));

describe('array_select', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Setup the mock implementation for extractContextsFromChatPrompts
    extractContextsFromChatPrompts.mockReturnValue([
      'Context 1',
      'Context 2',
      'Context 3',
      'Context 4',
      'Context 5',
      'Context 6'
    ]);
  });

  it('should select contexts at indices 1, 5, and 2 (1-based) from the contexts array', () => {
    // Arrange
    const indices = [1, 5, 2];
    
    // Act
    const result = array_select(indices);
    
    // Assert
    expect(extractContextsFromChatPrompts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(['Context 1', 'Context 5', 'Context 2']);
  });

  it('should handle empty array input', () => {
    // Arrange
    const indices = [];
    
    // Act
    const result = array_select(indices);
    
    // Assert
    expect(extractContextsFromChatPrompts).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should handle out-of-bounds indices gracefully', () => {
    // Arrange
    const indices = [1, 10, 2]; // 10 is out of bounds
    
    // Act
    const result = array_select(indices);
    
    // Assert
    expect(extractContextsFromChatPrompts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(['Context 1', undefined, 'Context 2']);
  });

  it('should select specific contexts based on provided indices using real path', () => {
    // Get all contexts from the real file
    const allContexts = extractContextsFromChatPrompts(PATH_FILE_NAME_NEW);
    console.log(allContexts)
    // Define the indices to select (1-based)
    const indicesToSelect = [1, 5, 2];
    
    // Call the delete_select function
    const selectedContexts = array_select(indicesToSelect);
    
    
    // Verify the results
    expect(selectedContexts.length).toBe(3);
    
    // Check that the selected contexts match the expected ones
    // Note: indices are 1-based in the input, but 0-based in the array
    expect(selectedContexts[0]).toBe(allContexts[0]); // index 1 -> 0
    expect(selectedContexts[1]).toBe(allContexts[4]); // index 5 -> 4
    expect(selectedContexts[2]).toBe(allContexts[1]); // index 2 -> 1
  });
});
