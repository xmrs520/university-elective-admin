<template>
  <div class="home-container">
    <div class="nav">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item index="/students">首页</el-menu-item>
        <el-menu-item index="/student/coures">开始选课</el-menu-item>
        <el-menu-item index="/students/selection">选课管理</el-menu-item>
        <el-menu-item index="/students/comment">留言反馈</el-menu-item>

      </el-menu>
      <div class="nav-right">
        <el-dropdown>
          <div class="avatar-wrap">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <div>
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="personal = true">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="setPassword = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="onlogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-drawer
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="setPassword"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="set-form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="旧密码"
            prop="oldPass"
          >
            <el-input
              type="password"
              v-model="ruleForm.oldPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pass"
          >
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
          >
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm()"
            >提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-drawer>

    <el-drawer
      title="个人信息"
      :visible.sync="personal"
      direction="rtl"
      size="50%"
    >
      <el-table :data="userInfo">
        <el-table-column
          property="stu_id"
          label="学号"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
        ></el-table-column>
        <el-table-column
          property="sex"
          label="性别"
        ></el-table-column>
        <el-table-column
          property="major"
          label="专业"
        ></el-table-column>
        <el-table-column
          property="classes"
          label="班级"
        ></el-table-column>
        <el-table-column
          property="department"
          label="院系"
        ></el-table-column>
      </el-table>

    </el-drawer>

    <router-view></router-view>
  </div>
</template>

<script>
import { getUserProfile, setPassword } from '@/api/user'
export default {
  name: 'StudentsIndex',
  components: {},
  data () {
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      personal: false, // 个人中心
      setPassword: false, // 修改密码
      user: {// 当前登录用户信息
      },
      userInfo: [],
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        oldPass: [
          { validator: validatePass3, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.loadUserProfile()// 获取用户信息
  },
  methods: {
    loadUserProfile () { // 获取用户信息
      getUserProfile().then(res => {
        this.user = res.data[0]
        this.userInfo = res.data
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
    },
    handleClose (done) {
      this.$confirm('确定要退出吗？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    submitForm () {
      this.$refs['set-form'].validate((valid) => {
        if (valid) {
          setPassword(this.ruleForm).then((res) => {
            console.log(res)
          }).catch((err) => {
            if (err.response.status === 400) {
              this.$notify({
                title: '你的旧密码错了哦~',
                message: '密码错误警告',
                type: 'warning',
                position: 'top-left',
                duration: 3000
              })
            } else {
              this.$notify({
                title: '不要把密码告诉别人哦',
                type: 'success',
                message: '成功啦',
                position: 'top-left',
                duration: 3000
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs['set-form'].resetFields()
    }
  }

}
</script>

<style scoped lang="less">
.home-container {
  .nav {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
    position: relative;
  }

  .nav-right {
    position: absolute;
    top: 8px;
    right: 0;
    .avatar-wrap {
      display: flex;
      align-items: center;
    }
  }
}
</style>
