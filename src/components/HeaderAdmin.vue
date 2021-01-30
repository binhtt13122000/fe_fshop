<template>
  <div id="app">
    <!-- <v-app id="inspire"> -->
    <v-navigation-drawer
      v-model="drawer"
      v-if="isValid"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-2"
      dark
      height="80px"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isValid"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 150px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">4MENSHOP</span>
      </v-toolbar-title>
      <v-row
        id="nav-bar-btn"
        class="hidden-md-and-down"
        width="100px"
        justify="center"
      >
        <div class="nar-bar-btn">
          <!-- <ul class="nar-links"> -->
          <v-btn
            class="mx-1"
            min-width="100px"
            offset-y
            bottom
            color="blue darken-2"
            ><v-icon>mdi-eye</v-icon>Tổng quan</v-btn
          >
          <v-menu bottom open-on-hover min-width="100px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="blue darken-2" class="mx-1"
                ><v-icon>mdi-tshirt-crew</v-icon>Hàng hóa</v-btn
              >
            </template>

            <v-card color="blue darken-2">
              <v-list-item-content class="justify-center" align="left">
                <div class="mx-auto text-left">
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-view-list</v-icon>Danh mục</v-btn
                  ><v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-attachment</v-icon>Thiết lập giá</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-warehouse</v-icon>Kiểm kho</v-btn
                  >
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
          <!-- Giao dich -->
          <v-menu
            class="mx-2"
            bottom
            small
            open-on-hover
            min-width="100px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="blue darken-2" class="mx-1"
                ><v-icon>mdi-arrow-left-right-bold</v-icon>Giao dịch</v-btn
              >
            </template>

            <v-card color="blue darken-2">
              <v-list-item-content class="justify-center" align="left">
                <div class="mx-auto text-left" style="">
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-order-bool-descending-variant</v-icon> Đặt
                    hàng</v-btn
                  ><v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-billboard</v-icon> Hóa đơn</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-car-pickup</v-icon> Vận đơn</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-view-list</v-icon> Trả hàng</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-database-import</v-icon> Nhập hàng</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-briefcase-upload</v-icon> Trả nhập hàng</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-table-cancel</v-icon> Xuất hủy</v-btn
                  >
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
          <!-- Đối tác -->
          <v-menu
            class="mx-2"
            bottom
            small
            open-on-hover
            min-width="100px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="blue darken-2" class="mx-1"
                ><v-icon>mdi-order-bool-descending-variant</v-icon>Đối
                tác</v-btn
              >
            </template>

            <v-card color="blue darken-2">
              <v-list-item-content class="justify-center" align="left">
                <div class="mx-auto text-left" style="">
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-account</v-icon> Khách hàng</v-btn
                  ><v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-account-supervisor-circle</v-icon> Nhà cung
                    cấp</v-btn
                  >
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>

          <!-- Nhân viên -->
          <v-menu
            class="mx-2"
            bottom
            small
            open-on-hover
            min-width="100px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="blue darken-2" class="mx-1"
                ><v-icon>mdi-account-supervisor</v-icon>Nhân viên</v-btn
              >
            </template>

            <v-card color="blue darken-2">
              <v-list-item-content class="justify-center" align="left">
                <div class="mx-auto text-left" style="">
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-account-group</v-icon>Nhân viên</v-btn
                  ><v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-table-edit</v-icon> Chấm công</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-table-account</v-icon> Bảng tính lương</v-btn
                  >
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
          <!-- Báo cáo -->
          <v-menu
            class="mx-2"
            bottom
            small
            open-on-hover
            min-width="100px"
            rounded
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="blue darken-2" class="mx-1"
                ><v-icon>mdi-account-supervisor</v-icon>Báo cáo</v-btn
              >
            </template>

            <v-card color="blue darken-2">
              <v-list-item-content class="justify-center" align="left">
                <div class="mx-auto text-left">
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-storefront</v-icon>Kênh bán hàng</v-btn
                  ><v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-notebook</v-icon> Ghi chú</v-btn
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text color="#ffffff"
                    ><v-icon>mdi-finance</v-icon> Tài chính</v-btn
                  >
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
          <!-- </ul> -->
        </div>
      </v-row>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img
        ></v-avatar>
      </v-btn>
    </v-app-bar>

    <!-- Contact -->
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2"> Create contact </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="Company"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-text"
                placeholder="Notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- </v-app> -->
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    isValid: false,
    hover: false,
    active: false,
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-eye", text: "Tổng quan" },

      {
        icon: "mdi-tshirt-crew",
        "icon-alt": "mdi-tshirt-crew",
        model: true,
        text: "Hàng hóa",
        children: [
          { icon: "mdi-view-list", text: "Danh mục" },
          { icon: "mdi-attachment", text: "Thiết lập giá" },
          { icon: "mdi-warehouse", text: "Kiểm kho" },
        ],
      },
      {
        icon: "mdi-arrow-left-right-bold",
        "icon-alt": "mdi-arrow-left-right-bold",
        text: "Giao dịch",
        model: true,
        children: [
          { icon: "mdi-order-bool-descending-variant", text: "Đặt hàng" },
          { icon: "mdi-billboard", text: "Hóa đơn" },
          { icon: "mdi-car-pickup", text: "Vận đơn" },
          { icon: "mdi-view-list", text: "Trả hàng" },
          { icon: "mdi-database-import", text: "Nhập hàng" },
          { icon: "mdi-table-cancel", text: "Xuất huy" },
        ],
      },
      {
        icon: "mdi-account-tie",
        "icon-alt": "mdi-account-tie",
        text: "Đối tác",
        model: true,
        children: [
          { icon: "mdi-account", text: "Khách hàng" },
          { icon: "mdi-account-supervisor-circle", text: "Nhà cung cấp" },
          { icon: "mdi-truck-delivery", text: "Đối tượng giao hàng" },
        ],
      },
      {
        icon: "mdi-account-supervisor",
        "icon-alt": "mdi-account-supervisor",
        text: "Nhân viên",
        model: true,
        children: [
          { icon: "mdi-account-group", text: "Nhân viên" },
          { icon: "mdi-table-edit", text: "Chấm công" },
          { icon: "mdi-table-account", text: "Bảng tính lương" },
        ],
      },
      {
        icon: "mdi-minus",
        "icon-alt": "mdi-plus",
        text: "More",
        model: false,
        children: [
          { text: "Import" },
          { text: "Export" },
          { text: "Print" },
          { text: "Undo changes" },
          { text: "Other contacts" },
        ],
      },
      { icon: "mdi-contacts", text: "Contacts" },
      //   { icon: "mdi-cog", text: "Settings" },
      //   { icon: "mdi-message", text: "Send feedback" },
      //   { icon: "mdi-help-circle", text: "Help" },
      //   { icon: "mdi-cellphone-link", text: "App downloads" },
      //   { icon: "mdi-keyboard", text: "Go to the old version" },
    ],
  }),

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    mouseOver: function () {
      this.active = !this.active;
    },
    onResize() {
      this.isValid = window.innerWidth <= 1040;
    },
  },
};
</script>

<style lang="scss">
.nar-bar-btn {
  .nar-links {
    list-style-type: none;
  }

  .nar-links li {
    display: inline;
    padding: 0px 12px 0px 12px;
  }
  .nar-links li a {
    color: #ffffff;
    text-decoration: none;
    font-size: 15px;
    text-transform: uppercase;
  }
}
</style>
