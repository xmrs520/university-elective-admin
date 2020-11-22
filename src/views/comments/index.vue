<template>
  <div class="conmments-container">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <strong><span>评论</span></strong>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        >操作按钮</el-button>
      </div>
      <el-timeline>
        <el-timeline-item
          timestamp="2018/4/12"
          placement="top"
        >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          timestamp="2018/4/3"
          placement="top"
        >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          timestamp="2018/4/2"
          placement="top"
        >
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

  </div>
</template>
<script>
export default {
  name: 'ConmmentsIndex',
  components: {},
  data () {
    return {

    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
</style>
