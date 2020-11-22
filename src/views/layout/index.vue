<template>
  <!-- <div class="layout-container">
    <div>顶部</div>

    <div>测</div>
    子路由出口
    <router-view />
  </div> -->
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <app-aside
        class="aside-menu"
        :is-collapse="isCollapse"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-d-arrow-left':isCollapse,
              'el-icon-d-arrow-right':!isCollapse
              }"
            @click="isCollapse =! isCollapse"
          ></i>
          <span> 武汉晴川学院 公共课 选课系统 后台管理</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="onlogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <el-backtop
          target=".main"
          :bottom="100"
        >
          <div style="{
        height: 100%;
        width: 100%;
        background-color: rgb(245 209 90);
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
            UP
          </div>
        </el-backtop>
        <!-- 路由出口 -->
        <router-view />

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
// import Bus from '@/EventBus.js'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  data () {
    return {
      user: {// 当前登录用户信息
      },
      isCollapse: false
    }
  },
  // beforeDestroy () {
  //   Bus.$off('getUserId')
  // },
  created () {
    this.loadUserProfile()// 获取用户信息
    // Bus.$on('getUserId', msg => {
    //   this.messsge.id = msg
    //   console.log('收到bus消息')
    // })
  },
  methods: {
    loadUserProfile () { // 获取用户信息
      getUserProfile().then(res => {
        this.user = res.data[0]
      })
    },
    onlogout () {
      this.$confirm('退出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.sessionStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  // background-color: #b3c0d1;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.main {
  background-color: #e9eef3;
}

.avatar-wrap {
  display: flex;
  align-items: center;
}
</style>
