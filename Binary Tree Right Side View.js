// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// Example 1:

// Input: root = [1,2,3,null,5,null,4] Output: [1,3,4]

// Example 2:

// Input: root = [1,null,3] Output: [1,3]

// Example 3:

// Input: root = [] Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].

// -100 <= Node.val <= 100

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  let result = [];
  let maxDepth = -1;

  const dfs = (node, depth) => {
    if (!node) return;

    if (depth > maxDepth) {
      result.push(node.val);
      maxDepth = depth;
    }
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  };

  dfs(root, 0);

  return result;
};
var rightSideView = function (root) {
  const rightValues = []; // return most right values array

  traverse(root, 0, rightValues); // recursion call start from level 0

  //after recursive completed return the rightValues array
  return rightValues;
};

const traverse = (root, level, rightValues) => {
  if (root === null) return; // if root is null then just return it

  //check if there is no value store at this level (the level will represent the index number of the return array), if it is true then we want to add that value to our 'rightValues' array
  //if there is an element at particular index then we will just ignore it
  if (rightValues.length === level) {
    rightValues.push(root.val);
  }

  // always add root.right first because we want to find the most righty nodes AND always increment level by 1
  traverse(root.right, level + 1, rightValues);
  traverse(root.left, level + 1, rightValues);
};
