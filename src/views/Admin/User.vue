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
                      <v-radio-group
                        v-model="radioShow"
                        @change="searchUserByStatus"
                      >
                        <v-radio label="Tất cả" value="all"></v-radio>
                        <v-radio
                          label="Đang hoạt động"
                          value="active"
                        ></v-radio>
                        <v-radio
                          label="Ngừng hoạt động"
                          value="block"
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
                  :value="txtSearchAccount"
                  @change="txtSearchAccount = $event"
                  @keydown.enter="onEnterClick()"
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
                  :items="this.users"
                  hide-default-footer
                  :loading="myloadingvariable"
                  loading-text="Loading... Please wait"
                  item-key="12"
                  width="800px"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar>
                      <v-toolbar-title>Khách hàng</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>

                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="headline blue darken-1"
                            >Are you sure you want to block this
                            user?</v-card-title
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
                      <v-dialog v-model="dialogActiveAccount" max-width="500px">
                        <v-card>
                          <v-card-title class="headline blue darken-1"
                            >Are you sure you want to active user?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeActiveAccount"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="activeAccountConfirm"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:[`item.birthDate`]="{ item }">
                    {{ formatDate(item.birthDate) }}
                  </template>
                  <template v-slot:[`item.gender`]="{ item }">
                    {{ checkGender(item.gender) }}
                  </template>
                  <template v-slot:[`item.registeredAt`]="{ item }">
                    {{ formatDate(item.registeredAt) }}
                  </template>
                  <template v-slot:[`item.lastLogin`]="{ item }">
                    {{ diffenceDateTime(item.lastLogin) }}
                  </template>
                  <template v-slot:[`item.status`]="{ item }">
                    {{ checkStatusUser(item.status) }}
                  </template>
                  <template>
                    <my-component v-if="renderComponent" />
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      v-if="item.status"
                      small
                      class="mr-2"
                      @click="deleteItem(item)"
                    >
                      mdi-block-helper
                    </v-icon>
                    <v-icon
                      v-else
                      small
                      class="mr-2"
                      @click="activeAccountDialog(item)"
                    >
                      mdi-account-check-outline
                    </v-icon>
                    <v-icon small class="mr-2" @click="infoItem(item)"
                      >mdi-information-outline</v-icon
                    >
                  </template>
                </v-data-table>
                <div class="text-center pt-2" v-if="this.users.length != 0">
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
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/HeaderAdmin.vue";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

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
    dialogActiveAccount: false,
    dialogDelete: false,
    editedIndex: -1,
    userNameSelected: "",
    currentPage: 1,
    pageCount: 0,
    selected: [],
    myloadingvariable: true,
    txtSearchAccount: "",
    isSelectedStatus: "",
    renderComponent: true,
    credential: {},
    credentials: {},
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
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  watch: {
    currentPage() {
      if (this.txtSearchAccount != null && this.txtSearchAccount.length != 0) {
        this.onEnterClick();
      } else {
        this.getUsers(this.currentPage);
        this.pageCount = this.pages.totalPages;
      }
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogActiveAccount(val) {
      val || this.closeActiveAccount();
    },
    onEnterClick() {
      this.credential = {
        txtSearchAccount: this.txtSearchAccount,
        currentPage: this.currentPage,
      };
      this.searchUserByQ(this.credential);
      this.myloadingvariable = false;
      this.pageCount = this.pages.totalPages;
    },
  },
  computed: {
    ...mapGetters("auth", ["users", "pages"]),

    title() {
      return this.editedIndex === -1 ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm";
    },
  },
  methods: {
    ...mapActions("auth", [
      "getUsers",
      "banAccount",
      "activeAccount",
      "searchUserByQ",
      "searchUserByStatus",
    ]),
    searchUserByStatus() {
      console.log(this.radioShow);
      this.credentials = {
        status: "1",
        currentPage: this.currentPage,
      };
      this.searchUserByStatus(this.credentials);
      this.pageCount = this.pages.totalPages;

      // console.log(this.radioShow);
      // if (this.radioShow === "all") {
      //   this.credential = {
      //     txtSearchAccount: "",
      //     currentPage: this.currentPage,
      //   };
      //   this.searchUserByQ(this.credential);
      //   this.pageCount = this.pages.totalPages;
      // } else {
      //   if (this.radioShow === "active") {
      //     this.credentials = {
      //       status: "1",
      //       currentPage: this.currentPage,
      //     };
      //     this.searchUserByStatus(this.credentials);
      //     this.pageCount = this.pages.totalPages;
      //   } else {
      //     this.credentials = {
      //       status: "0",
      //       currentPage: this.currentPage,
      //     };
      //     this.searchUserByStatus(this.credentials);
      //     this.pageCount = this.pages.totalPages;
      //   }
      //   console.log(this.credentials);
      // }
    },
    onChangeSelectedRadio(event) {
      console.log(event);
      // if(event.target.value == "all") {

      // }else {

      // }
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.userNameSelected = item.userName;
      this.dialogDelete = true;
    },

    activeAccountConfirm() {
      this.activeAccount(this.userNameSelected);
      this.closeActiveAccount();
    },

    activeAccountDialog(item) {
      this.editedIndex = this.users.indexOf(item);
      this.userNameSelected = item.userName;
      this.dialogActiveAccount = true;
    },

    deleteItemConfirm() {
      this.banAccount(this.userNameSelected);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.userNameSelected = "";
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.renderComponent = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.userNameSelected = "";
        this.renderComponent = true;
      });
    },

    closeActiveAccount() {
      this.dialogActiveAccount = false;
      this.renderComponent = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.userNameSelected = "";
        this.renderComponent = true;
      });
    },

    formatDate(value) {
      return moment(value).format("MM/DD/YYYY");
    },

    diffenceDateTime(value) {
      let start = moment(value);
      let end = moment(new Date());
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      if (days < 1) {
        return Math.round(duration.asHours()) + " hours";
      }
      return Math.round(days) + " days";
    },

    checkGender(value) {
      if (value) return "Nam";
      return "Nữ";
    },

    checkStatusUser(value) {
      if (value) return "Active";
      return "Block";
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    onEnterClick() {
      this.credential = {
        txtSearchAccount: this.txtSearchAccount,
        currentPage: this.currentPage,
      };
      this.searchUserByQ(this.credential);
      this.pageCount = this.pages.totalPages;
    },
  },

  created() {
    this.getUsers(this.currentPage);
    if (this.users) {
      this.myloadingvariable = false;
      this.pageCount = this.pages.totalPages;
    }
  },
  mounted() {},
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