<script setup lang="ts">
import Flashcard from './components/Flashcard.vue';
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">单词闪卡</h1>
    <Flashcard />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.app-title {
  margin-bottom: 2rem;
  color: #333;
  font-size: 2.5rem;
  text-align: center;
}
</style>
