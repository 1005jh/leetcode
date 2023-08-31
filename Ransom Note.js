// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

// Example 1:

// Input: ransomNote = "a", magazine = "b" Output: false

// Example 2:

// Input: ransomNote = "aa", magazine = "ab" Output: false

// Example 3:

// Input: ransomNote = "aa", magazine = "aab" Output: true

// Constraints:

// 1 <= ransomNote.length, magazine.length <= 105

// ransomNote and magazine consist of lowercase English letters.

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  let magazineCharCount = {};
  for (const char of magazine) {
    magazineCharCount[char] = ++magazineCharCount[char] || 0;
  }

  for (const char of ransomNote) {
    // console.log(char,magazineCharCount[char])
    if (!magazineCharCount[char] || magazineCharCount[char] <= 0) {
      return false;
    }
    magazineCharCount[char]--;
  }
  return true;
};
