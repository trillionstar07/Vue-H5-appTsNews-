<template>
    <div>
        <!-- 一条文章单元格 -->
        <van-cell>
            <!-- 标题区域插槽 -->
            <template #title>
                <div class="title-box">
                    <!-- 标题 -->
                    <span>{{ artObj.title }}</span>
                    <!-- 单图 -->
                    <img
                      v-lazy="artObj.cover.images[0]"
                      v-if="artObj.cover.type === 1"
                      class="thumb"
                      />
                      <!-- <van-image
                        v-lazy="artObj.cover.images[0]"
                        v-if="artObj.cover.type === 1"
                        class="thumb"
                        >
                        <template v-slot:error>
                          图片走丢了>﹏<!
                        </template>
                      </van-image> -->
                </div>
                <!-- 多图 -->
                <div v-if="artObj.cover.type > 1" class="title-box">
                    <img
                        v-lazy="imgUrl"
                        :key="index"
                        v-for="(imgUrl,index) in artObj.cover.images"
                        class="thumb"
                        alt=""
                    />
                    <!-- <van-image
                        v-lazy="imgUrl"
                        :key="index"
                        v-for="(imgUrl,index) in artObj.cover.images"
                        class="thumb"
                        alt="">
                        <template v-slot:error>
                          图片走丢了>﹏<!
                        </template>
                      </van-image> -->
                </div>
            </template>
            <!-- label区域的插槽 -->
            <template #label>
                <div class="label-box">
                    <div>
                        <!-- <span>{{ artObj.aut_name }}</span> -->
                        <!-- <span>{{ artObj.comm_count }}</span> -->
                        <span>{{ formatTime(artObj.pubdate) }}</span>
                    </div>
                    <!-- 反馈按钮 -->
                    <van-icon name="cross" @click.stop="show = true" v-if="isShow"/>
                </div>
            </template>
        </van-cell>
        <!-- 反馈按钮x -->
        <van-action-sheet
        v-model="show"
        :actions="actions"
        :cancel-text="bottomText"
        @cancel="cancelFn"
        @closed="closeFn"
        @select="onSelect"
        get-container="body" />
    </div>
</template>

<script>
// 点击“反馈垃圾内容”后进行数据切换
// 1.监听用户点击的是哪一个
// 2.切换anctions数组里面的数据
import { timeAgo } from '@/utils/date.js'
import { fristActions, secondActions } from '@/api/report.js'
export default {
  props: {
    artObj: Object, // 文章对象
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false, // 反馈面板 显示/隐藏
      actions: fristActions,
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    onSelect (action, item) {
      // this.show = false
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        this.show = false
      } else { // 二级反馈选项
        this.$emit('reportEV', this.artObj.art_id, action.value)
        this.show = false
      }
    },
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true // 强制点击‘返回’不关闭弹窗
        this.actions = fristActions
        this.bottomText = '取消'
      }
    },
    // 关闭返回面板触发事件
    closeFn () {
      this.actions = fristActions
      this.bottomText = '取消'
    }
    // 如果van-cell该组件以后还要复用，则不再van-cell组件写点击事件
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
/* label样式 */
.label-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* 文章信息 */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
.thumb{
    width: 113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
}
.thumb-box{
    display: flex;
    justify-content: space-between;
}
</style>
