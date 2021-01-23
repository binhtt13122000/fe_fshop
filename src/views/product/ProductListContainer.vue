<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <!-- Navigation bar -->
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
          ></v-text-field>
          <v-list class="nar-bar-btn" dense justify="center" align="left">
            <!-- <v-list-group> -->
            <v-list-item link to="/loginpage" v-if="isAccount">
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
          style="height: 70px"
          class="app-bar"
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
                <li><a href="">Nam</a></li>
                <li><a href="">Blog</a></li>
                <li><a href="">Bộ sưu tập</a></li>
                <li><a href="">Khuyến mãi</a></li>
                <li><a href="">Hệ thống cửa hàng</a></li>
              </ul>
            </div>
          </v-row>

          <!-- Create right column -->

          <v-spacer></v-spacer>
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            v-model="search"
            class="hidden-sm-and-down mx-4"
          ></v-text-field>
          <!-- </v-col> -->
          <v-bottom-sheet v-model="sheet" inset>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark v-bind="attrs" v-on="on" icon>
                <v-badge color="red" :content="oke" top overlap>
                  <v-icon class="shopping-cart-icon">mdi-shopping</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <v-list>
              <h1
                style="
                  background-color: black;
                  color: white;
                  padding-bottom: 10px;
                "
              >
                Your cart
              </h1>
              <v-list-item
                v-for="cart in carts"
                :key="cart.cartId"
                @click="sheet = false"
              >
                <v-list-item-avatar>
                  <v-avatar size="32px">
                    <img
                      src="https://cdn1.vectorstock.com/i/1000x1000/60/55/shopping-cart-icon-in-flat-style-shopping-symbol-vector-20616055.jpg"
                      alt="cart"
                    />
                  </v-avatar>
                </v-list-item-avatar>
                <router-link :to="'/carts/' +cart.cartId" id="cart-item">
                  <v-list-item-title style="font-size: 30px">{{ cart.cartId }}</v-list-item-title>
                </router-link>
              </v-list-item>
            </v-list>
          </v-bottom-sheet>
          <v-btn icon to="/loginpage" class="hidden-md-and-down">
            <v-icon>mdi-account</v-icon>
          </v-btn>

          <v-app-bar-nav-icon
            class="ml-0 pl-4"
            @click.stop="drawer = !drawer"
            v-if="isValid"
          ></v-app-bar-nav-icon>
        </v-app-bar>
        <!-- V main -->
        <v-main>
          <!-- v-breadcrumbs -->
          <div class="breadCrumbs">
            <v-breadcrumbs :items="itemBreadCrumbs" large></v-breadcrumbs>
          </div>
          <v-container>
            <table></table>
          </v-container>
          <v-container>
            <v-row dense>
              <v-col
                md="4"
                sm="4"
                align-content="center"
                justify="center"
                v-for="product in products"
                :key="product.productId"
              >
                <VmProduct :product="product"></VmProduct>
              </v-col>
            </v-row>
            <v-pagination
              v-model="currenPage"
              v-on:click="currenPage()"
              :length="lastPage"
            ></v-pagination>
            <!-- <Pagination/> -->
          </v-container>
        </v-main>

        <!-- V-footer  ------->
        <v-divider></v-divider>
        <VmFooter></VmFooter>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmProduct from "./Product.vue";
// import Pagination from "./Pagination.vue";
export default {
  components: { VmProduct, VmFooter },
  // props: ["product"],
  data: () => ({
    sheet: false,
    tiles: [
      { img: "keep.png", title: "Keep" },
      { img: "inbox.png", title: "Inbox" },
      { img: "hangouts.png", title: "Hangouts" },
      { img: "messenger.png", title: "Messenger" },
      { img: "google.png", title: "Google+" },
    ],
    oke: 2,
    currenPage: 1,
    // lastPage: 1,
    msg: "Welcome to my Vuex Store",
    drawer: null,
    drawerRight: null,
    search: null,
    shoppingCartBadge: 0,
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    itemBreadCrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
    ],
    isValid: false,
    isAccount: false,
  }),
  watch: {
    // currenPage(newVal, oldVal) {
    //   console.log("click");
    // },
    currenPage() {
      console.log(this.currenPage);
      this.getProducts(this.currenPage);
    },
  },

  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    ...mapActions("product", ["getProducts"]),
  },
  computed: {
    currenPage1: {
      get() {
        return this.$store.state.product.pages;
      },
    },
    lastPage: {
      get() {
        return this.$store.state.product.pages.totalPages;
      },
    },
    ...mapGetters("product", ["products", "pages"]),
    ...mapGetters("auth", ["carts", "user", "cart"]),
    // ...mapState("auth", ["carts", "user", "cart"]),
  },

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    this.$store.mapGetters.product.pages;
    this.getProducts(this.currenPage);
  },
  mounted() {
    console.log("t laf produc list");
    // console.log(this.$store.state.auth.user.userName);
  },
};
</script>

<style lang="scss">
.bar-center {
  background-color: #ffffff;
}

.app-bar {
  opacity: 100%;
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
  // main image

  // footer
}

#footer-center {
  h4 {
    font-family: "Times New Roman", Times, serif;
    font-size: 25px;
    text-align: center;
  }
  ul {
    list-style-type: none;
    li a {
      text-decoration: none;
      text-align: left;
      justify-content: left;
      color: #000000;
    }
    li a:hover {
      text-decoration: underline;
      color: #ff0000;
    }
  }
}

#socialIcon {
  a {
    text-decoration: none;
    padding: 0px 15px 0px 15px;
  }
}
#shopping-cart-icon {
  background-color: rgb(77, 124, 73);
  .shopping-cart-icon:hover {
    background-color: rgb(136, 16, 16);
  }
}

#cart-item {
  text-decoration: none;
  size: 30px;
  color: #000000;
}
@media only screen and (max-width: 730px) {
}
@media only screen and (max-width: 560px) {
  // .right-column-icon v-btn {
  //   text-align: center;
  // }
}
</style>