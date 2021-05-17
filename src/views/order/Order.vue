<template>
  <v-app class="app">
    <Vm-header></Vm-header>
    <v-main>
      <v-container class="container" style="margin-top: 16px" fluid>
        <section class="container">
          <v-card>
            <v-toolbar color="blue-grey lighten-5" flat prominent>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateFormattedFrom"
                        label="Date From:"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="dateFrom = parseDate(dateFormattedFrom)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateFrom"
                      no-title
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" lg="6">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateFormattedTo"
                        label="Date To:"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="dateTo = parseDate(dateFormattedTo)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateTo"
                      no-title
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <template v-slot:extension>
                <v-tabs v-model="tabs" centered>
                  <v-tab
                    v-for="item in items"
                    :key="item"
                    @click="getOrderByUsername(item)"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-container class="container" fluid>
                      <section class="container">
                        <v-col cols="12" lg="12" class="left-main-item">
                          <v-row>
                            <Table
                              :headers="this.headers"
                              :headerOrderDetails="this.headerOrderDetails"
                              :footerProps="this.footerProps"
                              :dateFrom="this.dateFrom"
                              :stat="this.select"
                              :dateTo="this.dateTo"
                              :next="this.nextPage"
                            ></Table>
                          </v-row>
                        </v-col>
                      </section>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-container class="container" fluid>
                      <section class="container">
                        <v-row class="d-flex justify-content-center">
                          <v-col cols="12" lg="12" class="left-main-item">
                            <Table
                              :headers="this.headers"
                              :headerOrderDetails="this.headerOrderDetails"
                              :footerProps="this.footerProps"
                              :dateFrom="this.dateFrom"
                              :stat="this.select"
                              :dateTo="this.dateTo"
                              :next="this.nextPage"
                            ></Table>
                          </v-col>
                        </v-row>
                      </section>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-container class="container" fluid>
                      <section class="container">
                        <v-row class="d-flex justify-content-center">
                          <v-col cols="12" lg="12" class="left-main-item">
                            <Table
                              :headers="this.headers"
                              :headerOrderDetails="this.headerOrderDetails"
                              :footerProps="this.footerProps"
                              :dateFrom="this.dateFrom"
                              :stat="this.select"
                              :dateTo="this.dateTo"
                              :next="this.nextPage"
                            ></Table>
                          </v-col>
                        </v-row>
                      </section>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-container class="container" fluid>
                      <section class="container">
                        <v-row class="d-flex justify-content-center">
                          <v-col cols="12" lg="12" class="left-main-item">
                            <Table
                              :headers="this.headers"
                              :headerOrderDetails="this.headerOrderDetails"
                              :footerProps="this.footerProps"
                              :dateFrom="this.dateFrom"
                              :dateTo="this.dateTo"
                              :stat="this.select"
                              :next="this.nextPage"
                            ></Table>
                          </v-col>
                        </v-row>
                      </section>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          <!-- left main-->
        </section>
      </v-container>
    </v-main>
    <v-divider></v-divider>
    <VmFooter></VmFooter>
  </v-app>
</template>

<script>
import VmHeader from "../../components/Header.vue";
import VmFooter from "../../components/Footer.vue";
import Table from "../../components/Table.vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  components: { VmHeader, VmFooter, Table },
  data: () => ({
    footerProps: { "items-per-page-options": [8] },
    dateFrom: "",
    dateTo: "",
    dateFormattedFrom: "",
    dateFormattedTo: "",
    menu1: false,
    menu2: false,
    options: {},
    headers: [
      {
        text: "Mã đơn hàng",
        align: "start",
        value: "orderId",
      },
      { text: "Tên khách hàng", value: "fullname" },
      { text: "Số điện thoại", value: "phoneNumber" },
      { text: "Địa chỉ", value: "address" },
      { text: "Tổng tiền", value: "orderTotal" },
      { text: "Ngày mua", value: "createAt" },
      { text: "Giảm giá", value: "promotionId" },
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headerOrderDetails: [
      {
        text: "Hình ảnh",
        align: "start",
        value: "product.productImages[0].imgUrl",
      },
      { text: "Kích cỡ", align: "start", value: "orderSize" },
      { text: "Số lượng", align: "start", value: "orderItemQuan" },
      { text: "Giá", align: "start", value: "orderItemPrice" },
      { text: "Trạng thái", align: "start", value: "status" },
    ],
    nextPage: 1,
    dialogDelete: false,
    dialogConfirm: false,
    tabs: null,
    items: ["Tất cả", "Chờ xác nhận", "Đã hủy", "Đã xác nhận"],
    select: "",
  }),
  watch: {
    dateFrom() {
      this.dateFormattedFrom = this.formatDate(this.dateFrom);
    },
    dateTo() {
      this.dateFormattedTo = this.formatDate(this.dateTo);
    },
  },
  methods: {
    getOrderByUsername(item) {
      var status = 2;
      if (item === "Tất cả") {
        status = 2;
      } else if (item === "Chờ xác nhận") {
        status = 0;
      } else if (item === "Đã hủy") {
        status = -1;
      } else if (item === "Đã xác nhận") {
        status = 1;
      }
      this.nextPage = 1;
      this.select = item;
      const credential = {
        username: this.user.userName,
        status: status,
        dateFrom: this.formatDate(this.dateFrom),
        dateTo: this.formatDate(this.dateTo),
        pageIndex: this.nextPage,
      };
      this.getOrders(credential);
    },
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
    ...mapActions("order", [
      "getOrders",
      "removeOrderByOrderId",
      "confirmOrder",
      "getOrderDetailByOrderId",
    ]),
  },

  computed: {
    ...mapGetters("auth", ["users", "user", "pages"]),
    ...mapGetters("order", ["orders", "pages", "orderDetails"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  created() {
    if (!this.user) {
      this.$router.push("/loginpage");
    }
    const credential = {
      username: this.user.userName,
      status: 2,
      dateFrom: "",
      dateTo: "",
      pageIndex: this.nextPage,
    };
    this.getOrders(credential);
  },
};
</script>