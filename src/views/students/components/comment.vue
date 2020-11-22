<template>
  <div class="StudentComment-container">
    <div class="containers">
      <el-card class="box-card">

        <el-calendar v-model="value">
        </el-calendar>
        <div>
          <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
          <el-divider></el-divider>
          <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentComment',
  components: {},
  data () {
    return {
      value: new Date()
    }
  },
  methods: {}
}
</script>
<style scoped lang='less'>
.StudentComment-container {
  .containers {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
  }
  height: 100vh;
  background-color: #f2f6fc;
}
</style>
