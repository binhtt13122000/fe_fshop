  <template>
  <div>
    <div>
      <v-card class="mx-4 mb-4" style="border-radius: 14px; width: 300px">
        <div class="md-4 shadow-sm" id="button-container">
          {{ voucher.promotionName }}
        </div>
        <div class="media">
          <div class="media-info">
            <h3
              style="font-family: 'Open Sans', sans-serif; margin-left: 11px"
              class="price"
            >
              <input
                type="text"
                :value="voucher.promotionID"
                :id="voucher.promotionID"
              />
              <v-chip :color="getColor(voucher.status)" dark>
                {{ formatStatus(voucher.status) }}
              </v-chip>
              <v-btn
                depressed
                rounded
                v-show="voucher.status == 1"
                @click="getCode(voucher.promotionID)"
              >
                Get code
              </v-btn>
              <v-spacer></v-spacer>
            </h3>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
export default {
  name: "voucher",
  props: ["voucher"],
  mixins: [validationMixin],

  validations: {
    quantity: {
      between(value) {
        return between(1, this.totalQuantity)(value);
      },
    },
    productDetailSize: { required },
    productCart: { required },
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions("auth", ["addProductInCartDetail"]),
    ...mapActions("order", ["setMaxQuantity"]),
    formatStatus(status) {
      console.log(status == 1);
      if (status == 1) {
        return "Được sử dụng";
      } else {
        return "Hết hạn sử dụng";
      }
    },
    getColor(status) {
      if (status == 1) {
        return "green";
      } else {
        return "red";
      }
    },
    getCode(promotionID) {
      let copyCode = document.getElementById(promotionID);
      copyCode.select();
      document.execCommand("copy");
      console.log(copyCode);
    },
  },
  computed: {
    ...mapGetters("auth", ["cart", "carts", "user"]),
    ...mapGetters("order", ["status", "maxQuantity"]),
  },
  mounted() {
    // this.$store.state.auth.cart
  },
};
</script>
<style lang="scss">
.title {
  color: #000000;
}

#button-container {
  position: relative;
  display: inline-block;
  font-size: 200%;
  color: orange;
  margin: 20px;
}

.media-info {
  text-align: center;
  margin: 3%;
  padding-bottom: 16px;
}

.media-info .price {
  color: #ff0000;
}

#btn-addToCart {
  background-color: #ff0000;
  color: #ffffff;

  &#btn-addToCart:hover {
    background-color: #000000;
  }
}
</style>