<template>
  <div>
    <!-- <v-app id="inspire"> -->
    <v-navigation-drawer
      v-model="drawer"
      v-if="isValid"
      :clipped="$vuetify.breakpoint.lgAndUp"
      overlay-opacity="0.3"
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
            <v-list-item-title>Nam</v-list-item-title>
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
      style="height: 85px"
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
        width="80px"
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

      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        width="60px"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down mx-5"
      ></v-text-field>

      <v-menu
        class="menu-cart mx-4"
        bottom
        min-width="100px"
        rounded
        offset-y
        style="padding-right: 20px"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-badge color="red" :content="quantityInCart" top overlap>
              <v-icon class="shopping-cart-icon">mdi-shopping</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <div>
            <v-col
              ><h1>
                Shopping cart
                <v-icon class="mb-6" @click="sheet = !sheet"
                  >mdi-close-circle</v-icon
                >
              </h1></v-col
            >
            <v-divider></v-divider>
            <v-list-item
              v-for="cart in carts"
              :key="cart.cartId"
              @click="sheet = false"
            >
              <v-list-item-avatar class="mx-3">
                <v-avatar size="32px">
                  <img
                    src="https://img.icons8.com/plasticine/2x/favorite-cart.png"
                    alt="cart"
                  />
                </v-avatar>
              </v-list-item-avatar>
              <router-link :to="'/carts/' + cart.cartId" id="cart-item">
                <v-list-item-title style="font-size: 15px">{{
                  cart.cartDescription
                }}</v-list-item-title>
              </router-link>
              <v-spacer></v-spacer>
            </v-list-item>

            <v-divider></v-divider>
            <v-dialog persistent max-width="600px" v-model="dialog">
              <template v-slot:activator="{ on, attrs }">
                <v-col cols="12">
                  <v-btn
                    class="ma-2"
                    color="#404040"
                    v-if="this.carts.length < 10"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    size="30px"
                    width="200px"
                    ><h3>CART</h3>
                    <v-icon large>mdi-plus</v-icon></v-btn
                  >
                </v-col>
              </template>
              <v-card class="elevation-12">
                <v-toolbar color="black" dark flat>
                  <v-toolbar-title>New Cart</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn icon large target="_blank" v-on="on">
                        <v-icon>mdi-code-tags</v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="24" sm="12" md="12">
                        <v-text-field
                          label="Description of cart"
                          v-model="descriptionCart"
                          @change="descriptionCart = $event"
                          :rules="[
                            (v) => !!v || 'Description of cart is required',
                          ]"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="#404040" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn
                    color="#404040"
                    text
                    v-if="this.carts.length < 10"
                    @click="dialog = false"
                    v-on:click="createCart()"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </v-menu>

      <!-- menu for account -->
      <v-menu
        class="mx-4"
        bottom
        min-width="200px"
        rounded
        offset-y
        v-if="isLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <img :src="user.avatar" :alt="user.username" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <img :src="user.avatar" :alt="user.username" />
              </v-avatar>
              <h3>{{ user.username }}</h3>
              <p class="caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> My Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text to="/loginpage" v-show="isLoggedIn">
                Login
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text v-on:click="logout()">
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <v-btn icon to="/loginpage" class="hidden-md-and-down mx-auto" v-else>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-app-bar-nav-icon
        class="ml-0 pl-4"
        @click.stop="drawer = !drawer"
        v-if="isValid"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- </v-app> -->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    drawer: null,
    sheet: false,
    isLoggedIn: false,
    quantityInCart: 0,
    linkBar: [
      "Nam",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    isValid: false,
    isAccount: false,
    nameCart: "",
    descriptionCart: "",
    cartTotal: 0,
    status: 1,
    userId: "",
  }),

  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then((response) => {
        if (response.status === 200) {
          this.$router.push("/");
        }
      });
    },
    loggedIn: function () {
      this.isLoggedIn = this.$store.state.auth.userInfo.isLoggedIn;
      return this.isLoggedIn;
    },
    createCart() {
      var idUser = this.$store.state.auth.user.userId;
      if (idUser == null) {
        idUser = this.userId;
      }
      this.$store.dispatch("auth/createNewCart", {
        cartDescription: this.descriptionCart,
        cartTotal: "0",
        createTime: new Date(),
        status: 1,
        userId: idUser,
      });
      this.descriptionCart = "";
    },
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    ...mapActions("auth", ["logout", "getCart"]),
  },
  computed: {
    ...mapState("auth", {
      user: (state) => state.user,
      cartDetail: (state) => state.cartDetail,
    }),
    ...mapGetters("auth", ["carts", "user", "cart", "cartDetail"]),
  },
  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  mounted() {
    if (this.loggedIn() === true) {
      this.getCart(this.user.userName);
    }
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

.combo-Promo-text {
  margin-right: 50px;
  padding: 0 10px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 17px;
  font-size: 12px;
  color: #fff;
  //   background: linear-gradient(45deg, #ff7094, #f10653);
  background: #808080;
}

.menu-cart {
  font-family: "Roboto", sans-serif;
}
#boottom-sheet {
  background-color: aqua;
}
</style>