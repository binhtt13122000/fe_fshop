<template>
  <v-app class="app">
    <Vm-header></Vm-header>
    <v-main>
      <v-container class="container" fluid>
        <section class="container">
          <v-row>
            <v-col cols="6" md="3" sm="3" class="right-main-item">
              <h1 class="hidden-md-and-down mb-6 ml-6">Hóa đơn</h1>
              <v-col cols="12" class="hidden-md-and-down">
                <v-card>
                  <v-list-group :value="true">
                    <template v-slot:activator>
                        <v-list-item-content
                            class="font-weight-medium"
                            align="left"
                        >
                            <v-list-item-title style="color: black"
                            >Trạng thái</v-list-item-title
                            >
                        </v-list-item-content>
                        <v-list>
                            <v-list-item></v-list-item>
                        </v-list>
                    </template>
                    <v-container>
                      <v-checkbox
                        dense
                        label="Hàng hóa"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        dense
                        label="Dịch vụ"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        dense
                        label="Khuyến mãi"
                        hide-details
                      ></v-checkbox>
                    </v-container>
                  </v-list-group>
                </v-card>
              </v-col>
              <v-col cols="12" class="hidden-md-and-down">
                <v-card>
                  <v-list-group :value="true">
                    <template v-slot:activator>
                      <v-list-item-content
                        class="font-weight-medium"
                        align="left"
                      >
                        <v-list-item-title style="color: black"
                          >Trạng thái giao hàng</v-list-item-title
                        >
                      </v-list-item-content>
                      <v-list>
                        <v-list-item></v-list-item>
                      </v-list>
                    </template>
                    <v-container>
                      <v-checkbox
                        dense
                        label="Hàng hóa"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        dense
                        label="Dịch vụ"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        dense
                        label="Khuyến mãi"
                        hide-details
                      ></v-checkbox>
                    </v-container>
                  </v-list-group>
                </v-card>
              </v-col>
            </v-col>
            <!-- left main-->
            <v-col cols="9" class="left-main-item">
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
                  v-model="selected"
                  :headers="headers"
                  :items-per-page="10"
                  :items="desserts"
                  item-key="name"
                  width="10%"
                  class="elevation-1"
                  :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus',
                  }"
                >
                  <template v-slot:top>
                    <!-- <v-toolbar>
                      <v-toolbar-title>Hóa đơn</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer> -->
                    <v-dialog v-model="dialogEdit" width="800px">
                      <!-- <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="success"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-plus</v-icon>
                            Chỉnh sửa hóa đơn
                          </v-btn>
                        </template> -->
                      <v-card>
                        <v-card-title class="blue darken-1">
                          {{ title }}
                        </v-card-title>
                        <v-tabs v-model="addTab">
                          <v-tab>Thông tin</v-tab>
                          <v-tab>Mô tả chi tiết</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="addTab">
                          <v-tab-item v-for="n in 2" :key="n">
                            <v-container v-if="n === 1">
                              <v-row class="mx-2">
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="editedItem.phoneNumber"
                                    label="Số điện thoại"
                                    append-outer-icon="mdi-information"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    label="Địa chỉ"
                                    v-model="editedItem.address"
                                    append-outer-icon="mdi-information"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="editedItem.promotionId"
                                    label="Giảm giá"
                                    append-outer-icon="mdi-information"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="editedItem.sellerId"
                                    label="Người bán"
                                    append-outer-icon="mdi-information"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="editedItem.status"
                                    label="Trạng thái"
                                    append-outer-icon="mdi-information"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                            <v-container v-else>
                              <v-textarea
                                label="Mô tả"
                                auto-grow
                                outlined
                                rows="3"
                                row-height="30"
                                shaped
                              ></v-textarea>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">
                                Cancel
                              </v-btn>
                              <v-btn color="blue darken-1" text @click="save">
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-card>
                    </v-dialog>
                    <!-- delete -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title class="headline blue darken-1"
                          >Bạn có muốn đơn hàng này không?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
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
                    <v-icon small class="mr-2" @click="editItem(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon small class="mr-2" @click="deleteItem(item)"
                      >mdi-delete</v-icon
                    >
                    <v-icon small class="mr-2">mdi-information-outline</v-icon>
                  </template>
                </v-data-table>
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
export default {
  components: { VmHeader, VmFooter },
  data: () => ({
    dialogDelete: false,
    dialogEdit: false,
    desserts: [],
    selected: [],
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
    headers: [
      {
        text: "Mã hóa đơn",
        align: "start",
        value: "orderId",
      },
      { text: "Mã khách hàng", value: "userId" },
      { text: "Tên khách hàng", value: "fullName" },
      { text: "Số điện thoại", value: "phoneNumber" },
      { text: "Địa chỉ", value: "address" },
      { text: "Tổng tiền", value: "orderTotal" },
      { text: "Ngày mua", value: "createAt" },
      { text: "Giảm giá", value: "promotionId" },
      { text: "Giá trị thực", value: "realTotal" },
      { text: "Người bán", value: "sellerId" },
      { text: "Bán trực tiếp", value: "isOnline" },
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  watch: {
    dialogEdit(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    loadItem() {
      this.desserts = [
        {
          orderId: "1",
          userId: "1",
          fullName: "Nhan",
          phoneNumber: "0889386214",
          address: "nhanle",
          orderTotal: 323232,
          createAt: "23/02/2021",
          promotionAt: "23/02/2021",
          realTotal: 32320,
          sellerId: "22",
          isOnline: 1,
          status: 1,
        },
      ];
    },
    // Close
    close() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
  },
  created() {
    this.loadItem();
  },
};
</script>