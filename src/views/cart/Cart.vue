<template>
  <div class="cart">
    <v-container fluid style="background-color: white">
      <!-- <h1>{{detail.product.productImages}}</h1> -->
      <v-row>
        <v-col style="background-color: rgb(255, 247, 245)">
          <v-row style="background-color: rgb(255, 237, 231)">
            <v-checkbox color="orange"></v-checkbox>
            <v-col>
              <div v-for="(img, i) in detail.product.productImages" :key="'A'+i">
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
              <p class="current-price">đ {{ detail.cartItemPrice }}</p>
              <p class="origin-price">
                đ {{ detail.product.realPrice + 20000 }}
              </p>
              <p class="promotion-ratio">-15%</p>
              <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
              <v-btn icon><v-icon>mdi-trash-can-outline</v-icon></v-btn>
            </v-col>
            <v-col class="cart-item-right">
              <v-btn class="btn-minus" v-on:click="decreaseValue()"
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: ["detail"],
  data: () => ({
    quantity: 1,
  }),
  methods: {
    increaseValue() {
      return this.quantity++;
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
  },
};
</script>

<style lang="scss">
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
</style>