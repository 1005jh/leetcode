// Given an array of positive integers nums and a positive integer target, return the minimal length of a

// subarray

//  whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:

// Input: target = 7, nums = [2,3,1,2,4,3] Output: 2 Explanation: The subarray [4,3] has the minimal length under the problem constraint.

// Example 2:

// Input: target = 4, nums = [1,4,4] Output: 1

// Example 3:

// Input: target = 11, nums = [1,1,1,1,1,1,1,1] Output: 0

// Constraints:

// 1 <= target <= 109

// 1 <= nums.length <= 105

// 1 <= nums[i] <= 104

// Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let right = 0;
  let minLength = Infinity;
  let sum = nums[left];
  while (left <= right && right < nums.length) {
    if (sum < target) {
      right++;
      sum += nums[right];
    } else if (target <= sum) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return minLength === Infinity ? 0 : minLength;
};
// 끝까지 더하면서 간다.
// target보다 높으면 가장 첫번째 값 빼고 left++
// target보다 작으면 rigt++ 후 nums[right] 더해주기
// sum이 target보다 클 때 최소값을 계속 갱신해준다.
// 조건은 right가 nums.length를 넘으면 안된다.
