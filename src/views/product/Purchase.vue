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
            style="width: 100%"
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
                <v-list-item-title>Bộ sưu tập </v-list-item-title>
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
          <v-container>
            <v-row dense>
              <v-col>
                <h1>THÔNG TIN THANH TOÁN</h1>
                <v-form>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="Name"
                          :counter="20"
                          :rules="nameRules"
                          outlined
                          dense
                          label="Tên*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="Name"
                          :counter="20"
                          :rules="nameRules"
                          outlined
                          dense
                          label="Họ*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-combobox
                          v-model="select"
                          :items="items"
                          label="Chọn Giới tính*"
                          outlined
                          dense
                          required
                        >
                        </v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="Email"
                          :counter="20"
                          :rules="emailRules"
                          outlined
                          dense
                          label="Email"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="Phone"
                          :counter="20"
                          :rules="phoneRules"
                          outlined
                          dense
                          label="Số điện thoại*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          persistent-hint
                          :items="itemCitys"
                          label="Chọn thành phố*"
                          outlined
                          required
                        >
                          <!-- <option value="VN-44">An Giang</option>
                          <option value="VN-43">Bà Rịa–Vũng Tàu</option>
                          <option value="VN-54">Bắc Giang</option>
                          <option value="VN-53">Bắc Kạn</option>
                          <option value="VN-55">Bạc Liêu</option>
                          <option value="VN-56">Bắc Ninh</option>
                          <option value="VN-50">Bến Tre</option>
                          <option value="VN-31">Bình Định</option>
                          <option value="VN-57">Bình Dương</option>
                          <option value="VN-58">Bình Phước</option>
                          <option value="VN-40">Bình Thuận</option>
                          <option value="VN-59">Cà Mau</option>
                          <option value="VN-CT">Cần Thơ</option>
                          <option value="VN-04">Cao Bằng</option>
                          <option value="VN-DN">Đà Nẵng</option>
                          <option value="VN-33">Đắk Lắk</option>
                          <option value="VN-72">Đắk Nông</option>
                          <option value="VN-71">Điện Biên</option>
                          <option value="VN-39">Đồng Nai</option>
                          <option value="VN-45">Đồng Tháp</option>
                          <option value="VN-30">Gia Lai</option>
                          <option value="VN-03">Hà Giang</option>
                          <option value="VN-63">Hà Nam</option>
                          <option value="VN-HN">Hà Nội</option>
                          <option value="VN-23">Hà Tĩnh</option>
                          <option value="VN-61">Hải Dương</option>
                          <option value="VN-HP">Hải Phòng</option>
                          <option value="VN-73">Hậu Giang</option>
                          <option value="VN-SG">Hồ Chí Minh</option>
                          <option value="VN-14">Hòa Bình</option>
                          <option value="VN-66">Hưng Yên</option>
                          <option value="VN-34">Khánh Hòa</option>
                          <option value="VN-47">Kiên Giang</option>
                          <option value="VN-28">Kon Tum</option>
                          <option value="VN-01">Lai Châu</option>
                          <option value="VN-35">Lâm Đồng</option>
                          <option value="VN-09">Lạng Sơn</option>
                          <option value="VN-02">Lào Cai</option>
                          <option value="VN-41">Long An</option>
                          <option value="VN-67">Nam Định</option>
                          <option value="VN-22">Nghệ An</option>
                          <option value="VN-18">Ninh Bình</option>
                          <option value="VN-36">Ninh Thuận</option>
                          <option value="VN-68">Phú Thọ</option>
                          <option value="VN-32">Phú Yên</option>
                          <option value="VN-24">Quảng Bình</option>
                          <option value="VN-27">Quảng Nam</option>
                          <option value="VN-29">Quảng Ngãi</option>
                          <option value="VN-13">Quảng Ninh</option>
                          <option value="VN-25">Quảng Trị</option>
                          <option value="VN-52">Sóc Trăng</option>
                          <option value="VN-05">Sơn La</option>
                          <option value="VN-37">Tây Ninh</option>
                          <option value="VN-20">Thái Bình</option>
                          <option value="VN-69">Thái Nguyên</option>
                          <option value="VN-21">Thanh Hóa</option>
                          <option value="VN-26">Thừa Thiên–Huế</option>
                          <option value="VN-46">Tiền Giang</option>
                          <option value="VN-51">Trà Vinh</option>
                          <option value="VN-07">Tuyên Quang</option>
                          <option value="VN-49">Vĩnh Long</option>
                          <option value="VN-70">Vĩnh Phúc</option>
                          <option value="VN-06">Yên Bái</option> -->
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6"> </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-title>ĐƠN HÀNG CỦA BẠN</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <!-- footer -->
        <v-footer color="white" padless>
          <v-container>
            <!-- <v-row id="footer-center" class="d-flex align-items-center"> -->
            <div id="footer-center">
              <!-- <v-col class="mx-auto mt-2"> -->
              <div class="mx-auto mt-auto">
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
              <!-- </v-col>
              <v-col  class="mx-auto mt-2"> -->
              <div class="mx-auto mt-2">
                <h4 class="font-weight-bold">THƯƠNG HIỆU</h4>
                <ul class="foo-thuong-hieu">
                  <li><a href="">Giới thiệu</a></li>
                  <li><a href="">Tuyển dụng</a></li>
                  <li><a href="">Liên hệ</a></li>
                </ul>
              </div>
              <!-- </v-col>
              <v-col class="mx-auto mt-2"> -->
              <div class="mx-auto mt-2">
                <h4 class="font-weight-bold">TIN TỨC</h4>
                <ul class="foo-tin-tuc">
                  <li><a href="">Bộ sưu tập</a></li>
                  <li><a href="">Tư vấn thời trang</a></li>
                  <li><a href="">Tin tức thời trang</a></li>
                  <li><a href="">Mẹo hay</a></li>
                  <li><a href="">Khuyến mãi</a></li>
                </ul>
              </div>
              <!-- </v-col>
              <v-col class="mx-auto mt-2"> -->
              <div class="mx-auto mt-2">
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
              <!-- </v-col>
              <v-col class="mx-auto mt-2"> -->
              <div class="mx-auto mt-2">
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
              <!-- </v-col> -->
            </div>
            <!-- </v-row> -->
          </v-container>
          <v-container>
            <v-row id="socialIcon" class="d-flex align-items-center">
              <v-col md="12" lg="12" xl="12" class="mx-auto mt-3">
                <div class="social-items" align="center" justify="center">
                  <a href=""><v-icon size="50">mdi-google</v-icon></a>
                  <a href=""><v-icon size="50">mdi-facebook</v-icon></a>
                  <a href=""><v-icon size="50">mdi-instagram</v-icon></a>
                  <a href=""><v-icon size="50">mdi-twitter</v-icon></a>
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
// import { mapActions, mapGetters } from "vuex";

export default {
  // validations: {
  // name: { required, maxLength: maxLength(10) },
  // email: { required, email },
  // select: { required },
  // checkbox: {
  //   checked (val) {
  //     return val
  //   },
  // },
  // },
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
    select: ["Giới tính"],
    items: ["Nam", "Nữ"],
    itemCitys: [
      "An Giang",
      "Bà Rịa–Vũng Tàu",
      "Bắc Giang",
      "Bắc Kạn",
      "Bạc Liêu",
      "Bắc Ninh",
      "Bến Tre",
      "Bình Định",
      "Bình Dương",
      "Bình Phước",
      "Bình Thuận",
      "Cà Mau",
      "Cần Thơ",
      "Cao Bằng",
      "Đà Nẵng",
      "Đắk Lắk",
      "Đắk Nông",
      "Điện Biên",
      "Đồng Nai",
      "Đồng Tháp",
      "Gia Lai",
      "Hà Giang",
      "Hà Nam",
      "Hà Nội",
      "Hà Tĩnh",
      "Hải Dương",
      "Hải Phòng",
      "Hậu Giang",
      "Hồ Chí Minh",
      "Hòa Bình",
      "Hưng Yên",
      "Khánh Hòa",
      "Kiên Giang",
      "Kon Tum",
      "Lai Châu",
      "Lâm Đồng",
      "Lạng Sơn",
      "Lào Cai",
      "Long An",
      "Nam Định",
      "Nghệ An",
      "Ninh Bình",
      "Ninh Thuận",
      "Phú Thọ",
      "Phú Yên",
      "Quảng Bình",
      "Quảng Nam",
      "Quảng Ngãi",
      "Quảng Ninh",
      "Quảng Trị",
      "Sóc Trăng",
      "Sơn La",
      "Tây Ninh",
      "Thái Bình",
      "Thái Nguyên",
      "Thanh Hóa",
      "Thừa Thiên–Huế",
      "Tiền Giang",
      "Trà Vinh",
      "Tuyên Quang",
      "Vĩnh Long",
      "Vĩnh Phúc",
      "Yên Bái",
    ],
    images: [],
    isValid: false,
    isAccount: false,
    mainImageSrc: null,
  }),

  created() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },

  computed: {},
  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
  },
};
</script>

<style lang="scss">
.app-bar {
  opacity: 15%;
}

.app-bar:hover {
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

#footer-center .mx-auto {
  display: inline-table;
  align-items: center;
  padding: 5px;
}

#socialIcon {
  a {
    text-decoration: none;
    padding: 0px 15px 0px 15px;
  }
}

@media only screen and (max-width: 1390px) {
}
@media only screen and (max-width: 600px) {
  .image-center-item {
    display: block;
  }
  #footer-center .mx-auto {
    display: block;
    text-align: center;
  }
}
</style>






