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
            <v-col cols="12" md="3" sm="3" class="right-main-item">
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
                          >Nhóm</v-list-item-title
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
                          >Loại hàng
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item>
                      <v-list-item-content
                        align="left"
                        class="font-weight-medium"
                      >
                        <v-list-item-subtitle> Tất cả </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="dialogType = !dialogType"
                          ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
                        >
                        <v-dialog v-model="dialogType" width="300px">
                          <v-card>
                            <v-card-title class="blue darken-1">
                              Thêm loại hàng
                            </v-card-title>
                            <v-container>
                              <v-col cols="12">
                                <v-text-field
                                  label="Tên loại hàng"
                                ></v-text-field>
                              </v-col>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="dialogType = false"
                                >Cancel</v-btn
                              >
                              <v-btn text @click="dialogType = false"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-action>
                    </v-list-item>

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
                          >Nhà sản xuất
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item>
                      <v-list-item-content
                        align="left"
                        class="font-weight-medium"
                      >
                        <v-list-item-subtitle> Tất cả </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="dialogSupplier = !dialogSupplier"
                          ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
                        >
                        <v-dialog v-model="dialogSupplier" width="300px">
                          <v-card>
                            <v-card-title class="blue darken-1">
                              Thêm nhà sản xuất
                            </v-card-title>
                            <v-container>
                              <v-col cols="12">
                                <v-text-field
                                  label="Tên nhà sản xuất"
                                ></v-text-field>
                              </v-col>
                            </v-container>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="dialogSupplier = false"
                                >Cancel</v-btn
                              >
                              <v-btn text @click="dialogSupplier = false"
                                >Save</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-action>
                    </v-list-item>
                    <v-container>
                      <v-text-field
                        flat
                        hide-details
                        label="Chọn nhà sản xuất"
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
                          >Bán trực tiếp</v-list-item-title
                        >
                      </v-list-item-content>
                    </template>
                    <v-container>
                      <v-radio-group v-model="radio">
                        <v-radio label="Tất cả" value="all"></v-radio>
                        <v-radio label="Bán trực tiếp" value="direct"></v-radio>
                        <v-radio
                          label="Không bán trực tiếp"
                          value="indiect"
                        ></v-radio>
                      </v-radio-group>
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
                          >Ngày hết hàng</v-list-item-title
                        >
                      </v-list-item-content>
                    </template>
                    ""
                    <v-container>
                      <v-checkbox label="Hàng hóa" hide-details></v-checkbox>
                      <v-checkbox label="Dịch vụ" hide-details></v-checkbox>
                      <v-checkbox label="Khuyến mãi" hide-details></v-checkbox>
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
                          label="Hàng đang kinh doanh"
                          value="isOnSale"
                        ></v-radio>
                        <v-radio
                          label="Hàng ngừng kinh doanh"
                          value="isOffSale"
                        ></v-radio>
                        <v-radio
                          label="Không bán trực tiếp"
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
            <v-col>
              <v-row class="left-main-item">
                <v-text-field
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Theo tên, mã hàng"
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

                <!-- Dialog them khuyen mai, them san pham -->
                <v-dialog v-model="dialogPromo" width="500px">
                  <v-card>
                    <v-card-title class="blue darken-1">
                      Thêm khuyến mãi
                    </v-card-title>
                    <v-container>
                      <v-col cols="12">
                        <v-text-field label="Tên Khuyến mãi"> </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Promotion(%)"
                          append-outer-icon="mdi-sale"
                        >
                        </v-text-field>
                      </v-col>
                    </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="dialogPromo = false"
                        >Cancel</v-btn
                      >
                      <v-btn text @click="dialogPromo = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogAdd" width="800px">
                  <v-card>
                    <v-card-title class="blue darken-1">
                      Thêm sản phẩm
                    </v-card-title>
                    <v-tabs v-model="addTab">
                      <v-tab>Thông tin</v-tab>
                      <v-tab>Mô tả chi tiết</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="addTab">
                      <v-tab-item v-for="n in 2" :key="n">
                        <v-container v-if="n === 1">
                          <v-row class="mx-2">
                            <!-- <v-col
                              class="align-center justify-space-between"
                              cols="6"
                            >
                              <v-text-field
                                append-outer-icon="mdi-information"
                                label="Mã hàng"
                              ></v-text-field>
                            </v-col> -->
                            <v-col cols="6">
                              <v-text-field
                                label="Loại hàng"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Giá vốn"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Giá bán"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Tên hàng"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Số lượng"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Nhà sản xuất"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-text-field
                                label="Trạng thái"
                                append-outer-icon="mdi-information"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                              <v-file-input
                                :rules="imgUrlRules"
                                accept="image/png, image/jpg, image/jpeg"
                                placeholder="Pick image"
                                append-outer-icon="mdi-camera"
                                label="Image"
                              >
                              </v-file-input>
                              <!-- <v-row class="file-image">
                                <ul v-for="n in 1" :key="n">
                                  <li>
                                    <img
                                      id="imgUrl"
                                      src="https://ceygate.com/content/themes/arkahost/assets/images/default.png"
                                      width="15%"
                                      alt=""
                                    />
                                  </li>
                                </ul>
                              </v-row> -->
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
                          <v-btn text color="primary" @click="dialogAdd = false"
                            >Cancel</v-btn
                          >
                          <v-btn text @click="dialogAdd = false">Save</v-btn>
                        </v-card-actions>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-card>
                </v-dialog>
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
                  :single-select="singleSelect"
                  item-key="name"
                  class="elevation-1"
                  show-select
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
                      <v-toolbar-title>Sản phẩm</v-toolbar-title>
                      <v-switch
                        v-model="singleSelect"
                        label=""
                        class="pa-3"
                      ></v-switch>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" width="800px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="success"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-plus</v-icon>
                            Thêm sản phẩm
                          </v-btn>
                        </template>
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
                                      v-model="editedItem.proType"
                                      label="Loại hàng"
                                      append-outer-icon="mdi-information"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Số lượng"
                                      v-model="editedItem.proQuantity"
                                      append-outer-icon="mdi-information"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="editedItem.realPrice"
                                      label="Giá vốn"
                                      append-outer-icon="mdi-information"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="editedItem.proPrice"
                                      label="Giá bán"
                                      append-outer-icon="mdi-information"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="editedItem.proName"
                                      label="Tên hàng"
                                      append-outer-icon="mdi-information"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="editedItem.supplierId"
                                      label="Nhà sản xuất"
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
                                  <v-col cols="6">
                                    <v-file-input
                                      :rules="imgUrlRules"
                                      accept="image/png, image/jpg, image/jpeg"
                                      placeholder="Pick image"
                                      append-outer-icon="mdi-camera"
                                      label="Image"
                                    >
                                    </v-file-input>
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
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="close"
                                >
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
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">
                      mdi-delete
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
    editedItem: {
      proId: "",
      proName: "",
      imgUrl: "",
      proSize: "",
      proType: "",
      proPrice: 0,
      realPrice: 0,
      status: 1,
      supplierId: "",
      createTime: "",
    },
    selected: [],
    itemAdd: [
      { icon: "mdi-plus", text: "Thêm hàng hóa" },
      { icon: "mdi-plus", text: "Thêm khuyến mãi" },
    ],
    headers: [
      {
        text: "Mã hàng",
        align: "start",
        value: "proId",
      },
      { text: "Tên hàng", value: "proName" },
      { text: "Hình Ảnh", value: "imgUrl" },
      { text: "Size", value: "proSize" },
      { text: "Số lượng", value: "proQuantity" },
      { text: "Loại Hàng", value: "proType" },
      { text: "Giá bán", value: "proPrice" },
      { text: "Giá vốn", value: "realPrice" },
      { text: "Trạng thái", value: "status" },
      { text: "Nhà sản xuất", value: "supplierId" },
      { text: "Ngày đặt hàng", value: "createTime" },
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
          proId: "1",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 12,
          proType: "123",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "2",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 12,
          proType: "123",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "3",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "vl",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "4",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "mn",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "5",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "321",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "6",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "ktm",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "7",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "123",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "8",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "123",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "9",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "123",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
        {
          proId: "10",
          proName: "Ao",
          imgUrl: "String",
          proSize: "M",
          proQuantity: 20,
          proType: "123",
          proPrice: 1230,
          realPrice: 1230,
          status: 1,
          supplierId: "123",
          createTime: "09/09/2020",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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