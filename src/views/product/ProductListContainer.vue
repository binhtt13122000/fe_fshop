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
          <v-list class="nar-bar-btn" dense justify="center" align="center">
            <!-- <v-list-group> -->
            <v-list-item link v-if="isAccount">
              <v-list-item-content>
                <v-list-item-title>Login/Register</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  >Name</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  >Bộ sưu tập<v-icon
                    >mdi-chevron-down</v-icon
                  ></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title
                  >Blog<v-icon>mdi-chevron-down</v-icon></v-list-item-title
                >
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
          <v-btn icon class="hidden-xs-and-down mx-4">
            <v-icon>mdi-shopping</v-icon>
          </v-btn>
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
          <v-container></v-container>
          <v-container>
            <v-row dense>
              <v-col
                md="4"
                align-content="center"
                justify="center"
                v-for="product in products"
                :key="product.productId"
              >
                <VmProduct :product="product"></VmProduct>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <!-- V-footer  ------->
        <v-divider></v-divider>
        <v-footer color="white" padless>
          <v-container>
            <v-row id="footer-center" class="d-flex align-items-center">
              <v-col class="mx-auto mt-2">
                <div class="social-link">
                  <h4 class="font-weight-bold">Contact</h4>
                  <v-list>
                    <v-list-item link>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-phone</v-icon>
                          HOTLINE:028 3526 7061
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <hr
                      class="black accent-2 mb-4 mt-0 d-inline-block mx-auto"
                      style="width: 300px"
                    />
                    <v-list-item link>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-store</v-icon>
                          HỆ THỐNG CỬA HÀNG
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <hr
                      class="black accent-2 mb-4 mt-0 d-inline-block mx-auto"
                      style="width: 300px"
                    />
                    <v-list-item link>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon>mdi-gift</v-icon>
                          PHIẾU QUÀ TẶNG
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <hr
                      class="black accent-2 mb-4 mt-0 d-inline-block mx-auto"
                      style="width: 300px"
                    />
                  </v-list>
                </div>
              </v-col>
              <v-col class="mx-auto mt-2">
                <div class="thuong-hieu">
                  <h4 class="font-weight-bold">THƯƠNG HIỆU</h4>
                  <ul class="foo-thuong-hieu">
                    <li><a href="">Giới thiệu</a></li>
                    <li><a href="">Tuyển dụng</a></li>
                    <li><a href="">Liên hệ</a></li>
                  </ul>
                </div>
              </v-col>
              <v-col class="mx-auto mt-2">
                <div class="tin-tuc">
                  <h4 class="font-weight-bold">TIN TỨC</h4>
                  <ul class="foo-tin-tuc">
                    <li><a href="">Bộ sưu tập</a></li>
                    <li><a href="">Tư vấn thời trang</a></li>
                    <li><a href="">Tin tức thời trang</a></li>
                    <li><a href="">Mẹo hay</a></li>
                    <li><a href="">Khuyến mãi</a></li>
                  </ul>
                </div>
              </v-col>
              <v-col class="mx-auto mt-2">
                <div class="ho-tro">
                  <h4 class="font-weight-bold">HỖ TRỢ</h4>
                  <ul class="foo-ho-tro">
                    <li><a href="">Khách hàng thân thiết</a></li>
                    <li><a href="">Hướng dẫn mua hàng</a></li>
                    <li><a href="">Hướng dẫn thanh toán</a></li>
                    <li><a href="">Giao hàng</a></li>
                    <li><a href="">Quy định đổi hàng</a></li>
                    <li><a href="">Bảo mật thông tin</a></li>
                  </ul>
                </div>
              </v-col>
              <v-col class="mx-auto mt-2">
                <div class="dang-ky-nhan-tin">
                  <h4 class="font-weight-bold">ĐĂNG KÝ NHẬN TIN</h4>
                  <v-form>
                    <v-text-field
                      class="form-group"
                      label="Email"
                      type="text"
                    ></v-text-field>
                    <v-btn type="submit">Đăng ký</v-btn>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row id="socialIcon" class="d-flex align-items-center">
              <v-col md="12" lg="12" xl="12" class="mx-auto mt-3">
                <div class="social-items" align="center" justify="center">
                  <a href=""><v-icon size="50">mdi-google</v-icon></a>
                  <a href=""><v-icon size="50">mdi-facebook</v-icon></a>
                  <a href=""><v-icon size="50">mdi-instagram</v-icon></a>
                  <a href=""><v-icon size="50">mdi-twitter</v-icon></a>
                  <a href=""><v-icon size="50">mdi-linkedin</v-icon></a>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-col class="grey darken-1 py-4 text-center white--text" cols="12">
            {{ new Date().getFullYear() }} — <strong>4menshop</strong>
            <div class="footer-copyright text-center py-3">
              <v-container fluid>
                &copy; CÔNG TY CỔ PHẦN TMDV - TVTK THỜI TRANG VIỆT:
                <a href="https://www.4menshop.com" style="color: red">
                  4menshop.com
                </a>
              </v-container>
            </div>
          </v-col>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmProduct from "./Product.vue";
export default {
  components: { VmProduct },
  props: {
    source: String,
  },
  data: () => ({
    msg: "Welcome to my Vuex Store",
    drawer: null,
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

  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    ...mapActions("product", ["getProducts", "productDetails"]),
  },
  computed: {
    ...mapGetters("product", ["products"]),
  },

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    
  },
  mounted() {
    this.getProducts();
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
// .tin-tuc .foo-tin-tuc .font-weight-bold {
//   font-size: 100px;
//     list-style-type: none;
//   }

@media only screen and (max-width: 1390px) {
}
@media only screen and (max-width: 560px) {
  // .right-column-icon v-btn {
  //   text-align: center;
  // }
}
</style>