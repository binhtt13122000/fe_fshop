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
        <div>
          <v-row dense>
            <v-col cols="12" sm="6">
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
                        label="Chọn tỉnh/thành phố*"
                        outlined
                        required
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        persistent-hint
                        :items="itemCitys"
                        label="Chọn quận/huyện*"
                        outlined
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        persistent-hint
                        :items="itemCitys"
                        label="Chọn xã/phường*"
                        outlined
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="Phone"
                        :counter="20"
                        :rules="phoneRules"
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
            <v-col cols="12" sm="6">
              <v-form>
                <table>
                  <thead>
                    <tr>
                      <th>Hình</th>
                      <th>Thông tin sản phẩm</th>
                      <th>Size</th>
                      <th>Đơn giá</th>
                      <th>Tổng</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src="https://ninomaxx.com.vn/wp-content/uploads/2021/01/WEB-1.png"
                          width="30%"
                          alt="Thông tin sản phẩm"
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </v-form>
            </v-col>
          </v-row>
        </div>
      </v-main>

      <!-- footer -->
      <my-footer></my-footer>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
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






