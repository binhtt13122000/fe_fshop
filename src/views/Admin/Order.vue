<template>
  <v-app class="app">
    <Vm-header></Vm-header>
    <v-main>
      <v-container class="container" fluid>
        <section class="container">
          <v-row>
            <!-- left main-->
            <v-col cols="24" class="left-main-item">
              <v-row class="left-main-item">
                <v-text-field
                  prepend-icon="mdi-magnify"
                  solo-inverted
                  hide-details=""
                  label="Tìm theo mã hóa đơn"
                  class="hidden-md-and-down mx-3"
                >
                </v-text-field>
                <v-menu open-on-hover bottom offset-y rounded>
                  <template v-slot:activator="{ on, attrs }" v-on="on">
                    <v-btn color="success" v-bind="attrs" v-on="on">
                      <v-icon>mdi-plust</v-icon>Thêm mới
                      <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-list></v-list>
                </v-menu>
                <v-btn color="success" class="mx-2"
                  ><v-icon>mdi-application-import</v-icon>Import</v-btn
                >
                <v-btn color="success"
                  ><v-icon>mdi-file-move-outline</v-icon>Xuất File</v-btn
                >
              </v-row>
              <br />
              <v-row>
                <v-data-table
                  :headers="headers"
                  :items-per-page="10"
                  :items="orders"
                  item-key="name"
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
                    {{ formatDate(item.createAt) }}
                  </template>
                  <template v-slot:[`item.online`]="{ item }">
                    <v-chip :color="getColorIsOnline(item.online)" dark>
                      {{ item.online }}
                    </v-chip>
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
                          <template v-slot:[`item.orderItemPrice`]="{ item }">
                            {{ formatPrice(item.orderItemPrice) }}
                          </template>
                          <template v-slot:[`item.status`]="{ item }">
                            <v-chip :color="getColor(item.status)" dark>
                              {{ checkStatusOrderDetails(item.status) }}
                            </v-chip>
                          </template>
                        </v-data-table>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeConfirmDialog()"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="approveItemConfirm()"
                          >
                            Confirm
                          </v-btn>
                        </v-card-actions>
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
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeDeleteDialog()"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm()"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- </v-toolbar> -->
                  </template>
                  <!--  icon for each rows of data -->
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="confirmItemDialog(item)"
                      v-if="item.status != -1"
                      >mdi-checkbox-marked-circle-outline</v-icon
                    >
                    <v-icon
                      small
                      class="mr-2"
                      v-show="item.status !== -1"
                      @click="deleteItemDialog(item)"
                      v-if="item.status != -1"
                      >mdi-delete</v-icon
                    >
                    <v-icon small class="mr-2">mdi-information-outline</v-icon>
                  </template>
                </v-data-table>
                <div class="text-center pt-2">
                  <v-pagination
                    v-model="currentPage"
                    :length="this.pages.totalPages"
                    v-on:click="currentPage()"
                  ></v-pagination>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-main>
    <v-divider></v-divider>
    <VmFooter></VmFooter>
  </v-app>
</template>

<script>
import VmHeader from "../../components/HeaderAdmin.vue";
import VmFooter from "../../components/Footer.vue";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { VmHeader, VmFooter },
  data: () => ({
    dialogDelete: false,
    dialogConfirm: false,
    desserts: [],
    itemSelected: {},
    editedIndex: -1,
    editedItem: {
      orderId: "",
      userId: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      orderTotal: 0,
      createAt: "",
      promotionAt: "",
      realTotal: 0,
      sellerId: "",
      isOnline: 1,
      status: 1,
    },
    currentPage: 1,
    priceFrom: "",
    priceTo: "",
    dateFrom: "",
    dateTo: "",
    headers: [
      {
        text: "Mã đơn hàng",
        align: "start",
        value: "orderId",
      },
      { text: "Mã khách hàng", value: "userId" },
      { text: "Tên khách hàng", value: "fullname" },
      { text: "Số điện thoại", value: "phoneNumber" },
      { text: "Địa chỉ", value: "address" },
      { text: "Tổng tiền", value: "orderTotal" },
      { text: "Ngày mua", value: "createAt" },
      { text: "Giảm giá", value: "promotionId" },
      { text: "Bán trực tiếp", value: "online" },
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headerOrderDetails: [
      { text: "Mã order detail", align: "start", value: "orderItemId" },
      { text: "Kích cỡ", align: "start", value: "orderSize" },
      { text: "Số lượng", align: "start", value: "orderItemQuan" },
      { text: "Giá", align: "start", value: "orderItemPrice" },
      { text: "Trạng thái", align: "start", value: "status" },
    ],
  }),
  watch: {
    dialogEdit(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog();
    },
    currentPage() {
      const credential = {
        username: this.user.userName,
        status: 2,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        pageIndex: this.currentPage,
      };
      this.getOrders(credential);
    },
  },
  methods: {
    ...mapActions("order", [
      "getOrders",
      "removeOrderByOrderId",
      "confirmOrder",
      "getOrderDetailByOrderId",
    ]),
    currentPage() {
      const credential = {
        username: this.user.userName,
        status: 2,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        pageIndex: this.currentPage,
      };
      this.getOrders(credential);
    },
    formatDate(value) {
      return moment(value).format("HH:mm:ss MM/DD/YYYY");
    },
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  },

  computed: {
    ...mapGetters("auth", ["users", "user", "pages"]),
    ...mapGetters("order", ["orders", "pages", "orderDetails"]),
  },

  created() {
    const credential = {
      username: this.user.userName,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      pageIndex: this.currentPage,
      status: 2,
    };
    this.getOrders(credential);
  },
};
</script>