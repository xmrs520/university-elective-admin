<template>
  <div class="user-container">

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>学生管理</span>
        <el-button
          type="warning"
          style="float: right; padding: 3px 0;font-size:20px"
          @click="loadAllStudentInfo(1)"
        ><i
            class="el-icon-refresh-left"
            style="font-size:20px"
          ></i> 刷新一下</el-button>
      </div>
      <el-table
        :data="studentsInfo"
        stripe
        style="width: 100%;"
        v-loading="loading"
      >
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
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditSudentInfo(scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleremoveStudents(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCountStudent"
        :hide-on-single-page="true"
        @current-change="onCurrentChangeStudentInfo"
      >
      </el-pagination>
    </el-card>

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>教师管理</span>
        <el-button
          type="warning"
          style="float: right; padding: 3px 0;font-size:20px"
          @click="loadAllTeachersInfo(1)"
        ><i
            class="el-icon-refresh-left"
            style="font-size:20px"
          ></i> 刷新一下</el-button>
      </div>
      <el-table
        :data="teachersInfo"
        stripe
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column
          property="teacher_id"
          label="教师编号"
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
          property="department"
          label="院系"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditTeacherInfo(scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleremoveTeachers(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCountTeacher"
        :hide-on-single-page="true"
        @current-change="onCurrentChangeTeachersInfo"
      >
      </el-pagination>
    </el-card>

    <!-- Form EditTeacherInfo -->

    <el-dialog
      title="修改老师信息"
      :modal-append-to-body="false"
      :visible.sync="EditTeacherInfoFormVisible"
    >
      <el-form :model="EditTeacherInfoForm">
        <el-form-item
          label="教师编号"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="true"
            :placeholder='EditTeacherInfoForm.teacher_id'
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师姓名"
            v-model="EditTeacherInfoForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师性别"
            v-model="EditTeacherInfoForm.sex"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="教师院系"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入院系"
            v-model="EditTeacherInfoForm.department"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入密码"
            v-model="EditTeacherInfoForm.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="EditTeacherInfoFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="postEditTeacherInfo()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- Form EditSudentInfo -->

    <el-dialog
      :modal-append-to-body="false"
      :width="40+'%'"
      title="修改学生信息"
      :visible.sync="EditSudentInfoFormVisible"
    >
      <el-form :model="EditSudentInfoForm">
        <el-form-item
          label="学号"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="true"
            :placeholder='EditSudentInfoForm.stu_id'
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生姓名"
            v-model="EditSudentInfoForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生性别"
            v-model="EditSudentInfoForm.sex"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="专业"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生专业"
            v-model="EditSudentInfoForm.major"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班级"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生班级"
            v-model="EditSudentInfoForm.classes"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="院系"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生院系"
            v-model="EditSudentInfoForm.department"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生密码"
            v-model="EditSudentInfoForm.password"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="EditSudentInfoFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="postEditSudentInfo()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-card
      class="box-card"
      style="position:fixed;top:90px;right:10px;width:600px;margin:10px"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <strong><span>搜索</span></strong>
        <el-radio
          v-model="radio"
          label="1"
          style="margin:auto 20px"
        >学生</el-radio>
        <el-radio
          v-model="radio"
          label="2"
        >老师</el-radio>
        <el-input
          style="width:250px;padding: 3px 0"
          placeholder="请输入ID号"
          v-model="search"
          clearable
        >
        </el-input>
        <el-button
          @click="Search"
          style="marginLeft:-3px"
          icon="el-icon-search"
        >搜索</el-button>

      </div>

      <el-table
        v-if="radio==='1'"
        :data="searchData"
        stripe
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column
          property="stu_id"
          label="学号"
          width="120"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="120"
        ></el-table-column>
        <el-table-column
          property="sex"
          label="性别"
          width="120"
        ></el-table-column>
        <el-table-column
          property="major"
          label="专业"
          width="120"
        ></el-table-column>
        <el-table-column
          property="classes"
          label="班级"
          width="120"
        ></el-table-column>
        <el-table-column
          property="department"
          label="院系"
          width="120"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditSudentInfo(scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleremoveStudents(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-if="radio==='2'"
        :data="searchData"
        stripe
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column
          property="teacher_id"
          label="教师编号"
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
          property="department"
          label="院系"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditTeacherInfo(scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleremoveTeachers(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card
      class="box-card"
      style="position:fixed;top:400px;right:10px;width:600px;margin:10px"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <strong>
          <el-tag
            effect="dark"
            type="success"
          >新建</el-tag>
        </strong>
        <el-radio
          v-model="newRadio"
          label="1"
          style="margin:auto 20px"
        >学生</el-radio>
        <el-radio
          v-model="newRadio"
          label="2"
        >老师</el-radio>

        <el-button
          @click="add()"
          style="float: right; padding: 3px 0"
          type="primary"
        >添加</el-button>
      </div>

      <el-form
        v-if="newRadio==='1'"
        :model="addStudentsForm"
      >
        <el-form-item
          label="学号"
          prop="stu_id"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生学号"
            v-model="addStudentsForm.stu_id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生姓名"
            v-model="addStudentsForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生性别"
            v-model="addStudentsForm.sex"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="专业"
          prop="major"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生专业"
            v-model="addStudentsForm.major"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="班级"
          prop="classes"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生班级"
            v-model="addStudentsForm.classes"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="院系"
          prop="department"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生院系"
            v-model="addStudentsForm.department"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入学生密码"
            v-model="addStudentsForm.password"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-form
        v-if="newRadio==='2'"
        :model="addTeachersForm"
      >
        <el-form-item
          label="教师编号"
          prop="teacher_id"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师编号"
            v-model='addTeachersForm.teacher_id'
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师姓名"
            v-model="addTeachersForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师性别"
            v-model="addTeachersForm.sex"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="教师院系"
          prop="department"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入院系"
            v-model="addTeachersForm.department"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入密码"
            v-model="addTeachersForm.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>
<script>
import {
  getAllStudentInfo,
  getAllTeachersInfo,
  removeStudents,
  removeTeachers,
  editSudentInfo,
  editTeacherInfo,
  getUserInfo,
  addStudents,
  addTeachers
} from '@/api/admin'

export default {
  name: 'UserIndex',
  components: {},
  created () {
    this.loadAllStudentInfo()
    this.loadAllTeachersInfo()
  },
  methods: {
    loadAllStudentInfo (page = 1) {
      this.loading = true
      getAllStudentInfo({ page, num: 10 }).then(res => {
        const { data, total } = res.data.msg
        this.studentsInfo = data
        this.totalCountStudent = total
        this.loading = false
      }).catch(err => {
        if (err) {
          this.$notify.error({
            title: '错误',
            message: '这是一条错误的提示消息'
          })
        }
      })
    },
    loadAllTeachersInfo (page = 1) {
      this.loading = true
      getAllTeachersInfo({ page, num: 10 }).then(res => {
        const { data, total } = res.data.msg
        this.teachersInfo = data
        this.totalCountTeacher = total
        this.loading = false
      }).catch(err => {
        if (err) {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: '这是一条错误的提示消息'
          })
        }
      })
    },
    onCurrentChangeStudentInfo (page) {
      this.loadAllStudentInfo(page)
    },
    onCurrentChangeTeachersInfo (page) {
      this.loadAllTeachersInfo(page)
    },
    handleremoveTeachers (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeTeachers(row.teacher_id).then(res => {
          this.$message({
            type: 'success',
            message: '删除教师成功!'
          })
        }).catch(err => {
          console.log(err)
          this.$message.error('该教师有课程安排，删除教师失败!')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleremoveStudents (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeStudents(row.stu_id).then(res => {
          this.$message({
            type: 'success',
            message: '删除学生成功!'
          })
        }).catch(err => {
          console.log(err)
          this.$message.error('该学生有选课，删除学生失败!')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEditTeacherInfo (row) {
      this.EditTeacherInfoFormVisible = true
      this.EditTeacherInfoForm = row
    },
    postEditTeacherInfo () {
      editTeacherInfo(this.EditTeacherInfoForm).then(res => {
        this.EditTeacherInfoFormVisible = false

        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$notify.error({
          title: '错误',
          message: '教师编号不存在'
        })
      })
    },
    handleEditSudentInfo (row) {
      this.EditSudentInfoFormVisible = true
      this.EditSudentInfoForm = row
    },
    postEditSudentInfo () {
      editSudentInfo(this.EditSudentInfoForm).then(res => {
        this.EditSudentInfoFormVisible = false
        console.log(res)
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$notify.error({
          title: '错误',
          message: '学号不存在不存在'
        })
      })
    },
    Search () {
      getUserInfo(this.search, this.radio).then(res => {
        this.searchData = res.data
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    add () {
      if (this.newRadio === '1') {
        addStudents(this.addStudentsForm).then(res => {
          console.log(res)
          this.$notify({
            title: '成功',
            message: '添加学生成功',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: '添加学生失败'
          })
        })
      } else {
        addTeachers(this.addTeachersForm).then(res => {
          this.$notify({
            title: '成功',
            message: '添加老师成功',
            type: 'success'
          })
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: '添加老师失败'
          })
        })
      }
    }
  },
  data () {
    return {
      studentsInfo: [],
      teachersInfo: [],
      loading: true,
      totalCountStudent: 0,
      totalCountTeacher: 0,
      EditTeacherInfoFormVisible: false,
      EditSudentInfoFormVisible: false,
      EditTeacherInfoForm: {
        teacher_id: '',
        name: '',
        sex: '',
        department: '',
        password: ''
      },
      EditSudentInfoForm: {
        stu_id: '',
        name: '',
        sex: '',
        major: '',
        classes: '',
        department: '',
        password: ''
      },
      addTeachersForm: {
        teacher_id: '',
        name: '',
        sex: '',
        department: '',
        password: ''
      },
      addStudentsForm: {
        stu_id: '',
        name: '',
        sex: '',
        major: '',
        classes: '',
        department: '',
        password: ''
      },
      formLabelWidth: '120px',
      radio: '1',
      search: '',
      searchData: [],
      newRadio: '1'
    }
  }
}
</script>
<style scoped lang="less">
.box-card {
  margin: 20px 100px 20px 20px;
  width: 1115px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>
