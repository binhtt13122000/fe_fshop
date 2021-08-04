<template>
  <div>
    <v-data-table
      :headers="headers"
      :footer-props="footerProps"
      :items="orders"
      item-key="name1"
      width="10%"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:[`item.orderTotal`]="{ item }">
        {{ formatPrice(item.orderTotal) }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="getColor(item.status)" dark>
          {{ checkStatusOrder(item.status) }}
        </v-chip>
      </template>
      <template v-slot:[`item.createAt`]="{ item }">
        {{ formatDateCustom(item.createAt) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="confirmItemDialog(item)"
          >mdi-information-outline</v-icon
        >
        <v-icon
          small
          class="mr-2"
          v-show="item.status !== -1"
          @click="deleteItemDialog(item)"
          v-if="item.status != -1"
          >mdi-delete</v-icon
        >
      </template>
      <template v-slot:top>
        <v-dialog v-model="dialogConfirm" width="800px">
          <v-card>
            <v-card-title class="blue darken-1">
              Thông tin chi tiết của đơn hàng:
            </v-card-title>
            <v-data-table
              :headers="headerOrderDetails"
              :items-per-page="10"
              :items="orderDetails"
              item-key="name"
              width="10%"
              class="elevation-1"
              hide-default-footer
            >
              <template
                v-slot:[`item.product.productImages[0].imgUrl`]="{ item }"
              >
                <a :href="'/products/' + item.proId">
                  <img
                    class="img-responsive"
                    :src="item.product.productImages[0].imgUrl"
                    width="40%"
                  />
                </a>
              </template>
              <template v-slot:[`item.orderItemPrice`]="{ item }">
                {{ formatPrice(item.orderItemPrice) }}
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                  {{ checkStatusOrderDetails(item.status) }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog
          v-model="dialogDelete"
          transition="dialog-top-transition"
          max-width="500px"
        >
          <v-card>
            <v-card-title class="headline blue darken-1"
              >Bạn có muốn xóa đơn hàng này không?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteDialog()"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- </v-toolbar> -->
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="nextPage"
        :length="this.pages.totalPages"
        v-on:click="nextPage()"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Table",
  props: [
    "headers",
    "footerProps",
    "stat",
    "next",
    "headerOrderDetails",
    "dateFrom",
    "dateTo",
  ],
  data: () => ({
    nextPage: 1,
    dialogDelete: false,
    dialogConfirm: false,
    dateFormattedFrom: "",
    dateFormattedTo: "",
    tabs: null,
    items: ["Tất cả", "Chờ xác nhận", "Đã hủy", "Đã xác nhận"],
    select: "",
    status: "",
  }),
  watch: {
    dialogEdit(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog();
    },
    nextPage() {
      var status = 2;
      if (this.select === "Tất cả") {
        status = 2;
      } else if (this.select === "Chờ xác nhận") {
        status = 0;
      } else if (this.select === "Đã hủy") {
        status = -1;
      } else if (this.select === "Đã xác nhận") {
        status = 1;
      }
      const credential = {
        username: this.user.userName,
        status: status,
        dateFrom: this.formatDate(this.dateFrom),
        dateTo: this.formatDate(this.dateTo),
        pageIndex: this.nextPage,
      };
      this.getOrders(credential);
    },
  },
  computed: {
    ...mapGetters("auth", ["users", "user"]),
    ...mapGetters("order", ["orders", "pages", "orderDetails"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  methods: {
    formatDateCustom(value) {
      return moment(value).format("HH:mm:ss MM/DD/YYYY");
    },
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(date) {
      if (!date) return "";

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    checkStatusOrder(value) {
      if (value > 0) return "Đã xác nhận";
      if (value === -1) return "Đã xóa";
      if (value === 0) return "Đang chờ";
    },
    checkStatusOrderDetails(value) {
      if (value == 1) return "Active";
      if (value == 0) return "Delete";
    },
    getColor(status) {
      if (status === 1) return "green";
      if (status === -1) return "red";
      return "electric blue";
    },
    getColorIsOnline(status) {
      if (status) return "lime";
      return "cyan";
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
      this.itemSelected = {};
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    deleteItemDialog(item) {
      this.itemSelected = item;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      const credential = {
        orderId: this.itemSelected.orderId,
        username: this.user.userName,
      };
      this.removeOrderByOrderId(credential);
      this.closeDeleteDialog();
    },
    closeConfirmDialog() {
      this.dialogConfirm = false;
      this.itemSelected = {};
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    confirmItemDialog(item) {
      const credential = {
        username: this.user.userName,
        orderId: item.orderId,
      };
      this.getOrderDetailByOrderId(credential);
      this.itemSelected = item;
      this.dialogConfirm = true;
    },
    approveItemConfirm() {
      const credential = {
        orderId: this.itemSelected.orderId,
        username: this.user.userName,
      };
      this.confirmOrder(credential);
      this.closeConfirmDialog();
    },
    nextPage() {
      var status = 2;
      if (this.select === "Tất cả") {
        status = 2;
      } else if (this.select === "Chờ xác nhận") {
        status = 0;
      } else if (this.select === "Đã hủy") {
        status = -1;
      } else if (this.select === "Đã xác nhận") {
        status = 1;
      }
      const credential = {
        username: this.user.userName,
        status: status,
        dateFrom: this.formatDate(this.dateFrom),
        dateTo: this.formatDate(this.dateTo),
        pageIndex: this.nextPage,
      };
      this.getOrders(credential);
    },
    ...mapActions("order", [
      "getOrders",
      "removeOrderByOrderId",
      "confirmOrder",
      "getOrderDetailByOrderId",
    ]),
  },
  created() {
    this.select = this.stat;
    this.nextPage = this.next;
  },
};
</script>

<style>
</style>