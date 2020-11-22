<template>
  <div class="home-containsr">
    <el-backtop
      target=".home-containsr"
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
    <el-image :src="src">
      <div
        slot="placeholder"
        class="image-slot"
      >
        加载中<span class="dot">...</span>
      </div>
    </el-image>
    <el-calendar v-model="value">
    </el-calendar>

  </div>

</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  data () {
    return {
      value: new Date(),
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  }
}
</script>

<style scoped>
</style>
