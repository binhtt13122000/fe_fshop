<template>
  <v-app id="insprice">
    <VmHeader></VmHeader>
    <v-main>
      <v-container class="container" fluid>
        <section class="container">
          <v-row>
            <!-- right main 
              ---
            -->
            <v-col md="3" sm="3" class="right-main-item">
              <h1 class="hidden-md-and-down mb-6 ml-6" align="left">
                Hàng hóa
              </h1>
              <v-col cols="12" class="hidden-md-and-down">
                <v-card>
                  <v-list-group :value="true">
                    <template v-slot:activator>
                      <v-list-item-content
                        class="font-weight-medium"
                        align="left"
                      >
                        <v-list-item-title style="color: black"
                          >Nhóm khách hàng
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                    

                    <v-container>
                      <v-text-field
                        flat
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        label="Tìm kiếm loại hàng"
                      ></v-text-field>
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
                          >Lựa chọn hiển thị</v-list-item-title
                        >
                      </v-list-item-content>
                    </template>
                    <v-container>
                      <v-radio-group v-model="radioShow">
                        <v-radio
                          label="Tất cả"
                          value="isOnSale"
                        ></v-radio>
                        <v-radio
                          label="Đang hoạt động"
                          value="isOffSale"
                        ></v-radio>
                        <v-radio
                          label="Ngừng hoạt động"
                          value="all"
                        ></v-radio>
                      </v-radio-group>
                    </v-container>
                  </v-list-group>
                </v-card>
              </v-col>
            </v-col>
            <!-- left main 
              ---
            -->
            <v-col width="800px">
              <v-row class="left-main-item" width="800px">
                <v-text-field
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Theo tên, mã khách hàng"
                  class="hidden-md-and-down mx-3"
                  style="width: 50px"
                ></v-text-field>

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
                  :items="desserts"
                  :items-per-page="5"
                  item-key="name"
                  width="800px"
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
                    <v-toolbar>
                      <v-toolbar-title>Khách hàng</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>

                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="headline blue darken-1"
                            >Are you sure you want to delete
                            product?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeDelete"
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
                    </v-toolbar>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="deleteItem(item)">
                      mdi-block-helper
                    </v-icon>
                    <v-icon small class="mr-2" @click="infoItem(item)"
                      >mdi-information-outline</v-icon
                    >
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="error" @click="initialize"> Reset </v-btn>
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
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/HeaderAdmin.vue";
export default {
  components: { VmFooter, VmHeader },
  data: () => ({
    el: 1,
    imgUrlRules: [
      (value) =>
        !value ||
        value.size < 5000000 ||
        "Avatar size should be less than 5MB!",
    ],
    radio: "all",
    radioShow: "isOnSale",
    addTab: null,
    desTab: null,
    upHere: false,
    singleSelect: false,
    dialogSupplier: false,
    dialogType: false,
    dialogEdit: false,
    dialog: false,
    dialogPromo: false,
    dialogAdd: false,
    dialogDelete: false,
    editedIndex: -1,
    selected: [],
    itemAdd: [
      { icon: "mdi-plus", text: "Thêm hàng hóa" },
      { icon: "mdi-plus", text: "Thêm khuyến mãi" },
    ],
    headers: [
      {
        text: "Mã khách hàng",
        align: "start",
        value: "userId",
      },
      { text: "Tên khách hàng", value: "name" },
      { text: "Ngày sinh", value: "birthDate" },
      { text: "Số điện thoại", value: "phoneNumber" },
      { text: "Email", value: "email" },
      { text: "Giới tính", value: "gender" },
      { text: "Quốc gia", value: "country" },
      { text: "Địa chỉ", value: "address" },
      { text: "Ngày đăng ký", value: "registeredAt" },
      { text: "Ngày đăng nhập", value: "lastLogin" },
      { text: "Hình ảnh", value: "avatar" },
      { text: "Trạng thái", value: "status" },
            { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    title() {
      return this.editedIndex === -1 ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm";
    },
  },
  methods: {
    loadItems() {
      this.desserts = [
        {
          userId: "1",
          name: "nhan",
          birthDate: "09/09/2020",
          phoneNumber: "00889386214",
          email: "nhanle@gmail.com",
          gender: "Nam",
          country: "Vietnam",
          address: "Song doc tran van thoi ca mau",
          registeredAt: "08/08/2020",
          lastLogin: "08/08/2020",
          avatar: "avatrern",
          status: 1,
        },
      ];
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },

  created() {
    this.loadItems();
  },
};
</script>

<style lang="scss">
.file-image {
  display: inline-table;
  ul {
    display: inline-table;
    list-style: none;
  }
  ul li {
    display: inline-table;
  }
}

.right-main-item {
  font-family: Arial, Helvetica, sans-serif;
}
</style>