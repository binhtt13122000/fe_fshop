  <template>
  <div>
    <v-card
      class="mb-4"
      style="
        border-radius: 14px;
        max-width: 250px;
        text-align: center;
        height: 100%;
      "
    >
      <div class="md-4 shadow-sm" id="button-container">
        {{ voucher.promotionName }}
      </div>
      <div class="media">
        <v-row>
          <v-col md="12">
            <v-text-field
              :value="voucher.promotionID"
              :id="voucher.promotionID"
              class="promoId"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

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
      </div>
    </v-card>
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
    },
  },
  computed: {
    ...mapGetters("auth", ["cart", "carts", "user"]),
    ...mapGetters("order", ["status", "maxQuantity"]),
  },
  mounted() {
    // this.$store.state.auth.cart
  },
  created() {
    if (!this.user) {
      this.$router.push("/loginpage");
    }
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
  font-size: 24px;
  color: orange;
  margin: 20px;
}

.media {
  text-align: center;
  padding-bottom: 16px;
}

.media .promoId {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  width: 100%;
  text-align: center;
  display: block;
}
</style>