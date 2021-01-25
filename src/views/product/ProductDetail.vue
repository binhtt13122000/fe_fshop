<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
        <VmHeader></VmHeader>
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
                  <v-col cols="12" md="8" xs="12" sm="12">
                    <!-- Create carouel -->
                    <!-- <div class="md-4 shadow-sm" > -->
                    <v-carousel
                      class="section-carousel"
                      style="width: 100%; height: auto"
                    >
                      <v-carousel-item
                        v-for="(productImage, i) in product.productImages"
                        :key="i"
                        :src="productImage.imgUrl"
                        alt="productImage.imgUrl"
                        cycle
                        hide-delimiter-background
                        show-arrows-on-hover
                      >
                      </v-carousel-item>
                    </v-carousel>
                    <v-card
                      v-for="(productImage, i) in product.productImages"
                      :key="i"
                      class="img-carouel"
                    >
                      <img
                        id="img-responsive"
                        class="mx-auto"
                        width="25%"
                        :src="productImage.imgUrl"
                      />
                    </v-card>

                    <br />
                    <!-- </div> -->
                    <v-tabs class="evaluate" background-color="indigo" dark>
                      <v-tab>Đánh giá</v-tab>
                      <v-tab-item>
                        <v-container fluid>
                          <v-row>
                            <v-container fluid>
                              <v-row>
                                <img
                                  src="https://i.pinimg.com/originals/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                                  alt="avatar"
                                  width="3%"
                                  height="3%"
                                />

                                <v-col>
                                  <v-form>
                                    <v-text-field hint="Add your comment">
                                    </v-text-field>
                                  </v-form>
                                </v-col>
                                <h2
                                  class="grey--text text--lighten-2 caption mr-2"
                                >
                                  ({{ rating }})
                                </h2>
                                <v-rating
                                  v-model="rating"
                                  background-color="black"
                                  color="yellow accent-4"
                                  dense
                                  half-increments
                                  hover
                                  size="20"
                                ></v-rating>
                              </v-row>
                            </v-container>
                          </v-row>
                        </v-container>
                      </v-tab-item>
                    </v-tabs>
                  </v-col>
                  <v-col cols="10" md="4" align="left">
                    <div class="sumary-inner"></div>
                    <div
                      class="size-inner"
                      style="font-family: 'Open Sans', sans-serif"
                    >
                      <h1>{{ product.productName }}</h1>
                      <!-- <p>{{ product.productDescription }}</p> -->
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="16"
                        ><v-spacer></v-spacer
                      ></v-rating>

                      <h4 class="price">
                        <br />
                        <span>Giá bán:</span>
                        {{ product.productPrice }}<u>đ</u>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                      </h4>
                      <v-divider></v-divider>
                      <br />
                      <v-form>
                        <v-row>
                          <v-col>
                            <div class="swatch-picker">
                              <p style="font-family: 'Open Sans', sans-serif">
                                Size:
                              </p>

                              <label>
                                <input
                                  type="radio"
                                  name="sel_size"
                                  value="S"
                                  checked="checked"
                                />
                                <span class="radio-size">S</span>
                              </label>
                              <label>
                                <input type="radio" name="sel_size" value="M" />
                                <span class="radio-size">M</span>
                              </label>
                              <label>
                                <input type="radio" name="sel_size" value="L" />
                                <span class="radio-size">L</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="sel_size"
                                  value="XL"
                                />
                                <span class="radio-size">XL</span>
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="sel_size"
                                  value="XXL"
                                />
                                <span class="radio-size">XXL</span>
                              </label>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="btn-quantity">
                            <span style="font-family: 'Open Sans', sans-serif"
                              >Quantity:
                            </span>
                            <v-btn
                              class="btn-minus"
                              v-on:click="decreaseValue()"
                              ><v-icon>mdi-minus</v-icon></v-btn
                            >
                            <input
                              v-model="quantity"
                              type="number"
                              id="number"
                              :min="1"
                              :max="100"
                            />
                            <!-- {{ quantity }} -->
                            <v-btn class="btn-plus" v-on:click="increaseValue()"
                              ><v-icon>mdi-plus</v-icon></v-btn
                            >
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-btn
                              id="btn-addToCart"
                              width="100%"
                              v-on:click="addToCard()"
                            >
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
                              Quy định đổi hàng: 4MenShop hỗ trợ Quý khách đổi
                              hàng 1 lần trong vòng 15 ngày theo biên lai giao
                              nhận. Không áp dụng với sản phẩm đã qua sử dụng,
                              hàng khuyến mãi, bị hư hại do tác nhân bên ngoài
                              hoặc đã quá thời gian đổi hàng theo quy định. Sản
                              phẩm cần đổi phải chưa qua sử dụng, còn nguyên tag
                              giá. Có hóa đơn mua hàng (kèm theo sản phẩm). Có
                              hóa đơn giao nhận. Sản phẩm mới phải có giá bằng
                              hoặc cao hơn sản phẩm đổi.
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels focusable>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              >HƯỚNG DẪN ĐẶT HÀNG</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                              Vui lòng chọn sản phẩm mà bạn thích. Sau đó vào
                              giỏ hảng, chọn thanh toán.
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
                                  ><v-icon size="23">mdi-google</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="23">mdi-facebook</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="23">mdi-instagram</v-icon></a
                                >
                                <a href=""
                                  ><v-icon size="23">mdi-twitter</v-icon></a
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
            <v-divider></v-divider>
            <div>
              <v-container>
                <h1>SẢN PHẨM TƯƠNG TỰ</h1>
                <v-carousel style="width: 100%; height: 350px">
                  <a :href="'/products/' + product.productId">
                    <v-carousel-item
                      v-for="(productImage, i) in product.productImages"
                      :key="i"
                      :src="productImage.imgUrl"
                      alt="productImage.imgUrl"
                      cycle
                      hide-delimiter-background
                      show-arrows-on-hover
                    >
                    </v-carousel-item>
                  </a>
                </v-carousel>
              </v-container>
            </div>
            <!-- Comment container -->
            <div>
              <v-container>
                <v-tabs class="comment" background-color="indigo" dark>
                  <v-tab>Bình luận</v-tab>

                  <v-tab-item>
                    <v-container fluid>
                      <v-row>
                        <v-col>
                          <!-- <h3>{{comment.length}}</h3> -->
                          <div class="comment-header" align="right">
                            <v-combobox
                              v-model="modelComment"
                              :items="itemComments"
                              hide-selected
                              dense
                              filled
                              label="Sắp xếp theo"
                              style="width: 20%"
                            ></v-combobox>
                          </div>

                          <v-container fluid>
                            <v-row>
                              <img
                                src="https://i.pinimg.com/originals/8f/33/30/8f3330d6163782b88b506d396f5d156f.jpg"
                                alt="avatar"
                                width="3%"
                                height="3%"
                              />

                              <v-col>
                                <v-form>
                                  <v-text-field hint="Add your comment">
                                  </v-text-field>
                                </v-form>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-tab-item>
                </v-tabs>
              </v-container>
            </div>
          </div>
        </v-main>

        <!-- V-footer  ------->
        <v-divider></v-divider>
        <VmFooter></VmFooter>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
export default {
  props: {
    source: String,
  },
  components: {VmFooter, VmHeader},
  data: () => ({
    modelSize: "Size",
    badgeCart: 1,
    modelQuantity: "Quantity",
    modelComment: ["Mới nhất"],
    quantity: 1,
    size: 1,
    drawer: null,
    rating: 5,
    tab: null,
    itemComments: ["Mới nhất", "Cũ"],
    itemTabs: ["Đánh giá", "Bình luận"],
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
    increaseValue() {
      return this.quantity++;
    },

    decreaseValue() {
      if (this.quantity <= 1) {
        return (this.quantity = 1);
      } else {
        return this.quantity--;
      }
    },
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    changeFavourite() {
      if (this.isFavourite == true) {
        this.isFavourite = false;
      } else if (this.isFavourite == false) {
        this.isFavourite = true;
      }
    },
    addToCart() {
      console.log(this.badgeCart);
      return this.badgeCart++;
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

// Size-inner
.size-inner {
  .price {
    color: #ff0000;
  }

  .price span {
    color: #000000;
  }
}

.swatch-picker {
  p {
    display: inline-block;
    text-align: left;
    padding-right: 20px;
  }
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
  .radio-size {
    padding-top: 7px;
    background-color: #000000;
  }

  span {
    display: block;
    color: #ffffff;
    text-align: center;
    justify-content: center;
    //  text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    border-radius: 50%;
    bottom: 10px;
    left: 10;
    height: 100%;
    width: 100%;
  }

  input {
    -webkit-appearance: none;
  }

  input:checked + span {
    padding-top: 3px;
    border: 3px solid rgb(177, 177, 177);
    background-color: rgb(177, 177, 177);
    border: 3px solid rgb(177, 177, 177);
  }
}

.comment {
  border: 1px solid rgba(192, 192, 192, 0.849);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#footer-center .mx-auto {
  display: inline-table;
  align-items: center;
  padding: 5px;
}
#number {
  box-sizing: border-box;
  height: 36px;
  padding-bottom: 4px;
  border-radius: 3px;
  border: 2px solid #c7c7c7;
  text-align: center;
  box-shadow: 0 0 10px 4px 0 0 10px 30px, 30px 0 20px 30px;
}

.btn-quantity .btn-minus {
  -moz-box-shadow: 0px 0px #666;
  -webkit-box-shadow: 0px 0px #666;
  box-shadow: 0px 0px #666;
  border: 1px solid #c7c7c7;
  // border-radius: 10px;
}

.btn-quantity .btn-plus {
  -moz-box-shadow: 0px 0px #666;
  -webkit-box-shadow: 0px 0px #666;
  box-shadow: 0px 0px #666;
  border: 1px solid #c7c7c7;
  // border-radius: 10px;
}

.img-carouel {
  display: inline;
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