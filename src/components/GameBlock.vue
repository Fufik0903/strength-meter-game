<template>
  <div class="game-block-container">
    <StrengthScale :fillHeight="fillHeight" />
    <div class="game-content">
      <div class="game-tools">
        <div class="game-button">
          <img :src="currentButton" />
        </div>
        <div class="game-hammer" ref="hammerRef">
          <img src="@/assets/hammer.png" />
        </div>
      </div>
      <div class="game-start">
        <div class="game-text">
          <span v-if="isStartActiveButton && !isHitButtonActive">
            Привет!<br />проверим твою силу!
          </span>
          <span v-else-if="isHitButtonActive && !isStartActiveButton">
            Жми на кнопку в нужный момент!
          </span>
          <span v-else-if="isHitButtonActive && isStartActiveButton && count < 94">
            Неплохо! Попробуй ещё раз.
          </span>
          <span v-else-if="isHitButtonActive && isStartActiveButton && count >= 94">
            ВОТ ЭТО СИЛА!<br />
            Ты&nbsp;выбил&nbsp;главный&nbsp;приз!<br />
            <span :style="{ color: '#ff4646' }">Рубин</span>
          </span>
        </div>
        <button
          class="game-button_"
          @click="handleClickHit"
          v-if="isHitButtonActive && !isStartActiveButton"
        >
          Удар
        </button>
        <button class="game-button_" @click="handleClickNewGame" v-if="isStartActiveButton">
          новая игра
        </button>
      </div>
    </div>
    <RobotBlock :imageUrl="imageUrl" />
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

  const isStartActiveButton = ref(true)
  const isHitButtonActive = ref(false)
  const count = ref(0)
  const fillHeight = ref(0)
  const currentButton = ref(buttonDefault)
  const hammerRef = ref(null)

  let gameInterval = null
  let animationFrame = null
  let targetValue = 0
  const emit = defineEmits(['updateData'])
  const imageUrl = computed(() => {
    if (count.value >= 95) return Robot3
    if (count.value > 0) return Robot2
    return Robot1
  })

  function handleClickNewGame() {
    isStartActiveButton.value = false
    isHitButtonActive.value = true
    count.value = 0
    fillHeight.value = 0
    targetValue = 0
    currentButton.value = buttonDefault

    emit('updateData', count.value)
    const hammer = hammerRef.value
    if (!hammer) return
    hammer.getAnimations().forEach((anim) => anim.cancel())
    hammer.animate(
      [
        { transform: 'translate(10px, -10px) rotate(-43.16deg)' },
        { transform: 'translate(10px, -10px) rotate(0deg)' }
      ],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-out'
      }
    )
    gameLoop()
  }
  function handleClickHit() {
    isHitButtonActive.value = true
    isStartActiveButton.value = true

    if (gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }

    const hammer = hammerRef.value
    if (!hammer) return

    hammer.animate(
      [
        { transform: 'translate(10px, -10px) rotate(0deg)' },
        { transform: 'translate(-50px, -30px) rotate(-90deg)' }
      ],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'ease-in'
      }
    )

    emit('updateData', count.value)
    setTimeout(() => {
      currentButton.value = buttonActive
    }, 500)
  }

  function gameLoop() {
    if (gameInterval) clearInterval(gameInterval)
    if (animationFrame) cancelAnimationFrame(animationFrame)
    gameInterval = setInterval(() => {
      if (isHitButtonActive.value && !isStartActiveButton.value) {
        targetValue = 95 //Math.round(Math.random() * 100)
        fillHeight.value = targetValue - 4
      }
    }, 300)
    function animate() {
      if (isHitButtonActive.value && !isStartActiveButton.value) {
        const diff = targetValue - count.value
        if (Math.abs(diff) > 0.5) {
          count.value += diff * 0.1
        } else {
          count.value = targetValue
        }
      }
      count.value = 95
      animationFrame = requestAnimationFrame(animate)
    }
    animate()
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
