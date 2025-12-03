/*
 * @Descripttion: 
 * @version: 
 * @Author: cxq
 * @Date: 2025-12-03 16:07:44
 * @LastEditors: cxq
 * @LastEditTime: 2025-12-03 16:07:48
 */

interface Word {
  id: number;
  word: string;
  meaning: string;
  example: string;
}

export const wordList: Word[] = [
  { id: 1, word: "abandon", meaning: "放弃", example: "He abandoned his car." },
  { id: 2, word: "benefit", meaning: "利益", example: "Exercise has many benefits." },
  { id: 3, word: "concentrate", meaning: "集中精力", example: "Concentrate on your work." },
  { id: 4, word: "commit", meaning: "承诺", example: "I will commit to doing this task." },
  { id: 5, word: "compromise", meaning: "妥协", example: "We had to compromise on some issues." },
  { id: 6, word: "contribute", meaning: "贡献", example: "She has made a significant contribution to the project." },
  { id: 7, word: "criticize", meaning: "批评", example: "Criticize the management for their inefficiency." },
  { id: 8, word: "demonstrate", meaning: "展示", example: "The company demonstrated its commitment to innovation." },
  { id: 9, word: "disappoint", meaning: "失望", example: "He disappointed me with his performance." },
  { id: 10, word: "discourage", meaning: "阻碍", example: "The project discourages new ideas." },
];