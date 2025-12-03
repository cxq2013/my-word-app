<template>
  <div class="flashcard-container">
    <div class="flashcard" @click="toggleShowMeaning">
      <div class="card-content">
        <h2 v-if="!showMeaning" class="word">{{ currentWord.word }}</h2>
        <div v-else class="meaning">
          <h3>{{ currentWord.word }}</h3>
          <p class="meaning-text">{{ currentWord.meaning }}</p>
          <p class="example">{{ currentWord.example }}</p>
        </div>
      </div>
    </div>

    <div class="buttons" v-if="showMeaning">
      <button class="btn btn-known" @click="handleKnown">认识</button>
      <button class="btn btn-unknown" @click="handleUnknown">不认识</button>
    </div>

    <div class="progress">
      <p>第 {{ currentIndex + 1 }} / {{ wordList.length }} 个单词</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { wordList } from '../data/word'

interface Word {
  id: number
  word: string
  meaning: string
  example: string
}

interface ReviewPlan {
  today: number[]
  tomorrow: number[]
  day3: number[]
}

const showMeaning = ref(false)
const currentIndex = ref(0)
const currentWord = ref<Word>(wordList[0])

// 切换显示单词或释义
const toggleShowMeaning = () => {
  showMeaning.value = !showMeaning.value
}

// 处理"认识"按钮点击
const handleKnown = () => {
  saveReviewRecord(currentWord.value.id, 'known')
  nextWord()
}

// 处理"不认识"按钮点击
const handleUnknown = () => {
  saveReviewRecord(currentWord.value.id, 'unknown')
  nextWord()
}

// 切换到下一个单词
const nextWord = () => {
  showMeaning.value = false
  currentIndex.value = (currentIndex.value + 1) % wordList.length
  currentWord.value = wordList[currentIndex.value]
}

// 保存学习记录到localStorage
const saveReviewRecord = (wordId: number, status: 'known' | 'unknown') => {
  // 获取当前复习计划
  const reviewPlanStr = localStorage.getItem('reviewPlan')
  let reviewPlan: ReviewPlan

  if (reviewPlanStr) {
    reviewPlan = JSON.parse(reviewPlanStr)
  } else {
    // 如果没有复习计划，创建一个新的
    reviewPlan = {
      today: [],
      tomorrow: [],
      day3: [],
    }
  }

  // 根据学习状态更新复习计划
  if (status === 'unknown') {
    // 不认识的单词需要明天复习
    if (!reviewPlan.tomorrow.includes(wordId)) {
      reviewPlan.tomorrow.push(wordId)
    }
  } else {
    // 认识的单词3天后复习
    if (!reviewPlan.day3.includes(wordId)) {
      reviewPlan.day3.push(wordId)
    }
  }

  // 保存到localStorage
  localStorage.setItem('reviewPlan', JSON.stringify(reviewPlan))

  // 也保存学习历史
  const learningHistoryStr = localStorage.getItem('learningHistory')
  const learningHistory: {
    [key: string]: { wordId: number; status: 'known' | 'unknown'; timestamp: number }[]
  } = learningHistoryStr ? JSON.parse(learningHistoryStr) : {}

  const today = new Date().toISOString().split('T')[0]
  if (!learningHistory[today]) {
    learningHistory[today] = []
  }

  learningHistory[today].push({
    wordId,
    status,
    timestamp: Date.now(),
  })

  localStorage.setItem('learningHistory', JSON.stringify(learningHistory))
}

// 组件挂载时初始化
onMounted(() => {
  // 可以在这里添加从localStorage加载学习记录的逻辑
  console.log('闪卡组件已加载')
})
</script>

<style scoped>
.flashcard-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.flashcard {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flashcard:hover {
  transform: translateY(-5px);
}

.card-content {
  width: 100%;
}

.word {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

.meaning h3 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.meaning-text {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 1rem;
}

.example {
  font-size: 1.2rem;
  color: #888;
  font-style: italic;
}

.buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-known {
  background-color: #4caf50;
  color: white;
}

.btn-known:hover {
  background-color: #45a049;
}

.btn-unknown {
  background-color: #f44336;
  color: white;
}

.btn-unknown:hover {
  background-color: #da190b;
}

.progress {
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #666;
}
</style>
