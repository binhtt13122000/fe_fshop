<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
        <!-- Navigation bar -->
        <VmHeader></VmHeader>
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
                v-for="item in products"
                :key="item.productId"
              >
                <VmProduct :product="item"></VmProduct>
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
    <!-- </v-app> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
import VmProduct from "./Product.vue";

// import Pagination from "./Pagination.vue";
export default {
  components: { VmProduct, VmFooter, VmHeader },
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
    ...mapGetters("auth", ["carts", "user", "cart", "cartDetail"]),
    // ...mapState("auth", ["carts", "user", "cart"]),
  },

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    // this.$store.mapGetters.product.pages;
    this.getProducts(this.currenPage);
  },
  mounted() {
    console.log("From product list");
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