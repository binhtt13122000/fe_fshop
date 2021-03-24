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
              v-for="(detail, i) in this.cartDetail"
              :key="i"
            >
              <h1 v-if="i == 0">{{ detail.cart.cartDescription }}</h1>
            </v-col>

            <v-spacer></v-spacer>
            <v-col style="background-color: #ffffff" cols="12">
              <v-checkbox label="SELECT ALL" v-model="checkbox"></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              align-content="center"
              justify="center"
              v-for="detail in this.cartDetail"
              :key="detail.cartItemId"
            >
              <!-- <VmCart :detail="detail" v-model="checkbox"></VmCart> -->
              <v-container fluid style="background-color: white">
                <!-- <h1>{{detail.product.productImages}}</h1> -->
                <v-row>
                  <v-col style="background-color: rgb(255, 247, 245)">
                    <v-row style="background-color: rgb(255, 237, 231)">
                      <v-checkbox color="orange"></v-checkbox>
                      <v-col>
                        <div
                          v-for="(img, i) in detail.product.productImages"
                          :key="'A' + i"
                        >
                          <a :href="'/products/' + img.productId">
                            <img
                              v-if="i == 0"
                              class="img-responsive"
                              :src="img.imgUrl"
                              width="50%"
                            />
                          </a>
                        </div>
                      </v-col>
                      <v-col>
                        <div class="cart-item-left" align="left">
                          <a
                            class="proName"
                            :href="'/products/' + detail.product.productId"
                          >
                            <img
                              src="https://gcp-img.slatic.net/lazada/id0078489-36-18.png#width=36&height=18"
                              alt=""
                            />
                            {{ detail.product.productName }}
                          </a>
                          <p>
                            {{ detail.product.productDescription }},Size:
                            {{ detail.cartSize }}
                          </p>
                          <p class="combo-Promo-text">Enjoyed discount</p>
                          <img
                            src="https://img.alicdn.com/tfs/TB1qcanWAT2gK0jSZFkXXcIQFXa-60-37.png"
                            alt=""
                          />
                        </div>
                      </v-col>
                      <v-col class="cart-item-middle">
                        <p class="current-price">
                          đ {{ detail.cartItemPrice }}
                        </p>
                        <p class="origin-price">
                          đ {{ detail.product.realPrice + 20000 }}
                        </p>
                        <p class="promotion-ratio">-15%</p>
                        <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
                        <v-btn icon
                          ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                        >
                      </v-col>
                      <v-col class="cart-item-right">
                        <v-btn
                          class="btn-minus"
                          v-on:click="decreaseValue(detail)"
                          ><v-icon>mdi-minus</v-icon></v-btn
                        >
                        <input
                          type="number"
                          id="number"
                          :min="1"
                          :max="100"
                          :value="detail.cartQuantity"
                        />
                        <!-- {{ quantity }} -->
                        <v-btn
                          class="btn-plus"
                          v-on:click="increaseValue(detail)"
                          ><v-icon>mdi-plus</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
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
            <v-container>
              <v-col cols="12" style="background-color: #ffffff">
                <v-row>
                  <v-col cols="12" sm="6"> </v-col>
                  <v-col cols="12" sm="6">
                    <v-card class="order" width="600px">
                      <h1>Order summary</h1>
                      <v-col
                        cols="12"
                        align-content="center"
                        justify="center"
                        v-for="(detail, i) in this.cartDetail"
                        :key="i"
                      >
                        <p v-if="i == 0">
                          Subtotal(item):<u>đ</u
                          ><span>{{ detail.cart.cartTotal }}</span>
                        </p>
                      </v-col>
                      <v-row class="order-item">
                        <v-col cols="12"
                          ><p>
                            Discount:<span>{{ 15 }}%</span>
                          </p></v-col
                        >
                        <v-col cols="12"
                          ><input
                            id="voucher-code"
                            type="text"
                            placeholder="Enter voucher code"
                          /><v-btn color="primary">Apply</v-btn></v-col
                        >
                        <v-col cols="12">
                          <!-- <p>
                          Total:<u>đ</u
                          ><span>{{ (detail.product.realPrice * 85) / 100 }}</span>
                        </p> -->
                        </v-col>
                        <v-col cols="12"
                          ><v-btn
                            class="order-btn"
                            color="#ffa500"
                            @click="createOrder()"
                            >Place order</v-btn
                          ></v-col
                        >
                      </v-row>
                    </v-card>
                  </v-col> </v-row
                >f
              </v-col>
            </v-container>
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
// import VmCart from "./Cart.vue";
export default {
  components: { VmFooter, VmHeader },

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
    quantity: 1,
    userLogo: "",
    images: [],
    isValid: false,
    isAccount: false,
    mainImageSrc: null,
    idCart: "",
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
      return this.user.username;
    },
    ...mapActions("auth", [
      "getCartDetail",
      "changeQuantityProductInCartDetails",
    ]),
    ...mapActions("order", ["createOrdersByCart"]),
    increaseValue(item) {
      const credential = {
        username: this.user.userName,
        cartDetailId: item.cartItemId,
        productId: item.proId,
        productSize: item.cartSize,
        quantity: item.cartQuantity + 1,
      };
      this.changeQuantityProductInCartDetails(credential);
    },
    changeQuantity() {
      this.quantity = this.detail.cartQuantity;
    },
    decreaseValue() {
      if (this.quantity <= 1) {
        return (this.quantity = 1);
      } else {
        return this.quantity--;
      }
    },
    createOrder() {
      const credential = {
        cartId: this.idCart,
        username: this.user.userName,
        name: this.user.name,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        country: this.user.country,
        address: this.user.address,
      };
      this.createOrdersByCart(credential);
      // if (this.status === 200) {
      //this.dialogSuccess();
      //} else if (this.status === 400) {
      // this.dialogError();
      //}
    },
  },

  mounted() {
    const credential = {
      userName: this.user.userName,
      idCart: this.$route.params.idCart,
    };
    (this.idCart = this.$route.params.idCart), this.getCartDetail(credential);
    console.log(this.cartDetail);
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

.cart {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Helvetica Neue,
    Helvetica, sans-serif;
}
.cart-item-left {
  align: left;
  a {
    color: #000000;
  }
  .proName {
    text-decoration: none;
    color: #000000;
    font: 2em sans-serif;
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
  background: linear-gradient(45deg, #ff7094, #f10653);
}
.cart-item-right {
  #number {
    background-color: #fff;
  }
}

.cart-item-middle {
  font-family: Roboto-Regular, "Helvetica Neue", Helvetica, Tahoma, Arial,
    Sans-serif;
  .current-price {
    font-size: 25px;
    line-height: 28px;
    color: #f57224;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .origin-price {
    font-size: 20px;
    line-height: 16px;
    color: #757575;
    margin-bottom: 8px;
    text-decoration: line-through;
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






