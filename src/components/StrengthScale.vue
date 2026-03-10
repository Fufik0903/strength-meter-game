<template>
  <div class="scale-wrapper">
    <div class="scale">
      <div class="scale-flask">
        <img src="@/assets/scale.png" alt="Колба" />
      </div>
      <div class="scale-fill" :style="{ height: hitPower + '%' }" />
      <div class="scale-marks">
        <img src="@/assets/scale-1.png" alt="Шкала" />
      </div>
    </div>
  </div>
</template>
<script setup>
  defineProps({
    hitPower: {
      type: Number,
      required: true
    }
  })
</script>

<style scoped>
  .scale-wrapper {
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    box-sizing: border-box;
  }

  .scale {
    width: 48px;
    height: 150px;
    position: relative;
    box-sizing: border-box;
  }

  .scale-flask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .scale-flask img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .scale-fill {
    position: absolute;
    bottom: 2px;
    left: 5px;
    width: 38px;
    height: 0%;
    background: linear-gradient(180deg, #00d355, #00a03a);
    border-radius: 2px 2px 0 0;
    z-index: 2;
    transition: height 0.3s ease;
    box-sizing: border-box;
  }
  .scale-fill::before {
  }
  .scale-marks {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    pointer-events: none;
  }

  .scale-marks img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
</style>
