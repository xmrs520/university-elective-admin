import Vue from 'vue'
import VueRouter from 'vue-router'
// @表示src 他是src目录的别名
// 好处：他不受当前路径的影响 ../  @后面别忘加‘/’
import Login from '@/views/login/index'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Students from '@/views/students'
import Teachers from '@/views/teachers'
import User from '@/views/user'
import Selection from '@/views/selection'
import Personal from '@/views/personal'
import Course from '@/views/course'
import Comments from '@/views/comments'
import StudentSelection from '@/views/students/components/selection'
import StudentComment from '@/views/students/components/comment'
import StudentHome from '@/views/students/components/home'
import StudentCoures from '@/views/students/components/course'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由layout有一个默认子路由，这个名字没有意义
    // 正确的做法是:如果有默认子路由，就不要给父路由起名字了
    // name: 'layout',
    component: Layout,
    // beforeEnter: (to, from, next) => {
    //   const user = JSON.parse(window.sessionStorage.getItem('user'))
    //   if (user.userRole === 0) {
    //     console.log('0')
    //     next()
    //   } else {
    //     console.log('0')
    //     next('/login')
    //   }
    // },
    children: [
      {
        path: '', // path为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/selection',
        name: 'selection',
        component: Selection
      },
      {
        path: '/personal',
        name: 'personal',
        component: Personal
      },
      {
        path: '/course',
        name: 'course',
        component: Course
      },
      {
        path: '/comments',
        name: 'comments',
        component: Comments
      }
    ]
  },
  {
    path: '/students',
    name: 'students',
    component: Students,
    children: [
      {
        path: '', // path为空，会作为默认子路由渲染
        name: 'StudentHome',
        component: StudentHome
      },
      {
        path: '/student/coures',
        name: 'StudentCoures',
        component: StudentCoures
      },
      {
        path: '/students/comment',
        name: 'StudentComment',
        component: StudentComment
      },
      {
        path: '/students/selection',
        name: 'StudentSelection',
        component: StudentSelection
      }
    ]
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: Teachers
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫 说白了所有页面的导航都会经过这里

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.sessionStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      // 已登录,允许通过
      next()
    } else {
      next('/login')
    }
  } else {
    // 登录页面,正常允许通过
    next()
  }
})

export default router
