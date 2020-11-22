<template>

  <el-menu
    class="nav-menu"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="iconfont iconhome"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/course">
      <i class="el-icon-document"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="/selection">
      <i class="el-icon-setting"></i>
      <span slot="title">选课管理</span>
    </el-menu-item>
    <el-menu-item index="/comments">
      <i class="iconfont iconmessage-square"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/personal">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>

</template>

<script>
export default {
  name: 'AppAside',
  props: [
    'is-collapse'
  ],
  data () {
    return {
      // isCollapse: true
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.nav-menu {
  .iconfont {
    margin-right: 5px;
    padding-left: 5px;
  }
}
</style>
