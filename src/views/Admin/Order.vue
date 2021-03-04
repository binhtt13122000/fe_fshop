<template>
  <v-app class="app">
    <Vm-header></Vm-header>
    <v-main>
      <v-container class="container" fluid>
        <section class="container">
          <v-row>
            <v-col md="3" sm="3" class="right-main-item">
              <h1 class="hidden-md-and-down mb-6 ml-6">Hóa đơn</h1>
              <v-col cols="12"> </v-col>
            </v-col>
            <!-- left main-->
            <v-col class="left-main-item">
              <v-row class="left-main-item">
                <v-text-field
                  prepend-icon="mdi-magnify"
                  solo-inverted
                  hide-details=""
                  label="Tìm theo mã hóa đơn"
                  style="width: 50px"
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
                    item-key="name"
                    class="elevation-1"
                    :footer-props="{
                        showFirstLastPage: true,
                        firstIcon: 'mdi-arrow-collapse-left',
                        lastIcon: 'mdi-arrow-collapse-right',
                        prevIcon: 'mdi-minus',
                        nextIcon: 'mdi-plus',
                    }"
                ></v-data-table>
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
};
</script>