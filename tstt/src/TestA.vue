<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  async created () {
    // try+catch捕获await同步代码的错误
    try {
      const res = await getAllChannelsAPI()
      console.log(res)
    } catch (err) {
      console.dir(err)
    }
    const res = await getAllChannelsAPI()
    console.log(res)
  }
}
</script>

<style>
</style>
