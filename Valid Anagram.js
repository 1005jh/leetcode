// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: s = "anagram", t = "nagaram" Output: true

// Example 2:

// Input: s = "rat", t = "car" Output: false

// Constraints:

// 1 <= s.length, t.length <= 5 * 104

// s and t consist of lowercase English letters.

// /**
//  * @param {string} s
//  * @param {string} t
//  * @return {boolean}
//  */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let scounting = {};
  let tcounting = {};
  for (let i = 0; i < s.length; i++) {
    scounting[s[i]] = (scounting[s[i]] || 0) + 1;
    tcounting[t[i]] = (tcounting[t[i]] || 0) + 1;
  }
  for (const key in scounting) {
    if (scounting[key] !== tcounting[key]) return false;
  }

  return true;
};
