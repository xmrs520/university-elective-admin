<template>
  <div class="StudentHome-container">
    <div class="containers">
      <el-backtop
        target=".containers"
        :bottom="100"
      >
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
          UP
        </div>
      </el-backtop>

      <el-carousel
        class="car"
        height="50vh"
        :interval="1500"
        indicator-position="outside"
      >
        <el-carousel-item
          v-for="item in 3"
          :key="item"
        >
        </el-carousel-item>
      </el-carousel>

      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span> <i class="el-icon-s-opportunity"></i><strong>通知 </strong></span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          ><i class="el-icon-message-solid"></i></el-button>
        </div>
        <div class="text">
          开始选课啦
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentHome',
  components: {},
  data () {
    return {

    }
  },
  methods: {}
}
</script>
<style scoped lang='less'>
.StudentHome-container {
  .containers {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
    .car {
      padding-top: 20px;
    }
  }
  height: 100vh;
  background-color: #f2f6fc;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-of-type(1) {
  background: url('../../../assets/5.jpg') no-repeat;
  background-size: cover;
}

.el-carousel__item:nth-of-type(2) {
  background: url('../../../assets/3.jpg') no-repeat;
  background-size: cover;
}

.el-carousel__item:nth-of-type(3) {
  background: url('../../../assets/6.jpg') no-repeat;
  background-size: cover;
}

.text {
  font-size: 14px;
}

.box-card {
  margin-top: 30px;
}
</style>
