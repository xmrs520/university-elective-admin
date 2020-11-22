<template>
  <div class="selection-container">

    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <strong><span>选课管理</span></strong>
        <el-button
          type="warning"
          style="float: right; padding: 3px 0;font-size:20px"
          @click="loadCourseAllInfo()"
        ><i
            class="el-icon-refresh-left"
            style="font-size:20px"
          ></i> 刷新一下</el-button>
      </div>
      <el-table
        :data="CourseAllInfo"
        stripe
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <template>
              <el-table
                border
                :stripe="true"
                :data="props.row.studentsInfo"
                style="width: 100%"
              >
                <el-table-column
                  prop="stu_id"
                  label="学号"
                  width="180"
                >
                  <template slot="header">
                    <el-tag
                      type="info"
                      effect="plain"
                    >学号</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180"
                >
                  <template slot="header">
                    <el-tag
                      type="info"
                      effect="plain"
                    >姓名</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别"
                  width="180"
                >
                  <template slot="header">
                    <el-tag
                      type="info"
                      effect="plain"
                    >性别</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="major"
                  label="专业"
                  width="180"
                >
                  <template slot="header">
                    <el-tag
                      type="info"
                      effect="plain"
                    >专业</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="classes"
                  label="班级"
                  width="180"
                >
                  <template slot="header">
                    <el-tag
                      type="info"
                      effect="plain"
                    >班级</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="department"
                  label="院系"
                  width="180"
                >
                  <template slot="header">
                    <el-tag
                      type="info"
                      effect="plain"
                    >院系</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="course_id"
          label="课程编号"
        >
          <template slot="header">
            <el-tag effect="dark">课程编号</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="coursename"
          label="课程名"
        >
          <template slot="header">
            <el-tag effect="dark">课程名</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="teacher_id"
          label="教师编号"
        >
          <template slot="header">
            <el-tag effect="dark">教师编号</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="teacher"
          label="教师"
        >
          <template slot="header">
            <el-tag effect="dark">教师</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="department"
          label="院系"
        >
          <template slot="header">
            <el-tag effect="dark">院系</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="majorlimit"
          label="限选专业"
        >
          <template slot="header">
            <el-tag effect="dark">限选专业</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="classlimit"
          label="限选班级"
        >
          <template slot="header">
            <el-tag effect="dark">限选班级</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="numberlimit"
          label="限选人数"
        ><template slot="header">
            <el-tag effect="dark">限选人数</el-tag>
          </template></el-table-column>
        <el-table-column
          align="center"
          property="selectednumber"
          label="已选人数"
        >
          <template slot="header">
            <el-tag effect="dark">已选人数</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot="header">
            <el-tag
              type="success"
              effect="dark"
            >操作</el-tag>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditCourseAllInfo(scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleremoveCoue(scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <!-- Form EditSCourseInfo -->
    <el-dialog
      :modal-append-to-body="false"
      :width="40+'%'"
      title="修改课程信息"
      :visible.sync="FormVisible"
    >
      <el-form :model="EditCourseAllInfo">
        <el-form-item
          label="课程号"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="true"
            :placeholder='EditCourseAllInfo.course_id'
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="课程名"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入课程名"
            v-model="EditCourseAllInfo.coursename"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="教师编号"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师编号"
            v-model="EditCourseAllInfo.teacher_id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="教师姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入教师姓名"
            v-model="EditCourseAllInfo.teacher"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="院系"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入院系"
            v-model="EditCourseAllInfo.department"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="限选人数"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入限选人数"
            v-model="EditCourseAllInfo.numberlimit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="限选专业"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入限选专业"
            v-model="EditCourseAllInfo.majorlimit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="限选班级"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入限选班级"
            v-model="EditCourseAllInfo.classlimit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="postEditCourseAllInfo()"
        >确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
import {
  getCourseAllInfo,
  setCourseInfo, // 修改课程信息
  setCourseLimitInfo, // 修改课程限选
  removeCoue // 删除课程

} from '@/api/admin'

export default {
  name: 'SelectionIndex',
  components: {},
  created () {
    this.loadCourseAllInfo()
  },
  data () {
    return {
      CourseAllInfo: [],
      EditCourseAllInfo: {
        course_id: '',
        coursename: '',
        teacher_id: '',
        teacher: '',
        department: '',
        numberlimit: '',
        majorlimit: '',
        classlimit: ''
      },
      loading: true,
      FormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    loadCourseAllInfo () {
      this.loading = true
      getCourseAllInfo().then(res => {
        this.loading = false
        this.CourseAllInfo = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleEditCourseAllInfo (row) {
      this.FormVisible = true
      this.EditCourseAllInfo = row
    },
    postEditCourseAllInfo () {
      setCourseInfo(this.EditCourseAllInfo).then(res => {
      }).catch(err => {
        console.log(err)
      })
      setCourseLimitInfo(this.EditCourseAllInfo).then(res => {
        console.log(res)
        this.FormVisible = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$notify.error({
          title: '错误',
          message: '修改失败'
        })
      })
    },
    handleremoveCoue (row) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCoue(row.course_id).then(res => {
          this.loadCourseAllInfo()
          this.$message({
            type: 'success',
            message: '删除课程成功!'
          })
        }).catch(err => {
          console.log(err)
          this.$message.error('该课程有选课，删除课程失败!')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.box-card {
  margin: 20px 100px 20px 20px;
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
