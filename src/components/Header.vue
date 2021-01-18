<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        v-if="isValid"
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        left
      >
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="nav-bar-search"
          style="width: 100%"
        ></v-text-field>
        <v-list class="nar-bar-btn" dense justify="center" align="left">
          <!-- <v-list-group> -->
          <v-list-item link to="loginpage" v-if="isAccount">
            <v-list-item-content>
              <v-list-item-title>Login/Register</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/products">
            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Bộ sưu tập</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Blog</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Khuyến mãi</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Hệ Thống cửa hàng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- </v-list-group> -->
        </v-list>
      </v-navigation-drawer>
      <!--App bar -->
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="grey darken-3"
        dark
        style="height: 78px"
        id="app-bar"
      >
        <div class="site-logo">
          <a href="/">
            <img
              class="img-responsive"
              src="https://4menshop.com/logo.png"
              alt="4men"
            />
          </a>
        </div>

        <v-row
          id="nav-bar-btn"
          class="hidden-md-and-down"
          width="90px"
          justify="center"
        >
          <div class="nar-bar-btn">
            <ul class="nar-links">
              <v-menu> </v-menu>
              <li><a href="/products">Nam</a></li>
              <li><a href="">Blog</a></li>
              <li><a href="">Bộ sưu tập</a></li>
              <li><a href="">Khuyến mãi</a></li>
              <li><a href="">Hệ thống cửa hàng</a></li>
            </ul>
          </div>
        </v-row>

        <!-- Create right column -->

        <v-spacer></v-spacer>
        <!-- <v-col cols="12" sm="3" md="3" lg="3" xl="3"> -->
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down mx-4"
        ></v-text-field>
        <!-- </v-col> -->
        <v-badge color="red" content="0" top overlap>
          <a
            id="shopping-cart"
            class="mx-4"
            href="/carts"
            style="text-decoration: none"
          >
            <v-icon class="shopping-cart-icon">mdi-shopping</v-icon>
          </a>
        </v-badge>
        <v-btn icon to="/loginpage" class="hidden-md-and-down mx-4">
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-app-bar-nav-icon
          class="ml-0 pl-4"
          @click.stop="drawer = !drawer"
          v-if="isValid"
        ></v-app-bar-nav-icon>
      </v-app-bar>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    images: [],
    isValid: false,
    isAccount: false,
  }),
  mounted() {
    this.onResize();
    // console.log(this.$vuetify.breakpoint)

    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
  },
};
</script>

<style lang="scss">
#app-bar {
  opacity: 15%;
}

#app-bar:hover {
  opacity: 100%;
}
.bar-center {
  background-color: #ffffff;
  opacity: 60%;
}

.nar-bar-btn {
  .nar-links {
    list-style-type: none;
  }

  .nar-links li {
    display: inline;
    padding: 0px 12px 0px 12px;
  }
  .nar-links li a {
    color: #ffffff;
    text-decoration: none;
    font-size: 15px;
    text-transform: uppercase;
  }
}
</style>