<template>
  <div class="game-block-container">
    <StrengthScale :hit-power="hitPower" />
    <div class="game-content">
      <div class="game-tools">
        <div class="game-button">
          <img :src="currentButton" />
        </div>
        <div ref="hammerRef" class="game-hammer">
          <img src="@/assets/hammer.png" />
        </div>
      </div>
      <div class="game-start">
        <div class="game-text">
          <span v-if="gameStatus == `new`"> Привет!<br />проверим твою силу! </span>
          <span v-else-if="gameStatus == `playing`"> Жми на кнопку в нужный момент! </span>
          <span v-else-if="gameStatus == `result` && resultScore < 95">
            Неплохо! Попробуй ещё раз.
          </span>
          <span v-else-if="gameStatus == `result` && resultScore >= 95">
            ВОТ ЭТО СИЛА!<br />
            Ты&nbsp;выбил&nbsp;главный&nbsp;приз!<br />
            <span :style="{ color: '#ff4646' }">Рубин</span>
          </span>
        </div>
        <button v-if="gameStatus == `playing`" class="game-button_" @click="handleClickHit">
          Удар
        </button>
        <button
          v-if="gameStatus == `new` || gameStatus === `result`"
          class="game-button_"
          @click="handleClickNewGame"
        >
          новая игра
        </button>
      </div>
    </div>
    <RobotBlock :image-url="imageUrl" />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import RobotBlock from './RobotBlock.vue'
  import StrengthScale from './StrengthScale.vue'
  import buttonDefault from '@/assets/button.png'
  import buttonActive from '@/assets/button_active.png'
  import Robot1 from '@/assets/robot_1.png'
  import Robot2 from '@/assets/robot_2.png'
  import Robot3 from '@/assets/robot_3.png'

  const gameStatus = ref('new')
  const hitPower = ref(0)
  const hitResult = ref(0)
  const resultScore = ref(0)
  const currentButton = ref(buttonDefault)
  const hammerRef = ref(null)
  let gameInterval = null
  let animationFrame = null
  const emit = defineEmits(['updateData'])
  // Выбор картинки робота
  const imageUrl = computed(() => {
    if (hitResult.value >= 95) return Robot3
    if (hitResult.value > 0) return Robot2
    return Robot1
  })
  // функция нажатия на кнопку "Новая игра"
  function handleClickNewGame() {
    gameStatus.value = 'playing'
    currentButton.value = buttonDefault
    hitResult.value = 0
    hitPower.value = 0
    emit('updateData', hitResult.value)
    animateHummer({
      value1: 'translate(10px, -10px) rotate(-43.16deg)',
      value2: 'translate(10px, -10px) rotate(0deg)'
    })
    // задержка для обновления отображения шкалы. опционально
    setTimeout(() => {
      gameLoop()
    }, 300)
  }
  // функция нажатия на кнопку "Удар"
  function handleClickHit() {
    const currentPower = hitPower.value
    hitResult.value = currentPower
    gameStatus.value = 'result'
    currentButton.value = buttonActive
    if (gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }

    animateHummer({
      value1: 'translate(10px, -10px) rotate(0deg)',
      value2: 'translate(-50px, -30px) rotate(-90deg)'
    })
    // таймаут для последовательности анимации (удар молота - изменение шкалы)
    setTimeout(() => {
      emit('updateData', hitResult.value)
    }, 500)
  }
  // функция игрового цикла
  function gameLoop() {
    let direction = 1
    function animate() {
      if (gameStatus.value !== 'playing') return
      let change = Math.random() * 3 * direction
      hitPower.value += change
      if (hitPower.value >= 100) {
        hitPower.value = 98
        direction = -1
      } else if (hitPower.value <= 0) {
        hitPower.value = 0
        direction = 1
      }
      if (Math.random() < 0.05) {
        direction *= -1
      }

      requestAnimationFrame(animate)
    }
    animate()
  }
  // функция анимации молота
  function animateHummer(animationValues) {
    const hammer = hammerRef.value
    const { value1, value2 } = animationValues
    if (!hammer || !animationValues) return
    hammer.getAnimations().forEach((anim) => anim.cancel())
    hammer.animate([{ transform: value1 }, { transform: value2 }], {
      duration: 500,
      fill: 'forwards',
      easing: 'ease-out'
    })
  }
</script>

<style scoped>
  .game-block-container {
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: space-between;
    gap: 5%;
    align-items: end;
    padding: 0px 3.5% 13px 6.5%;
    box-sizing: border-box;
  }
  .game-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .game-tools {
    position: relative;
  }
  .game-start {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 12px;
    align-items: center;
    padding-top: 5px;
  }
  .game-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .game-button img {
    width: 75%;
  }
  .game-hammer {
    width: 75%;
    position: absolute;
    top: -40px;
    right: -55px;
    transform: rotate(-43.16deg);
  }
  .game-hammer img {
    width: 100%;
  }
  .game-text {
    color: white;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Roboto';
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
  }
  .game-button_ {
    width: 100%;
    height: 36px;
    color: white;
    background: #ff42e0;
    border: 1px solid white;
    font-size: 14px;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: 0;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Roboto';
    border-radius: 4px;
  }
</style>
