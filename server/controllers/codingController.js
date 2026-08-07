import { evaluateCodeSubmission } from '../services/aiService.js';

export const runCode = async (req, res) => {
  try {
    const { language, code, title } = req.body;
    const result = await evaluateCodeSubmission({ language: language || 'javascript', code, title });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const submitCode = async (req, res) => {
  try {
    const { language, code, title } = req.body;
    const evaluation = await evaluateCodeSubmission({ language: language || 'javascript', code, title });
    
    const submission = {
      _id: 'sub_' + Date.now(),
      title: title || 'Two Sum Problem',
      language: language || 'javascript',
      code,
      passed: true,
      executionTimeMs: evaluation.executionTimeMs,
      memoryUsageMb: evaluation.memoryUsageMb,
      testResults: evaluation.testResults,
      aiFeedback: evaluation.aiFeedback,
      createdAt: new Date()
    };

    res.json({ success: true, submission });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCodingChallenges = async (req, res) => {
  const challenges = [
    {
      id: 'ch_1',
      title: 'Two Sum Problem',
      difficulty: 'Easy',
      category: 'Data Structures',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.',
      starterCode: {
        javascript: 'function twoSum(nums, target) {\n  // Write your optimal solution here\n  const map = new Map();\n  for(let i=0; i<nums.length; i++) {\n    const diff = target - nums[i];\n    if(map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}',
        python: 'def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []',
        cpp: '#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for(int i=0; i<nums.size(); i++) {\n        int diff = target - nums[i];\n        if(seen.count(diff)) return {seen[diff], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}',
        java: 'import java.util.HashMap;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[] { map.get(diff), i };\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}'
      }
    },
    {
      id: 'ch_2',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      description: 'Given a string `s` containing just characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
      starterCode: {
        javascript: 'function isValid(s) {\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for (let char of s) {\n    if (!map[char]) stack.push(char);\n    else if (stack.pop() !== map[char]) return false;\n  }\n  return stack.length === 0;\n}',
        python: 'def isValid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else "#"\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack',
        cpp: '// Implement stack validation in C++',
        java: '// Implement stack validation in Java'
      }
    }
  ];
  res.json({ success: true, challenges });
};
