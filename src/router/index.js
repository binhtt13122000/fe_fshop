import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/auth/LoginPage.vue'
import SignupPage from '../views/auth/SignupPage.vue'
import ForgotPasswordForm from '../views/auth/ForgotPasswordForm.vue'
import HomePage from '../views/HomePage.vue'
import Purchase from '../views/product/Purchase.vue'
import ProductDetail from '../views/product/ProductDetail.vue'
import CartListContainer from '../views/cart/CartListContainer.vue'
import ProductListContainer from '../views/product/ProductListContainer.vue'
// import Product from '../views/product/Product.vue'
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
    path: '/loginpage',
    name: 'loginpage',
    component: LoginPage
  },
  {
    path: '/products',
    name: 'products',
    component: ProductListContainer
  },
  {
    path: '/products/:idProduct',
    component: ProductDetail
  },
  {
    path: '/carts',
    name: 'carts',
    component: CartListContainer
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: Purchase
  },
  {
    path: '/signupPage',
    name: 'signupPage',
    component: SignupPage
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
