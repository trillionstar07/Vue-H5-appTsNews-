<template>
  <div>
    <!-- 无需缓存的一级路由的页面写在exclude中 -->
    <keep-alive exclude="Search,SearchResult,myDetail,UserEdit">
       <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
