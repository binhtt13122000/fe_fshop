<template>
  <v-app class="app">
    <Vm-header></Vm-header>
    <v-main>
      <v-container class="container" fluid>
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
                        <v-col cols="24" class="left-main-item">
                          <v-row>
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
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="confirmItemDialog(item)"
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
                                        v-slot:[`item.product.productImages[0].imgUrl`]="{
                                          item,
                                        }"
                                      >
                                        <a :href="'/products/' + item.proId">
                                          <img
                                            class="img-responsive"
                                            :src="
                                              item.product.productImages[0]
                                                .imgUrl
                                            "
                                            width="40%"
                                          />
                                        </a>
                                      </template>
                                      <template
                                        v-slot:[`item.orderItemPrice`]="{
                                          item,
                                        }"
                                      >
                                        {{ formatPrice(item.orderItemPrice) }}
                                      </template>
                                      <template
                                        v-slot:[`item.status`]="{ item }"
                                      >
                                        <v-chip
                                          :color="getColor(item.status)"
                                          dark
                                        >
                                          {{
                                            checkStatusOrderDetails(item.status)
                                          }}
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
                                      >Bạn có muốn xóa đơn hàng này
                                      không?</v-card-title
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
                            </v-data-table>
                            <div class="text-center pt-2">
                              <v-pagination
                                v-model="nextPage"
                                :length="this.pages.totalPages"
                                v-on:click="nextPage()"
                              ></v-pagination>
                            </div>
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
                        <v-col cols="24" class="left-main-item">
                          <v-row>
                            <v-data-table
                              :headers="headers"
                              :items="orders"
                              item-key="name2"
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
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="confirmItemDialog(item)"
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
                                        v-slot:[`item.product.productImages[0].imgUrl`]="{
                                          item,
                                        }"
                                      >
                                        <a :href="'/products/' + item.proId">
                                          <img
                                            class="img-responsive"
                                            :src="
                                              item.product.productImages[0]
                                                .imgUrl
                                            "
                                            width="40%"
                                          />
                                        </a>
                                      </template>
                                      <template
                                        v-slot:[`item.orderItemPrice`]="{
                                          item,
                                        }"
                                      >
                                        {{ formatPrice(item.orderItemPrice) }}
                                      </template>
                                      <template
                                        v-slot:[`item.status`]="{ item }"
                                      >
                                        <v-chip
                                          :color="getColor(item.status)"
                                          dark
                                        >
                                          {{
                                            checkStatusOrderDetails(item.status)
                                          }}
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
                                      >Bạn có muốn xóa đơn hàng này
                                      không?</v-card-title
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
                            </v-data-table>
                            <div class="text-center pt-2">
                              <v-pagination
                                v-model="nextPage"
                                :length="this.pages.totalPages"
                                v-on:click="nextPage()"
                              ></v-pagination>
                            </div>
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
                        <v-col cols="24" class="left-main-item">
                          <v-row>
                            <v-data-table
                              :headers="headers"
                              :items="orders"
                              item-key="name3"
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
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="confirmItemDialog(item)"
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
                                        v-slot:[`item.product.productImages[0].imgUrl`]="{
                                          item,
                                        }"
                                      >
                                        <a :href="'/products/' + item.proId">
                                          <img
                                            class="img-responsive"
                                            :src="
                                              item.product.productImages[0]
                                                .imgUrl
                                            "
                                            width="40%"
                                          />
                                        </a>
                                      </template>
                                      <template
                                        v-slot:[`item.orderItemPrice`]="{
                                          item,
                                        }"
                                      >
                                        {{ formatPrice(item.orderItemPrice) }}
                                      </template>
                                      <template
                                        v-slot:[`item.status`]="{ item }"
                                      >
                                        <v-chip
                                          :color="getColor(item.status)"
                                          dark
                                        >
                                          {{
                                            checkStatusOrderDetails(item.status)
                                          }}
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
                                      >Bạn có muốn xóa đơn hàng này
                                      không?</v-card-title
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
                            </v-data-table>
                            <div class="text-center pt-2">
                              <v-pagination
                                v-model="nextPage"
                                :length="this.pages.totalPages"
                                v-on:click="nextPage()"
                              ></v-pagination>
                            </div>
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
                        <v-col cols="24" class="left-main-item">
                          <v-row>
                            <v-data-table
                              :headers="headers"
                              :items="orders"
                              item-key="name3"
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
                                <v-icon
                                  small
                                  class="mr-2"
                                  @click="confirmItemDialog(item)"
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
                                        v-slot:[`item.product.productImages[0].imgUrl`]="{
                                          item,
                                        }"
                                      >
                                        <a :href="'/products/' + item.proId">
                                          <img
                                            class="img-responsive"
                                            :src="
                                              item.product.productImages[0]
                                                .imgUrl
                                            "
                                            width="40%"
                                          />
                                        </a>
                                      </template>
                                      <template
                                        v-slot:[`item.orderItemPrice`]="{
                                          item,
                                        }"
                                      >
                                        {{ formatPrice(item.orderItemPrice) }}
                                      </template>
                                      <template
                                        v-slot:[`item.status`]="{ item }"
                                      >
                                        <v-chip
                                          :color="getColor(item.status)"
                                          dark
                                        >
                                          {{
                                            checkStatusOrderDetails(item.status)
                                          }}
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
                                      >Bạn có muốn xóa đơn hàng này
                                      không?</v-card-title
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
                            </v-data-table>
                            <div class="text-center pt-2">
                              <v-pagination
                                v-model="nextPage"
                                :length="this.pages.totalPages"
                                v-on:click="nextPage()"
                              ></v-pagination>
                            </div>
                          </v-row>
                        </v-col>
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
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  components: { VmHeader, VmFooter },
  data: () => ({
    footerProps: { "items-per-page-options": [8] },
    dateFrom: "",
    dateTo: "",
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
    dateFormattedFrom: "",
    dateFormattedTo: "",
    tabs: null,
    items: ["Tất cả", "Chờ xác nhận", "Đã hủy", "Đã xác nhận"],
    select: "",
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
    dateFrom() {
      this.dateFormattedFrom = this.formatDate(this.dateFrom);
    },
    dateTo() {
      this.dateFormattedTo = this.formatDate(this.dateTo);
    },
  },
  methods: {
    ...mapActions("order", [
      "getOrders",
      "removeOrderByOrderId",
      "confirmOrder",
      "getOrderDetailByOrderId",
    ]),
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
  },

  computed: {
    ...mapGetters("auth", ["users", "user", "pages"]),
    ...mapGetters("order", ["orders", "pages", "orderDetails"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  created() {
    const credential = {
      username: this.user.userName,
      status: 2,
      dateFrom: "",
      dateTo: "",
      pageIndex: this.nextPage,
    };
    this.getOrders(credential);
    console.log(this.orderDetails);
  },
};
</script>