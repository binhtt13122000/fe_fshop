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
            <v-col cols="12" lg="3" md="3" class="right-main-item">
              <h1 class="mb-6 ml-6" align="left">Người dùng</h1>
              <v-col cols="12" class="pl-md-0 pr-md-0">
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
                        @change="searchUserWithStatus"
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
            <v-col lg="9" md="9">
              <v-row class="left-main-item">
                <v-col cols="12" lg="6" md="6">
                  <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Theo tên, mã khách hàng"
                    class="mx-3"
                    :value="txtSearchAccount"
                    @change="txtSearchAccount = $event"
                    @keydown.enter="onEnterClick()"
                    style="width: 100%"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="3" md="3" sm="6">
                  <v-file-input
                    truncate-length="15"
                    label="File input"
                    @change="onFileChange"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" lg="3" md="3" sm="6">
                  <v-btn color="success" width="100%"
                    ><v-icon>mdi-file-move-outline</v-icon>Xuất File</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
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
                    disable-pagination
                  >
                    <template v-slot:top>
                      <v-toolbar>
                        <v-toolbar-title>Khách hàng</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
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
                      <v-chip :color="getColor(item.status)" dark
                        >{{ checkStatusUser(item.status) }}
                      </v-chip>
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
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <DialogConf
                      :title="'Are you sure you want to block this user?'"
                      v-on:cancel="closeDelete"
                      v-on:accept="deleteItemConfirm"
                    ></DialogConf>
                  </v-dialog>
                  <v-dialog v-model="dialogActiveAccount" max-width="500px">
                    <DialogConf
                      :title="'Are you sure you want to active user?'"
                      v-on:cancel="closeActiveAccount"
                      v-on:accept="activeAccountConfirm"
                    ></DialogConf>
                  </v-dialog>
                  <div class="text-center pt-2" v-if="!this.isFileSelected">
                    <v-pagination
                      v-model="currentPage"
                      :length="this.pages.totalPages"
                      v-on:click="currentPage()"
                    ></v-pagination>
                  </div>
                </v-col>
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
import DialogConf from "../../components/DialogConf.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
import readXlsxFile from "read-excel-file";

export default {
  components: { VmFooter, VmHeader, DialogConf },
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
    isFileSelected: false,
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
    user: {},
    listUsers: [],
  }),
  watch: {
    currentPage() {
      if (this.radioShow === "isOnSale") {
        if (
          this.txtSearchAccount != null &&
          this.txtSearchAccount.length != 0
        ) {
          this.onEnterClick();
        } else {
          this.getUsers(this.currentPage);
          this.pageCount = this.pages.totalPages;
        }
      } else {
        this.isFileSelected = false;
        if (this.radioShow === "all") {
          this.credential = {
            txtSearchAccount: "",
            currentPage: this.currentPage,
          };
          this.searchUserByQ(this.credential);
          this.pageCount = this.pages.totalPages;
        } else {
          if (this.radioShow === "active") {
            this.credentials = {
              status: 1,
              currentPage: this.currentPage,
            };
            this.searchUserByStatus(this.credentials);
            this.pageCount = this.pages.totalPages;
          } else if (this.radioShow === "block") {
            this.credentials = {
              status: 0,
              currentPage: this.currentPage,
            };
            this.searchUserByStatus(this.credentials);
            this.pageCount = this.pages.totalPages;
          }
        }
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
    ...mapMutations("auth", ["setUsers", "setPages"]),
    searchUserWithStatus() {
      this.isFileSelected = false;

      if (this.radioShow === "all") {
        this.currentPage = 1;
        this.credential = {
          txtSearchAccount: "",
          currentPage: this.currentPage,
        };
        this.searchUserByQ(this.credential);
        this.pageCount = this.pages.totalPages;
      } else {
        if (this.radioShow === "active") {
          this.currentPage = 1;
          this.credentials = {
            status: 1,
            currentPage: this.currentPage,
          };
          this.searchUserByStatus(this.credentials);
          this.pageCount = this.pages.totalPages;
        } else if (this.radioShow === "block") {
          this.currentPage = 1;
          this.credentials = {
            status: 0,
            currentPage: this.currentPage,
          };
          this.searchUserByStatus(this.credentials);
          this.pageCount = this.pages.totalPages;
        }
      }
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
      this.radioShow = "isOnSale";
      this.currentPage = 1;
      this.isFileSelected = false;
      this.credential = {
        txtSearchAccount: this.txtSearchAccount,
        currentPage: this.currentPage,
      };
      this.searchUserByQ(this.credential);
      this.pageCount = this.pages.totalPages;
    },
    onFileChange(event) {
      this.currentPage = 1;
      let xlsxfile = event.target.files ? event.target.files[0] : null;
      readXlsxFile(xlsxfile).then((rows) => {
        this.isFileSelected = true;
        rows.forEach((element) => {
          this.user = {
            userId: element[0],
            userName: element[1],
            roleId: element[2],
            name: element[3],
            birthDate: element[4],
            phoneNumber: element[5],
            gender: element[6],
            email: element[7],
            country: element[8],
            address: element[9],
            registeredAt: element[10],
            lastLogin: element[11],
            avatar: element[12],
            status: element[13],
          };
          this.listUsers.push(this.user);
        });
        this.setPages([]);
        this.setUsers(this.listUsers);
        this.listUsers = [];
      });
    },
    getColor(status) {
      if (status) return "green";
      else return "red";
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