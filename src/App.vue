<template>
  <div class="container">
    <MeasureBlock :current-division="currentDivision" />
    <GameBlock @updateData="changeMeasure" />
  </div>
</template>

<script setup>
  import MeasureBlock from './components/MeasureBlock.vue'
  import GameBlock from './components/GameBlock.vue'
  import { ref } from 'vue'

  const currentDivision = ref(0)
  const total = 100
  const divisions = 8
  const divisionCount = total / divisions
  const changeMeasure = (data) => {
    if (data < 0 || data >= total) return null
    currentDivision.value = Math.round(data / divisionCount)

    console.log(data, currentDivision.value)
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  #app {
    height: 100vh;
    overflow: hidden;
    background-image: url('@/assets/bg_top.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    padding-bottom: max(40px, constant(safe-area-inset-bottom));
    padding-bottom: max(40px, env(safe-area-inset-bottom));
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    gap: 6px;
    padding-top: 26%;
  }
  .test {
    display: flex;
    flex-grow: 1;
    height: 100%;
    padding-top: 13%;
  }
</style>
