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
                <v-list-item-title>Name</v-list-item-title>
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
        <!-- v-breadcrumbs -->

        <!-- V main -->
        <v-main>
          <div class="breadCrumbs">
            <v-breadcrumbs :items="itemBreadCrumbs" large></v-breadcrumbs>
          </div>
          <div class="section">
            <div class="att_pro">
              <v-container>
                <v-row class="d-flex justify-content-center">
                  <v-col col-sm="6">
                    <!-- <div class="md-4 shadow-sm">
                      <a href="#">
                        <img
                          class="img-responsive"
                          :src="productImage.imgUrl"
                          width="100%"
                        />
                      </a>
                    </div> -->
                    <!-- Create carouel -->
                    <div class="md-4 shadow-sm">
                    <v-carousel style="width:80%;height:auto;">
                      <v-carousel-item
                        v-for="(productImage, i) in product.productImages"
                        :key="i"
                        :src="productImage.imgUrl"
                        alt="productImage.imgUrl"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        
                      >
                      </v-carousel-item>
                    </v-carousel>
                    </div>
                    <!-- <div
                      class="md-4 shadow-sm"
                      v-for="(productImage, i) in product.productImages"
                      :key="i"
                    >
                      <a href="#">
                        <img
                          class="img-responsive"
                          :src="productImage.imgUrl"
                          width="100%"
                        />
                      </a>
                    </div> -->
                  </v-col>
                  <v-col col-sm="6">
                    <div class="sumary-inner"></div>
                    <div class="size-inner">
                      <h1>{{ product.productName }}</h1>
                      <!-- <p>{{ product.productDescription }}</p> -->
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                      <span><u>Giá bán</u>:</span>
                      <span class="price">
                        {{ product.productPrice }}<u>đ</u>
                        <v-spacer></v-spacer>
                      </span>
                      <v-divider></v-divider>
                      <v-form>
                        <!-- <v-row>
                          <v-col>
                            <v-combobox
                              v-model="modelSize"
                              :items="items"
                              label="SIZE*"
                              hide-selected
                              outlined
                              small-chips
                              width="20%"
                            >
                            </v-combobox>
                          </v-col>
                          <v-col>
                            <v-combobox
                              v-model="modelQuantity"
                              :items="itemSize"
                              label="SỐ LƯỢNG*"
                              hide-selected
                              outlined
                              small-chips
                            >
                            </v-combobox>
                          </v-col>
                        </v-row> -->
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label for="pa_color">Size</label>
                              </td>
                              <td>
                                <fieldset class="swatch-picker">
                                  <p>Select Color</p>

                                  <label>
                                    <input
                                      type="radio"
                                      name="swatch_1234"
                                      value="blue"
                                    />
                                    <span style="background-color: #9abdfe"
                                      >Blue</span
                                    >
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="swatch_1234"
                                      value="gray"
                                    />
                                    <span style="background-color: #aaaaaa"
                                      >Gray</span
                                    >
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="swatch_1234"
                                      value="black"
                                    />
                                    <span style="background-color: #222222"
                                      >Black</span
                                    >
                                  </label>
                                </fieldset>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <v-row>
                          <v-col>
                            <v-btn id="btn-addToCart" width="100%">
                              <v-icon>mdi-shopping</v-icon>
                              Đăng ký mua hàng
                            </v-btn>
                          </v-col>
                          <v-col>
                            <v-btn width="100%">
                              <v-icon>mdi-plus</v-icon>
                              Thêm vào giỏ hàng
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-spacer></v-spacer>
                      </v-form>
                    </div>
                    <v-spacer></v-spacer>
                    <br />
                    <br />
                    <div class="product-detail-inner">
                      <div
                        class="shipping-rules"
                        style="background-color: grey lighten-3"
                      >
                        <ul>
                          <li>
                            <img
                              class="img-responsive"
                              src="https://ninomaxx.com.vn/wp-content/themes/basel-child/icon/truck.png"
                              width="4%"
                            />
                            <b> Miễn phí vận chuyển</b>
                            <p>
                              Khu vực TP HCM: từ 300.000đ
                              <br />
                              Các khu vực khác: từ 500.000đ
                              <br />
                              Mua thêm sản phẩm để được freeship nhé khách ơi!
                            </p>
                          </li>
                        </ul>
                      </div>
                      <!-- accordion-->
                      <div class="accordion">
                        <v-expansion-panels focusable>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              >HƯỚNG DẪN SỬ DỤNG</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              <p>
                                Giặt máy ở nhiệt độ thường. Không sử dụng chất
                                tẩy. Phơi trong bóng mát. Sấy khô ở nhiệt độ
                                thấp. Là ở nhiệt độ thấp 110 độ C. Giặt với sản
                                phẩm cùng màu. Không là lên chi tiết trang trí.
                              </p>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels focusable>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              >CHÍNH SÁCH ĐỔI HÀNG</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              100% cotton.
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels focusable>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              >HƯỚNG DẪN ĐẶT HÀNG</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              100% cotton.
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                      <div class="product-share">
                        <v-container>
                          <v-row
                            id="socialIcon"
                            class="d-flex align-items-center"
                          >
                            <v-col md="12" lg="12" xl="12" class="mx-auto mt-3">
                              <div class="social-items">
                                <span>Share:</span>
                                <a href=""
                                  ><v-icon size="20">mdi-google</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="20">mdi-facebook</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="20">mdi-instagram</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="20">mdi-twitter</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="20">mdi-linkedin</v-icon></a
                                >
                              </div>
                            </v-col>
                          </v-row>
                        </v-container>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
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
export default {
  props: {
    source: String,
  },
  data: () => ({
    modelSize: "Size",
    modelQuantity: "Quantity",
    drawer: null,
    items: ["28", "29", "30", "31", "32"],
    itemSize: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    itemBreadCrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Nam",
        disabled: false,
        href: "/products",
      },
      {
        text: "Ao",
        disabled: true,
      },
    ],
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    isValid: false,
    isAccount: false,
  }),
  computed: {
    ...mapGetters("product", ["product"]),
  },
  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    ...mapActions("product", ["productDetails"]),
  },
  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  mounted() {
    this.productDetails(this.$route.params.idProduct);
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

.shipping-rules {
  background-color: #f2f2f2;
  ul {
    list-style: none;
  }
}

#btn-addToCart {
  background-color: #ff0000;
  color: #ffffff;

  &#btn-addToCart:hover {
    background-color: #000000;
  }
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  text-align: center;
  font-family: sans-serif;
}

.swatch-picker {
  border: 3px solid #ccc;
  display: inline-block;
  width: auto;
  margin: 20px auto;
  padding: 20px;
  text-align: center;

  label {
    display: inline-block;
    height: 40px;
    width: 40px;
    position: relative;
    margin: 0 2px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  span {
    display: block;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    border-radius: 3px;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  input {
    -webkit-appearance: none;
  }

  input:checked + span {
    border: 1px solid rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.6);
  }
}

@media only screen and (max-width: 1390px) {
}
@media only screen and (max-width: 560px) {
  // .right-column-icon v-btn {
  //   text-align: center;
  // }
}
</style>