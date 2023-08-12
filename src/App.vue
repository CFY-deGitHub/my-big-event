<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div>
    <el-config-provider :locale="zhCn">
      <!-- App.vue 只需要留一个路由出口 router-view 即可 -->
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
