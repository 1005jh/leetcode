// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.

// Example 1:

// Input: root = [3,9,20,null,null,15,7] Output: [3.00000,14.50000,11.00000] Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11. Hence return [3, 14.5, 11].

// Example 2:

// Input: root = [3,9,20,15,7] Output: [3.00000,14.50000,11.00000]

// Constraints:

// The number of nodes in the tree is in the range [1, 104].

// -231 <= Node.val <= 231 - 1

var averageOfLevels = function (root) {
  const sum = [];
  const count = [];

  const dfs = (node, level) => {
    if (!node) return;

    sum[level] = (sum[level] || 0) + node.val;
    count[level] = (count[level] || 0) + 1;

    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  dfs(root, 0);

  const averages = [];
  for (let i = 0; i < sum.length; i++) {
    averages.push(sum[i] / count[i]);
  }

  return averages;
};

var averageOfLevels = function (root) {
  let q = [root],
    ans = [];
  while (q.length) {
    let qlen = q.length,
      row = 0;
    for (let i = 0; i < qlen; i++) {
      let curr = q.shift();
      row += curr.val;
      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }
    ans.push(row / qlen);
  }
  return ans;
};
