<template>
  <div class="StudentSelection-container">
    <div class="containers">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span> <strong>课程退订 </strong></span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
          ><i
              class="el-icon-s-release"
              style="font-size:30px"
            ></i></el-button>
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
                @click="postUnsubscribeCourse(scope.row.course_id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import { courseUnsubscribe, getSelectedCourseInfo } from '@/api/students'

export default {
  name: 'StudentSelection',
  components: {},
  created () {
    this.loadSelectedCourseInfo()
  },
  data () {
    return {
      selectedData: [] // 已选课程
    }
  },
  methods: {
    loadSelectedCourseInfo () { // 加载已选课
      getSelectedCourseInfo().then(res => {
        this.selectedData = res.data
      })
    },
    postUnsubscribeCourse (data) { // 课程退订
      courseUnsubscribe(data).then(res => {
        this.loadSelectedCourseInfo()
      })
      this.$notify({
        title: '成功退订',
        type: 'success',
        duration: 3000
      })
    }
  }
}
</script>
<style scoped lang='less'>
.StudentSelection-container {
  .containers {
    width: 1140px;
    padding: 0;
    margin: 0 auto;
  }
  height: 100vh;
  background-color: #f2f6fc;
}
</style>
