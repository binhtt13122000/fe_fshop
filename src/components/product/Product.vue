<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <router-link class="navbar-brand" to="/">CS-eCommerce</router-link>
        <div class="ml-auto">
          <div v-if="user.photoURL">
            <img
              :src="user.photoURL"
              class="img-thumbnail profile-image"
              alt
            />
            <router-link class="btn btn-primary my-2 my-sm-0" to="/cart">
              <img
                src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG38.png"
                width="50"
                alt
              />
              <span class="badge badge-danger badge-pill">{{ cart.length }}</span>
            </router-link>
          </div>
          <router-link v-else class="btn btn-primary my-2 my-sm-0" to="/login">Login</router-link>
        </div>
      </nav>
    </div>
    <div class="page-container">
      <router-view />
    </div>
  </div>
</template>
<script>
