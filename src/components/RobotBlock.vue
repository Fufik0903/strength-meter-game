<template>
  <div class="robot">
    <img :src="imageUrl" />
  </div>
</template>
<script>
  export default { name: 'RobotBlock', props: ['imageUrl'] }
</script>
<style scoped>
  .robot {
    min-width: 90px;
    max-width: 90px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
  }
  .robot img {
    width: 100%;
    object-fit: cover;
  }
</style>
