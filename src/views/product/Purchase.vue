<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
      <!-- Navigation bar -->
      <my-header></my-header>
      <!-- V main -->
      <v-main class="purchase">
        <p>Bạn đã có tài khoản chưa? <a href="">Ấn vào đây để đăng nhập</a></p>
        <p>Bạn đã có tài khoản chưa? <a href="">Ấn vào đây để đăng nhập</a></p>
        <div style="background-color: rgb(255, 247, 245)">
          <v-container fluid>
            <v-row dense>
              <v-col
                cols="12"
                sm="6"
                md="6"
               
              >
                <v-form>
                  <v-row style="background-color: rgb(255, 237, 231)">
                    <v-col>
                      <div
                        v-for="(productImage, i) in product.productImages"
                        :key="i"
                      >
                        <a :href="'/products/' + product.productId">
                          <img
                            v-if="i == 0"
                            class="img-responsive"
                            :src="productImage.imgUrl"
                            width="50%"
                          />
                        </a>
                      </div>
                    </v-col>
                    <v-col>
                      <div class="cart-item-left" align="left">
                        <a
                          class="proName"
                          :href="'/products/' + product.productId"
                        >
                          <img
                            src="https://gcp-img.slatic.net/lazada/id0078489-36-18.png#width=36&height=18"
                            alt=""
                          />
                          {{product.productName}}
                        </a>
                        <p>
                          {{product.productDescription}},Size: {{product.productName}}</p>
                        <p class="combo-Promo-text">Enjoyed discount</p>
                        <img
                          src="https://img.alicdn.com/tfs/TB1qcanWAT2gK0jSZFkXXcIQFXa-60-37.png"
                          alt=""
                        />
                      </div>
                    </v-col>
                    <v-col class="cart-item-middle">
                      <p class="current-price">đ{{product.productPrice}}</p>
                      <p class="origin-price">đ {{ product.realPrice}}</p>
                      <p class="promotion-ratio">-15%</p>
                      <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
                      <v-btn icon><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                    </v-col>
                    <v-col class="cart-item-right"> </v-col>
                  </v-row>
                </v-form>
              </v-col>
              <v-col cols="12" sm="6" md="6" style="background-color: #f4f4f4">
                <v-col cols="12"><v-btn color="#ff7094">Process to payment</v-btn></v-col>
                <h1>THÔNG TIN THANH TOÁN</h1>
                <v-form>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-text-field
                          v-model="firstname"
                          :counter="20"
                          :rules="rules.nameRules"
                          outlined
                          dense
                          label="Tên*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-text-field
                          v-model="lastname"
                          :counter="20"
                          :rules="rules.nameRules"
                          outlined
                          dense
                          label="Họ*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" style="background-color: #ffffff">
                        <v-combobox
                          v-model="gender"
                          :items="items"
                          label="Chọn Giới tính*"
                          outlined
                          dense
                          required
                        >
                        </v-combobox>
                      </v-col>
                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-text-field
                          v-model="email"
                          :counter="20"
                          :rules="emailRules"
                          outlined
                          dense
                          label="Email"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-text-field
                          v-model="phone"
                          :counter="20"
                          :rules="phoneRules"
                          outlined
                          dense
                          label="Số điện thoại*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-select
                          persistent-hint
                          :items="city"
                          label="Chọn tỉnh/thành phố*"
                          outlined
                          required
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-select
                          persistent-hint
                          :items="district"
                          label="Chọn quận/huyện*"
                          outlined
                          required
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" style="background-color: #ffffff">
                        <v-text-field
                          v-model="address"
                          :counter="20"
                          :rules="addressRules"
                          outlined
                          dense
                          label="Địa chỉ*"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-main>

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
  components: {
    "my-footer": VmFooter,
    "my-header": VmHeader,
  },
  data: () => ({
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    address: '',
    rules: {
        nameRules: [
          (v) => !!v || "First name is required",
          (v) => (v && v.length >= 2) || "First name  must have 5+ characters",
        ],
        phoneRules: [
          (v) => !!v || "Phone number is required",
          (v) => (v && v.length >= 10 && v.length < 12) || "Phone number must have 10+ or smaller than 12 ",
        ],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
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






