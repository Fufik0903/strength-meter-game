module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true // Добавьте эту строку
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
  globals: {
    defineProps: 'readonly', // Или это
    defineEmits: 'readonly'
  }
}
