// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

// Example 1:

// Input: root = [4,2,6,1,3] Output: 1

// Example 2:

// Input: root = [1,0,48,null,null,12,49] Output: 1

// Constraints:

// The number of nodes in the tree is in the range [2, 104].

// 0 <= Node.val <= 105

// Note: This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

// ​

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
 * @return {number}
 */
var getMinimumDifference = function (root) {
  const dfs = (node, left, right) => {
    if (!node) return right - left;
    const leftVal = dfs(node.left, left, node.val);
    const rightVal = dfs(node.right, node.val, right);
    return Math.min(leftVal, rightVal);
  };
  return dfs(root, -Infinity, Infinity);
};

var getMinimumDifference = function (root) {
  let values = [];
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    values.push(node.val);
    dfs(node.right);
  };
  dfs(root);
  let minVal = Infinity;
  for (let i = 1; i < values.length; i++) {
    minVal = Math.min(minVal, values[i] - values[i - 1]);
  }

  return minVal;
};
