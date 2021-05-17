<template>
  <v-app>
    <VmHeader></VmHeader>
    <v-main>
      <v-container class="container" fluid>
        <section class="container">
          <v-row>
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Theo tên, mã hàng, tên loại hàng"
              class="hidden-md-and-down mx-3"
              style="width: 50px"
            ></v-text-field>
            <v-menu open-on-hover bottom offset-y rounded>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>Thêm mới
                  <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item link @click="dialogAdd = !dialogAdd">
                  <v-list-item-action>
                    <v-icon>mdi-plus</v-icon>
                  </v-list-item-action>
                  <v-list-item-title align="left"
                    >Thêm hàng hóa</v-list-item-title
                  >
                </v-list-item>
                <v-list-item link @click="dialogPromo = !dialogPromo">
                  <v-list-item-action>
                    <v-icon>mdi-plus</v-icon>
                  </v-list-item-action>
                  <v-list-item-title align="left"
                    >Thêm khuyến mãi</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <v-row>
            <v-data-table
              v-model="selected"
              :headers="headers"
              item-key="name"
              show-expand
              :single-expand="true"
              class="elevation-1"
              hide-default-footer
            >
            </v-data-table>
          </v-row>
        </section>
      </v-container>
    </v-main>
    <VmFooter></VmFooter>
  </v-app>
</template>
<script>
import VmFooter from "../../components/Footer.vue";
import VmHeader from "../../components/HeaderAdmin.vue";
export default {
  components: { VmFooter, VmHeader },
  data: () => ({
    expanded: [],
    singleExpand: true,
    selected: [],
    headers: [
      {
        text: "Mã nhận xét",
        align: "start",
        value: "commentId",
      },
      { text: "Mã khách hàng", value: "userId" },
      { text: "Mã sản phẩm", value: "proId" },
      { text: "Tên", value: "name" },
      { text: "Số điện thoại", value: "phoneNumber" },
      { text: "Nội dung", value: "content" },
      { text: "Ngày tạo", value: "createTime" },
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
};
</script>