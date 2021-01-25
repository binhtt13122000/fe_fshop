<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
        <VmHeader></VmHeader>
        <!-- V main -->
        <v-main style="background-color: #f4f4f4">
          <v-container>
            <v-row dense>
              <v-col
                cols="12"
                align-content="center"
                justify="center"
                v-for="(detail, i) in cartDetail"
                :key="i"
              >
                <h1 v-if="i == 0">{{ detail.cartId }}</h1>
              </v-col>

              <v-spacer></v-spacer>
              <v-col style="background-color: #ffffff" cols="12">
              <v-checkbox label="SELECT ALL" v-model="checkbox"></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                align-content="center"
                justify="center"
                v-for="detail in cartDetail"
                :key="detail.cartId"
              >
                <VmCart :detail="detail" v-model="checkbox"></VmCart>
              </v-col>
              <v-col cols="12" style="background-color: #ffffff">
                <p>
                  <img
                    src="https://bizweb.dktcdn.net/100/354/189/files/freeship-shop-dong-ho-chinh-hang.png?v=1557544614669"
                    width="5%"
                    alt=""
                  />
                  Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận
                  chuyển bạn nhé!
                </p>
              </v-col>
              <v-col cols="12"></v-col>
            </v-row>
          </v-container>
        </v-main>
        <!-- footer -->
        <VmFooter></VmFooter>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
import VmCart from "./Cart.vue";
export default {
  components: { VmFooter, VmCart, VmHeader },

  data: () => ({
    drawer: null,
    username: "nhanltse140784",
    checkbox: false,
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    userLogo: "",
    images: [],
    isValid: false,
    isAccount: false,
    mainImageSrc: null,
  }),

  created() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });

    // console.log(
    //   this.getCartDetail(this.$route.params.idCart)
    // );
  },

  computed: {
    ...mapState("auth", {
      user: (state) => state.user,
      cartDetail: (state) => state.cartDetail,
    }),
    ...mapGetters("auth", ["carts", "user", "cart", "cartDetail"]),
  },
  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    userName() {
      return  this.user.username
    },
    ...mapActions("auth", ["getCartDetail"]),
  },

  mounted() {
    // console.log(this.$route.params.idCart, this.username);
    console.log("tao cart list ne");
    console.log(this.$route.params.idCart);
    // let a = this.$route.params.idCart;
    // let b = this.user.userName;
    console.log(this.user.userName);
    const response = this.user.userName;
    if(response.status === 200) {
    this.getCartDetail(this.$route.params.idCart, response);
    }
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






