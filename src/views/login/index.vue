<template>

  <div class="login-container">
    <el-carousel
      height="100vh"
      :interval="3000"
      arrow="never"
    >
      <el-carousel-item
        v-for="item in 3"
        :key="item"
      >

      </el-carousel-item>
      <div class="form_space">
        <div align="center">
          <h1>武汉晴川学院</h1>
          <p>公共课 选课</p>
        </div>
        <div style="padding: 20px">
          <el-form
            class="login-form"
            ref="login-form"
            :model="user"
            :rules="formRules"
            status-icon
          >
            <el-form-item prop="id">
              <el-input
                v-model="user.id"
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="user.password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="role">
              <el-radio-group v-model="user.role">
                <el-radio
                  class="group"
                  :label="1"
                >学生</el-radio>
                <el-radio
                  class="group"
                  :label="2"
                >老师</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                @click="onLogin"
                :loading="loginLoading"
                icon="el-icon-right"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-carousel>

  </div>
</template>

<script>
export default {
  name: 'LoginIndex'
}
</script>

// 配置 Form 表单验证:
// 1、必须给el-from 组件绑定model为表单数据对象2、给需要验证的表单项el-form-item绑定 prop属性
// 注意: prop属性需要指定表单对象中的数据名称3、通过el-from组件的 rules属性配置验证规则
// 手动触发表单验证;
// 1、给el-form设置ref 起个名字（随便起名，不要重复即可)2、通过ref 获el-form 组件，调用组件的 validate 进行验证

<script>
import { login } from '@/api/user'
// import Bus from '@/EventBus.js'
export default {
  data () {
    return {
      user: {
        id: '',
        password: '',
        role: 0 // 1学生 2老师 0管理员
      },
      // checked: false,//是否学生
      loginLoading: false,// 登录等待，慢网
      formRules: {
        id: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 6, max: 11, message: '用户名格式错误', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        role: [
          {
            // 自定义校验规则
            // 验证通过:callback()
            // 验证失败:callback( new Error(‘错误消息'))
            validator: (rule, value, callback) => {
              //console.log(value);
              if (value !== 0) {
                callback()
              } else {
                callback(new Error('请选择用户'))
              }
            },
            // message: '请选择用户',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // beforeDestry () {
    //   console.log('发送')
    //   //Bus.$emit('getUserId', this.user.id)
    // },
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）

      // 表单验证
      // validate方法是异步的

      this.$refs['login-form'].validate((valid, err) => {
        // 如果表单验证失败,停止请求提交
        if (!valid) {
          return
        }

        // 验证通过,请求登录
        this.login()
      })

    },

    login () {
      // 开启登陆中·loading...
      this.loginLoading = true

      login(this.user)
        .then((res) => {
          // console.log(res)
          // 登录成功
          this.$message({// 消息提示
            showClose: true,
            message: '登陆成功',
            type: 'success'
          })

          // 关闭 loading
          this.loginLoading = false

          // 保存登录状态
          const saveUser = {
            userId: this.user.id,
            userRole: this.user.role,
            token: res.data.token
          }

          window.sessionStorage.setItem('user', JSON.stringify(saveUser))

          // 跳转到到管理员
          if (res.data.data.role == 0) {
            this.$router.push({
              name: 'home'
            })
            // 跳转到到学生页面
          } else if (res.data.data.role == 1) {
            this.$router.push({
              name: 'students'
            })
          } else {// 跳转到到老师页面
            this.$router.push({
              name: 'teachers'
            })
          }
        })
        .catch((err) => {
          console.log('登录失败', err)

          this.$message({// 消息提示
            showClose: true,
            message: '登录失败，用户名或者密码出错!',
            type: 'error'
          });
          this.loginLoading = false
        })
    }
  }
}
</script>
<style scoped lang='less'>
h1 {
  color: #fff;
}
p {
  color: #fff;
}
.group {
  color: #fff;
}
.login-container {
  .form_space {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: rgba(155, 147, 147, 0.5);
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 400px;
    width: 400px;
    .login-btn {
      width: 100%;
    }
  }
}
.el-carousel__item:nth-child(1) {
  background: url('../../assets/1.jpg') no-repeat;
  background-size: cover;
  z-index: -99;
}
.el-carousel__item:nth-child(2) {
  background: url('../../assets/4.jpg') no-repeat;
  background-size: cover;
  z-index: -99;
}
.el-carousel__item:nth-child(3) {
  background: url('../../assets/5.jpg') no-repeat;
  background-size: cover;
  z-index: -99;
}
</style>
