// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:

// Input: nums = [1,2,3,4,5,6,7], k = 3 Output: [5,6,7,1,2,3,4] Explanation: rotate 1 steps to the right: [7,1,2,3,4,5,6] rotate 2 steps to the right: [6,7,1,2,3,4,5] rotate 3 steps to the right: [5,6,7,1,2,3,4]

// Example 2:

// Input: nums = [-1,-100,3,99], k = 2 Output: [3,99,-1,-100] Explanation: rotate 1 steps to the right: [99,-1,-100,3] rotate 2 steps to the right: [3,99,-1,-100]

// Constraints:

// 1 <= nums.length <= 105

// -231 <= nums[i] <= 231 - 1

// 0 <= k <= 105

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k = k % nums.length;
  const len = nums.length;
  nums.reverse();
  rotateElement(nums, k, len - 1); // 여기서 nums.length - 1 이 적용이 되지 않아 새로 할당을 해서 넣어줬다.
  rotateElement(nums, 0, k - 1);
};
var rotateElement = function (arr, i, j) {
  while (i < j) {
    let target = arr[i];
    arr[i] = arr[j];
    arr[j] = target;
    i++;
    j--;
  }
};

// shift
// pop
// push
// 1. 리버스 [7,6,5,4,3,2,1]
// 2. push [7,6,5,4,3,2,1,7]
// 3. shift [6,5,4,3,2,1,7]
// 4. k번 반복
// 5. [4,3,2,1,7,6,5]
// 6. 리버스
