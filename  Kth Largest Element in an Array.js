// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2 Output: 5

// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4 Output: 4

// Constraints:

// 1 <= k <= nums.length <= 105

// -104 <= nums[i] <= 104

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._heapifyUp();
  }
  pop() {
    if (this.heap.length === 0) return null;
    [this.heap[0], this.heap[this.heap.length - 1]] = [
      this.heap[this.heap.length - 1],
      this.heap[0],
    ];
    const poppedValue = this.heap.pop();
    this._heapifyDown();
    return poppedValue;
  }

  peek() {
    return this.heap[0];
  }

  _heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  _heapifyDown() {
    let index = 0;
    while (2 * index + 1 < this.heap.length) {
      let smallerChildIndex = 2 * index + 1;
      if (
        2 * index + 2 < this.heap.length &&
        this.heap[2 * index + 2] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = 2 * index + 2;
      }
      if (this.heap[index] <= this.heap[smallerChildIndex]) break;
      [this.heap[index], this.heap[smallerChildIndex]] = [
        this.heap[smallerChildIndex],
        this.heap[index],
      ];
      index = smallerChildIndex;
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = (nums, k) => {
  const minHeap = new MinHeap();
  for (let num of nums) {
    minHeap.push(num);
    if (minHeap.heap.length > k) {
      minHeap.pop();
    }
  }
  return minHeap.peek();
};
