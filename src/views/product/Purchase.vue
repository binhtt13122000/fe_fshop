<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
      <!-- Navigation bar -->
      <my-header></my-header>
      <!-- V main -->
      <v-main class="purchase">
        <section class="top-discount-area d-md-flex align-items-center">
          <!-- Single Discount Area -->
          <div class="single-discount-area" id="area-a">
            <h5>Free Shipping &amp; Returns</h5>
            <h6><a href="/products">BUY NOW</a></h6>
          </div>
          <!-- Single Discount Area -->
          <div class="single-discount-area" id="area-b">
            <h5>20% Discount for all shirt</h5>
            <h6>CODE: 4menshirt</h6>
          </div>
          <!-- Single Discount Area -->
          <div class="single-discount-area" id="area-c">
            <h5>10% Discount for students</h5>
            <h6>CODE: Colorlib</h6>
          </div>
        </section>
        <br />
        <br />
        <div style="background-color: rgb(255, 247, 245)">
          <v-container fluid align="center" justify-center>
            <v-row>
              <v-col cols="12" sm="7" md="7" class="order-info">
                <h1>THÔNG TIN THANH TOÁN</h1>

                <v-form>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="firstname"
                          :counter="20"
                          :rules="rules.nameRules"
                          outlined
                          dense
                          label="Tên*"
                          background-color="#f4f2f8"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="lastname"
                          :counter="20"
                          :rules="rules.nameRules"
                          outlined
                          dense
                          label="Họ*"
                          required
                          background-color="#f4f2f8"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-combobox
                          v-model="gender"
                          :items="itemGender"
                          label="Chọn Giới tính*"
                          outlined
                          dense
                          required
                          background-color="#f4f2f8"
                        >
                        </v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="email"
                          :counter="20"
                          :rules="rules.emailRules"
                          outlined
                          dense
                          label="Email"
                          required
                          background-color="#f4f2f8"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="phone"
                          :counter="20"
                          :rules="rules.phoneRules"
                          outlined
                          dense
                          label="Số điện thoại*"
                          background-color="#f4f2f8"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          persistent-hint
                          :items="cityItem"
                          label="Chọn tỉnh/thành phố*"
                          outlined
                          background-color="#f4f2f8"
                          dense
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          persistent-hint
                          :items="district"
                          label="Chọn quận/huyện*"
                          outlined
                          dense
                          background-color="#f4f2f8"
                          required
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="address"
                          :counter="20"
                          :rules="rules.addressRules"
                          outlined
                          dense
                          label="Địa chỉ*"
                          required
                          background-color="#f4f2f8"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>

                <v-spacer></v-spacer>
                <p>
                  Bạn đã có tài khoản chưa?
                  <a href="">Ấn vào đây để đăng nhập</a>
                </p>
              </v-col>
              <!-- <v-col cols="12" sm="1" md="1"></v-col> -->
              <v-col class="order-table" sm="5" md="5">
                <h1>Your order</h1>
                <div class="order-item-detail">
                  <v-form>
                    <v-row class="order-item" dense>
                      <v-col>
                        <v-row>
                          <v-col><span>Product:</span></v-col>
                          <v-col><span>Total</span></v-col>
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col
                            ><span>{{ product.productName }}</span></v-col
                          >
                          <v-col
                            ><span
                              ><u>đ</u>{{ product.productPrice }}</span
                            ></v-col
                          >
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col><span>Shipping: </span></v-col>
                          <v-col><span>Free</span></v-col>
                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col><span>Discount:</span></v-col>

                          <v-col
                            ><input
                              id="voucher-code"
                              type="text"
                              placeholder="Enter voucher code"
                          /></v-col>

                          <v-col cols="12"><v-divider></v-divider></v-col>
                          <v-col
                            ><span>Mã Khuyến mãi</span></v-col
                          >
                          <v-col
                            ><v-icon>mdi-sale</v-icon><a href="">Chọn hoặc nhập mã khuyến mãi</a></v-col
                          >
                          <v-col cols="12"><v-divider></v-divider></v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12"
                        ><v-btn class="order-btn" color="rgb(255, 66, 78)"
                          >Checkout</v-btn
                        >
                        <v-btn class="mx-4" color="primary">Payal</v-btn></v-col
                      >
                      <v-col cols="12"></v-col>
                    </v-row>
                  </v-form>
                  <v-spacer></v-spacer>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>
      <v-divider></v-divider>
      <!-- footer -->
      <my-footer></my-footer>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";

export default {
  components: {
    "my-footer": VmFooter,
    "my-header": VmHeader,
  },
  data: () => ({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    rules: {
      nameRules: [
        (v) => !!v || "First name is required",
        (v) => (v && v.length >= 2) || "First name  must have 5+ characters",
      ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) =>
          (v && v.length >= 10 && v.length < 12) ||
          "Phone number must have 10+ or smaller than 12 ",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      addressRules: [
        (v) => !!v || "Address is required",
        (v) => (v && v.length >= 5) || "Address  must have 5+ characters",
      ],
    },
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
    itemGender: ["Nam", "Nữ"],
    cityItem: [
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
  mounted() {
    this.productDetails(this.$route.params.idProduct);
  },
};
</script>

<style lang="scss">
.purchase {
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}

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

#voucher-code {
  box-sizing: border-box;
  height: 36px;
  padding-bottom: 4px;
  border-radius: 3px;
  border: 2px solid #c7c7c7;
  text-align: center;
  box-shadow: 0 0 10px 4px 0 0 10px 30px, 30px 0 20px 30px;
}

.order-table {
  padding-right: 2em;
  margin-right: 0px;
}

.order-item-detail {
  background-color: #ffffff;
  border: solid #b3b3b3;
}

.order-info {
  padding-left: 10px;
}

.top-discount-area .single-discount-area {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.333333%;
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 40px 15px;
  background-color: #b8b8b8;
  text-align: center;
  -ms-flex-item-align: stretch;
  align-self: stretch;
}
.top-discount-area .single-discount-area:nth-child(2) {
  background-color: #ff084e;
}
.top-discount-area .single-discount-area:last-child {
  background-color: #3a3a3a;
}

.top-discount-area .single-discount-area h5 {
  font-size: 20px;
  color: #fff;
  margin-bottom: 15px;
}
.top-discount-area .single-discount-area h6 {
  font-size: 10px;
  color: #fff;
  margin-bottom: 15px;
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






