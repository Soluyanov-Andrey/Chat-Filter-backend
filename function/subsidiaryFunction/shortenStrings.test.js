const { shortenStrings } = require('./shortenStrings'); 


describe('shortenStrings', () => {
    it('should shorten strings longer than maxLength', () => {
      const strings = ["Короткая строка", "Очень длинная строка, которую нужно сократить", "Еще одна строка"];
      const maxLength = 15;
      const expected = ['Короткая строка', 'Очень длинная с', 'Еще одна строка'];
      expect(shortenStrings(strings, maxLength)).toEqual(expected);
    });
  
    it('should not shorten strings shorter than maxLength', () => {
      const strings = ["Короткая строка", "Еще одна строка"];
      const maxLength = 20;
      const expected = ["Короткая строка", "Еще одна строка"];
      expect(shortenStrings(strings, maxLength)).toEqual(expected);
    });
  
    it('should handle an empty array', () => {
      const strings = [];
      const maxLength = 10;
      expect(shortenStrings(strings, maxLength)).toEqual([]);
    });
  
    it('should return an empty array if the first argument is not an array', () => {
      const strings = "not an array";
      const maxLength = 10;
      expect(shortenStrings(strings, maxLength)).toEqual([]);
    });
  
    it('should return the original array if maxLength is not a positive integer', () => {
      const strings = ["string1", "string2"];
      const maxLength1 = -5;
      const maxLength2 = 3.14;
      const maxLength3 = "abc";
      expect(shortenStrings(strings, maxLength1)).toEqual(strings);
      expect(shortenStrings(strings, maxLength2)).toEqual(strings);
      expect(shortenStrings(strings, maxLength3)).toEqual(strings);
    });
  
    it('should handle an empty string in the array', () => {
      const strings = ["", "Some string"];
      const maxLength = 5;
      const expected = ["", "Some "];
      expect(shortenStrings(strings, maxLength)).toEqual(expect.arrayContaining(expected));
      expect(shortenStrings(strings, maxLength).length).toBe(expected.length);
    });
  
    it('should not modify original array', () => {
      const strings = ["Short", "A bit longer string"];
      const original = [...strings];
      const maxLength = 5;
      shortenStrings(strings, maxLength);
      expect(strings).toEqual(original);
    });
      
    it('should handle non-string elements in the array', () => {
      const strings = ["string1", 123, "string2"];
      const maxLength = 5;
      const expected = ["strin", 123, "strin"];
      expect(shortenStrings(strings, maxLength)).toEqual(expect.arrayContaining(expected));
       expect(shortenStrings(strings, maxLength).length).toBe(expected.length);
  
    });
  });