<template>
  <div class="StudentCourse-container">
    <div class="containers">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span><strong>选课信息表</strong></span>
          <el-button
            type="warning"
            style="float: right; padding: 3px 0;font-size:20px"
            @click="loadStudentSelectedCourseInfo"
          ><i
              class="el-icon-refresh-left"
              style="font-size:20px"
            ></i> 刷新一下</el-button>
        </div>

        <el-table
          :data="CourseInfo"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="coursename"
            label="课程名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="teacher"
            label="老师"
            width="180"
          >

          </el-table-column>
          <el-table-column
            prop="department"
            label="院系"
          >
          </el-table-column>
          <el-table-column
            prop="selectednumber"
            label="已选人数"
          >
          </el-table-column>
          <el-table-column
            prop="numberlimit"
            label="限选人数"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="点击选定"
                placement="right"
              >
                <el-button
                  plain
                  :type="scope.row.selectednumber >= scope.row.numberlimit?'danger' : 'success'"
                  :icon="scope.row.selectednumber >= scope.row.numberlimit?'el-icon-warning' : 'el-icon-check'"
                  v-bind:disabled="scope.row.selectednumber >= scope.row.numberlimit?true:false"
                  circle
                  @click="selectedCourse(scope.row)"
                ></el-button>
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>

      </el-card>
      <el-card class="
                box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span> <strong>预选课程 </strong></span>
          <el-button
            style="float: right; padding: 3px 0;font-size:20px"
            type="warning"
            @click="postSelectedCourse"
          ><i
              class="el-icon-s-promotion"
              style="font-size:20px"
            ></i> 选好了，提交</el-button>
        </div>

        <el-table
          :data="selectedData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="coursename"
            label="课程名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="teacher"
            label="老师"
            width="180"
          >

          </el-table-column>
          <el-table-column
            prop="department"
            label="院系"
          >
          </el-table-column>
          <el-table-column
            prop="selectednumber"
            label="已选人数"
          >
          </el-table-column>
          <el-table-column
            prop="numberlimit"
            label="限选人数"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                plain
                type="danger"
                icon="el-icon-close"
                circle
                @click="cancelCourse(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </div>
  </div>
</template>
<script>
import { getStudentSelectedCourseInfo, selectedCourse } from '@/api/students'

export default {
  name: 'StudentCourse',
  components: {},
  created () {
    this.loadStudentSelectedCourseInfo()
  },
  methods: {
    loadStudentSelectedCourseInfo () { // 加载课程表
      getStudentSelectedCourseInfo().then(res => {
        this.CourseInfo = res.data
      })
      this.$notify({
        title: '课程更新成功啦',
        message: '快选课吧~~',
        type: 'success',
        offset: 100,
        duration: 3000
      })
    },
    postSelectedCourse () { // 提交选课
      for (const item of this.selectedData) {
        selectedCourse(item.course_id).then(res => {
          this.$notify({
            title: '抢到课啦',
            type: 'success',
            duration: 3000
          })
        }).catch((err) => {
          if (err.response.status === 404) {
            this.$notify({
              title: '你已经选了这门课程啦~',
              message: '重复选课警告',
              type: 'warning',
              duration: 3000
            })
          } else {
            this.$notify.error({
              title: '不好意思，选课失败了哦',
              message: '错误提示',
              duration: 3000
            })
          }
        })
      }
    },
    selectedCourse (row) {
      this.selectedData.push(row)
    },
    cancelCourse (index) {
      this.selectedData.splice(index, 1)
    }
  },
  data () {
    return {
      selectedData: [], // 已选课程
      CourseInfo: [],
      search: '',
      multipleSelection: [] // 选中
    }
  }
}
</script>
<style scoped lang='less'>
.StudentCourse-container {
  .containers {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
  }
  height: 100vh;
  background-color: #f2f6fc;
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

.box-card {
  margin-bottom: 20px;
}
</style>
