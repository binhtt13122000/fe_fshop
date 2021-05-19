<template>
  <div id="app">
    <v-app id="inspire">
      <VmHeader></VmHeader>
      <div>
        <v-main>
          <v-container>
            <v-form>
              <div id="app">
                <v-app id="inspire">
                  <v-data-table
                    :headers="headers"
                    :items="desserts"
                    sort-by="calories"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>My CRUD</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                    </template>
                  </v-data-table>
                </v-app>
              </div>
            </v-form>
          </v-container>
        </v-main>
      </div>
      <VmFooter></VmFooter>
    </v-app>
  </div>
</template>

<script>
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/Header.vue";
export default {
  name: "detail",
  props: ["detail"],
  components: { VmFooter, VmHeader },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "IMAGE",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "PRODUCT NAME", value: "productName" },
      { text: "UNTIL PRICE", value: "price" },
      { text: "QUANTITY", value: "quantity" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
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
    background-color: #ffffff;
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