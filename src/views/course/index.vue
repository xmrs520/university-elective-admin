<template>
  <div class="course-container">
    <!-- 添加课程 -->
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>添加课程</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        >操作按钮</el-button>
      </div>
      <el-form
        class="add-Course-form"
        ref="add-Course-form"
        :rules="addCourseFormRules"
        :model="addCourseFrom"
        status-icon
        label-width="100px"
      >
        <el-form-item
          label="课程号"
          prop="id"
        >
          <el-input
            v-model="addCourseFrom.id"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="课程名"
          prop="coursename"
        >
          <el-input
            v-model="addCourseFrom.coursename"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="教师编号"
          prop="teacher_id"
        >
          <el-input
            v-model="addCourseFrom.teacher_id"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item
          label="教师名"
          prop="teacher"
        >
          <el-input
            v-model="addCourseFrom.teacher"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="院系"
          prop="department"
        >
          <el-input
            v-model="addCourseFrom.department"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="人数限制"
          prop="numberlimit"
        >
          <el-input
            v-model="addCourseFrom.numberlimit"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%;"
            type="primary"
            :loading="loginLoading"
            @click="submitAddCourse()"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加课程限选 -->
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>添加课程限选</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        >操作按钮</el-button>
      </div>
      <el-form
        class="add-Course-Limit-form"
        ref="add-Course-Limit-form"
        :rules="addCourseLimitFormRules"
        :model="addCourseLimitFrom"
        status-icon
        label-width="100px"
      >
        <el-form-item
          label="课程号"
          prop="id"
        >
          <el-input
            v-model="addCourseLimitFrom.id"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="限选专业"
          prop="majorlimit"
        >
          <el-input
            v-model="addCourseLimitFrom.majorlimit"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="限选班级"
          prop="classlimit"
        >
          <el-input
            v-model.number="addCourseLimitFrom.classlimit"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width:100%;"
            type="primary"
            :loading="loginLoading"
            @click="submitAddCourseLimit()"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {
  addCourse, // 添加课程
  addCourseLimit // 添加课程限选
} from '@/api/admin'
export default {
  name: 'CourseIndex',
  components: {},
  data () {
    return {
      addCourseFrom: {
        id: '',
        coursename: '',
        teacher_id: '',
        teacher: '',
        department: '',
        numberlimit: ''
      },
      addCourseLimitFrom: {
        id: '',
        majorlimit: '',
        classlimit: ''
      },
      loginLoading: false,
      addCourseFormRules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'change' },
          { min: 4, max: 12, message: 'ID格式错误', trigger: 'change' }
        ],
        coursename: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        teacher_id: [
          { required: true, message: 'ID不能为空', trigger: 'change' },
          { min: 4, max: 12, message: 'ID格式错误', trigger: 'change' }
        ],
        teacher: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        department: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        numberlimit: [
          { required: true, message: '不能为空', trigger: 'change' }
        ]
      },
      addCourseLimitFormRules: {
        id: [
          { required: true, message: 'ID不能为空', trigger: 'change' },
          { min: 4, max: 12, message: 'ID格式错误', trigger: 'change' }
        ],
        majorlimit: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        classlimit: [
          { required: true, message: '不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitAddCourse () {
      this.$refs['add-Course-form'].validate((valid, err) => {
        // 如果表单验证失败,停止请求提交
        if (!valid) {
          return
        }
        addCourse(this.addCourseFrom).then(res => {
          this.$message({
            showClose: true,
            message: '登陆成功',
            type: 'success'
          })
          this.loginLoading = false
        }).catch((err) => {
          console.log('失败', err)
          this.$message({
            showClose: true,
            message: '失败出错!',
            type: 'error'
          })
          this.loginLoading = false
        })
      })
    },
    submitAddCourseLimit () {
      this.$refs['add-Course-Limit-form'].validate((valid, err) => {
        // 如果表单验证失败,停止请求提交
        if (!valid) {
          return
        }
        addCourseLimit(this.addCourseLimitFrom).then(res => {
          this.$message({
            showClose: true,
            message: '成功',
            type: 'success'
          })
          this.loginLoading = false
        }).catch((err) => {
          console.log('失败', err)
          this.$message({
            showClose: true,
            message: '失败出错!',
            type: 'error'
          })
          this.loginLoading = false
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.box-card {
  float: left;
  margin: 20px 100px 20px 20px;
  width: 480px;
}
</style>
