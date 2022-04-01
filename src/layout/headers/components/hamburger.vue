<template>
  <div class="hamburger-container">  
    <svg-icon :icon="icon" @click="toggleClick"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
const icon = computed(() => {
  return store.getters.siderType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang='scss' scoped>
.hamburger-container{
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>