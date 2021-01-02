import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/Layout.vue'
import LoginPage from '../components/auth/LoginPage.vue'
import SignupPage from '../components/auth/SignupPage.vue'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm.vue'
import HomePage from '../components/HomePage.vue'
import Footer from '../components/footer/Footer.vue'
Vue.use(VueRouter)

const routes = [
  {
  path: '/home',
  name: 'home',
  component: Home
  },
  {
    path: '/',
    name: 'homepage',
    component: HomePage
    },
  {
    path: '/forgotpasswordForm',
    name: 'forgotpasswordForm',
    component: ForgotPasswordForm
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    component: LoginPage
  },
  {
    path: '/signupPage',
    name: 'signupPage',
    component: SignupPage
  },
  {
    path: '/footer',
    name: 'footer',
    component: Footer
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
