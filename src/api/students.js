/**
 * 学生端接口请求
 */
import request from '@/utils/request'

/**
 * 获取选课表
 */
export const getStudentSelectedCourseInfo = () => {
  const { userId } = JSON.parse(window.sessionStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/getStudentSelectedCourseInfo',
    params: {
      stu_id: userId
    }
  })
}
/**
 * 选课
 */
export const selectedCourse = (data) => {
  const { userId } = JSON.parse(window.sessionStorage.getItem('user'))
  return request({
    method: 'POST',
    url: 'users/selectedCourse',
    params: {
      stu_id: userId,
      course_id: data
    }
  })
}
/**
 * 学生查询已选课程
 */
export const getSelectedCourseInfo = () => {
  const { userId } = JSON.parse(window.sessionStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/getSelectedCourseInfo',
    params: {
      stu_id: userId
    }
  })
}

/**
 * 课程退订
 */
export const courseUnsubscribe = (data) => {
  const { userId } = JSON.parse(window.sessionStorage.getItem('user'))
  return request({
    method: 'POST',
    url: 'users/courseUnsubscribe',
    params: {
      stu_id: userId,
      course_id: data
    }
  })
}
