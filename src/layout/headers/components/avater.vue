<template>
   <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="50" :src="squareUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const squareUrl = ref('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F9d%2Fc2%2Fdd%2F9dc2ddda0a69053caa0ef363c0c0bc25.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651890510&t=ab1d47a2df6f34b55f7d208f10cfdecc')

const logout = () => {
  store.dispatch('app/logout')
}
</script>

<style lang='scss' scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>