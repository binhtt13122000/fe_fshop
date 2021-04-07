<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
      <!-- Navigation bar -->
      <VmHeader></VmHeader>
      <!-- V main -->
      <v-main>
        <!-- v-breadcrumbs -->
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
              v-for="voucher in this.vouchers"
              :key="voucher.promotionId"
            >
              <VmVoucher :voucher="voucher"></VmVoucher>
            </v-col>
          </v-row>
          <!-- <Pagination/> -->
        </v-container>
      </v-main>

      <!-- V-footer  ------->
      <v-divider></v-divider>
      <VmFooter></VmFooter>
    </v-app>
    <!-- </v-app> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
import VmVoucher from "../voucher/VoucherDetail.vue";

// import Pagination from "./Pagination.vue";
export default {
  components: { VmVoucher, VmFooter, VmHeader },
  props: ["product"],
  data: () => ({
    sheet: false,
    tiles: [
      { img: "keep.png", title: "Keep" },
      { img: "inbox.png", title: "Inbox" },
      { img: "hangouts.png", title: "Hangouts" },
      { img: "messenger.png", title: "Messenger" },
      { img: "google.png", title: "Google+" },
    ],
    quantityInCart: 2,
    currenPage: 1,
    // lastPage: 1,
    drawer: null,
    drawerRight: null,
    search: null,
    shoppingCartBadge: 0,
  }),
  watch: {
    currenPage() {
      this.getVouchers(this.user.userName);
    },
  },

  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    ...mapActions("voucher", ["getVouchers"]),
  },
  computed: {
    ...mapGetters("voucher", ["vouchers", "pages"]),
    ...mapGetters("auth", ["carts", "user", "cart", "cartDetail"]),
  },

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    // this.$store.mapGetters.product.pages;
    this.getVouchers(this.user.userName);
    console.log(this.vouchers);
  },
  mounted() {},
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