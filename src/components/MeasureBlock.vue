<template>
  <div class="measure">
    <img :src="MeasureMain" class="measure-main" />
    <div class="measure-wrapper">
      <img :src="currentImage" class="measure-scale" />
      <img :src="Prize" class="prize" />
      <img :src="Glow" :class="props.currentDivision === 8 ? 'glow-active' : 'glow-hidden'" />
    </div>
  </div>
</template>

<script setup>
  import EmptyMesureScale from '@/assets/measure_scale.png'
  import MesureScale_1 from '@/assets/measure_scale1.png'
  import MesureScale_2 from '@/assets/measure_scale2.png'
  import MesureScale_3 from '@/assets/measure_scale3.png'
  import MesureScale_4 from '@/assets/measure_scale4.png'
  import MesureScale_5 from '@/assets/measure_scale5.png'
  import MesureScale_6 from '@/assets/measure_scale6.png'
  import MesureScale_7 from '@/assets/measure_scale7.png'
  import MesureScale_8 from '@/assets/measure_scale8.png'
  import Glow from '@/assets/layer_glow.png'
  import Prize from '@/assets/prize.png'
  import MeasureMain from '@/assets/measure_main.png'
  import { computed } from 'vue'

  const props = defineProps({
    currentDivision: {
      type: Number,
      required: true
    }
  })
  const measureImages = {
    0: EmptyMesureScale,
    1: MesureScale_1,
    2: MesureScale_2,
    3: MesureScale_3,
    4: MesureScale_4,
    5: MesureScale_5,
    6: MesureScale_6,
    7: MesureScale_7,
    8: MesureScale_8
  }
  const currentImage = computed(() => measureImages[props.currentDivision])
</script>

<style scoped>
  .measure {
    height: 65%;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    position: relative;
  }

  .measure-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
  }

  .measure-main {
    object-fit: cover;
  }

  .measure-scale {
    height: 100%;
  }

  .prize {
    width: 68px;
    height: 68px;
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .glow-active {
    display: block;
    width: 123px;
    height: 123px;
    position: absolute;
    top: -14px;
    z-index: 1;
    transform: rotate(-135deg);
    animation: glowShadow 1s infinite, glow 1s;
  }
  .glow-hidden {
    display: none;
  }
  @keyframes glowShadow {
    0% {
      filter: drop-shadow(0 0 2px gold);
    }
    50% {
      filter: drop-shadow(0 0 10px gold) brightness(1.3);
    }
    100% {
      filter: drop-shadow(0 0 2px gold);
    }
  }
  @keyframes glow {
    0% {
      transform: scale(0) rotate(-135deg);
    }
    100% {
      transform: scale(1) rotate(-135deg);
    }
  }
</style>
