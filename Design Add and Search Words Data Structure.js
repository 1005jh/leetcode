// Design a data structure that supports adding new words and finding if a string matches any previously added string.

// Implement the WordDictionary class:

// WordDictionary() Initializes the object.

// void addWord(word) Adds word to the data structure, it can be matched later.

// bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

// Example:

// Input ["WordDictionary","addWord","addWord","addWord","search","search","search","search"] [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]] Output [null,null,null,null,false,true,true,true] Explanation WordDictionary wordDictionary = new WordDictionary(); wordDictionary.addWord("bad"); wordDictionary.addWord("dad"); wordDictionary.addWord("mad"); wordDictionary.search("pad"); // return False wordDictionary.search("bad"); // return True wordDictionary.search(".ad"); // return True wordDictionary.search("b.."); // return True

// Constraints:

// 1 <= word.length <= 25

// word in addWord consists of lowercase English letters.

// word in search consist of '.' or lowercase English letters.

// There will be at most 2 dots in word for search queries.

// At most 104 calls will be made to addWord and search.\
var TrieNode = function () {
  this.children = {};
  this.isEndOfWord = false;
};

var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;
  for (const char of word) {
    if (!node.children[char]) {
      node.children[char] = new TrieNode();
    }
    node = node.children[char];
  }
  node.isEndOfWord = true;
};

WordDictionary.prototype.searchInNode = function (word, node) {
  for (let i = 0; i < word.length; ++i) {
    const ch = word[i];
    if (ch !== ".") {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    } else {
      for (const child in node.children) {
        if (this.searchInNode(word.substring(i + 1), node.children[child])) {
          return true;
        }
      }
      return false;
    }
  }
  return node.isEndOfWord;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.searchInNode(word, this.root);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
