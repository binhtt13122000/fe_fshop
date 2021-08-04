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
            <v-col cols="12" lg="3" md="3" sm="3" class="right-main-item">
              <h1 class="mb-3 pl-lg-3" align="left">Hàng hóa</h1>
              <v-col class="pa-0 mb-2" cols="12">
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
                          <DialogCreate
                            :type="'text'"
                            :title="'Thêm loại hàng'"
                            :label="'Tên loại hàng'"
                            v-model="productTypeName"
                            :errorMessage="proTypeNameErrors"
                            v-on:cancel="closeDialogNewCategory"
                            v-on:accept="onAddNewCategory"
                          ></DialogCreate>
                        </v-dialog>
                      </v-list-item-action>
                    </v-list-item>

                    <v-container>
                      <v-text-field
                        flat
                        hide-details
                        prepend-inner-icon="mdi-magnify"
                        label="Tìm kiếm loại hàng"
                        :value="txtSearchCategory"
                        @change="
                          (txtSearchCategory = $event), (currentPage = 1)
                        "
                        @keydown.enter="onEnterClickSearchCategory()"
                      ></v-text-field>
                    </v-container>
                  </v-list-group>
                </v-card>
              </v-col>
              <v-col class="pa-0 mb-2" cols="12">
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
                        <v-dialog v-model="dialogSupplier" width="350px">
                          <DialogCreate
                            :type="'text'"
                            :title="'Thêm nhà sản xuất'"
                            :label="'Tên nhà sản xuất'"
                            v-model="supplierName"
                            :errorMessage="supplierNameErrors"
                            v-on:cancel="closeDialogNewSupplier"
                            v-on:accept="onAddNewSupplier"
                          ></DialogCreate>
                        </v-dialog>
                      </v-list-item-action>
                    </v-list-item>
                    <v-container>
                      <v-text-field
                        flat
                        hide-details
                        label="Tìm kiếm nhà cung cấp"
                        :value="txtSearchSupplier"
                        @change="txtSearchSupplier = $event"
                        @keydown.enter="onEnterClickSearchSupplier()"
                      ></v-text-field>
                    </v-container>
                  </v-list-group>
                </v-card>
              </v-col>
              <v-col class="pa-0 mb-2" cols="12">
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
                        @change="searchProductsWithStatus"
                      >
                        <v-radio label="Tất cả" value="all"></v-radio>
                        <v-radio
                          label="Hàng đang kinh doanh"
                          value="isOnSale"
                        ></v-radio>
                        <v-radio
                          label="Hàng ngừng kinh doanh"
                          value="isOffSale"
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
            <v-col lg="9" md="9" sm="9" class="mt-3 mb-3">
              <v-row class="left-main-item">
                <v-col cols="12" lg="9" md="9" sm="9" class="pl-0 pr-3">
                  <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    :value="txtSearchProduct"
                    @change="txtSearchProduct = $event"
                    @keydown.enter="onEnterClickSearchProduct()"
                    label="Theo tên, mã hàng, tên loại hàng"
                    class="mr-3 mb-3"
                    style="width: 100%"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="3" md="3" sm="3" class="pl-0 pr-0 mb-3">
                  <v-menu open-on-hover bottom offset-y rounded>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="success"
                        v-bind="attrs"
                        v-on="on"
                        min-width="64px"
                        width="100%"
                      >
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
                    </v-list>
                  </v-menu>
                </v-col>

                <!-- Dialog them san pham -->
                <v-dialog v-model="dialogAdd" width="800px">
                  <v-card>
                    <v-card-title class="blue darken-1">
                      Thêm sản phẩm
                    </v-card-title>
                    <v-stepper v-model="e1" alt-labels>
                      <v-stepper-header>
                        <v-stepper-step
                          v-for="(step, n) in steps"
                          :key="n"
                          :complete="stepComplete(n + 1)"
                          :step="n + 1"
                          :rules="[(value) => !!step.valid]"
                          :color="stepStatus(n + 1)"
                          >{{ step.name }}
                        </v-stepper-step>
                      </v-stepper-header>
                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card
                            color="grey lighten-1"
                            class="mb-12"
                            height="300px"
                          >
                            <v-container>
                              <v-form
                                :ref="'stepForm'"
                                v-model="steps.valid"
                                lazy-validation
                              >
                                <v-row class="mx-2">
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Loại hàng"
                                      append-outer-icon="mdi-information"
                                      :rules="steps.rules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Giá vốn"
                                      append-outer-icon="mdi-information"
                                      :rules="steps.rules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Giá bán"
                                      append-outer-icon="mdi-information"
                                      :rules="steps.rules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Tên hàng"
                                      append-outer-icon="mdi-information"
                                      :rules="steps.rules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Nhà sản xuất"
                                      append-outer-icon="mdi-information"
                                      :rules="steps.rules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      label="Trạng thái"
                                      append-outer-icon="mdi-information"
                                      :rules="steps.rules"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-form>
                            </v-container>
                          </v-card>
                          <v-btn color="primary" @click="nextStep(2)">
                            Continue
                          </v-btn>
                          <v-btn text @click="dialogAdd = false">Cancel</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                          <v-card>
                            <!-- them hinh o day -->
                          </v-card>

                          <v-btn color="primary" @click="nextStep(3)"
                            >Continue</v-btn
                          >
                          <v-btn text @click="nextStep(1)">Back</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                          <v-card>
                            <div
                              class="form-group"
                              v-for="(input, k) in inputs"
                              :key="k"
                            >
                              <v-row>
                                <v-col cols="3">
                                  <v-text-field
                                    v-model="input.name"
                                    label="Size"
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                  <v-text-field
                                    v-model="input.quantity"
                                    label="Quantity"
                                    outlined
                                  ></v-text-field> </v-col
                                ><v-col cols="3">
                                  <v-text-field
                                    v-model="input.discount"
                                    label="Discount"
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                  <span>
                                    <v-icon
                                      @click="remove(k)"
                                      v-show="k || (!k && inputs.length > 1)"
                                      >mdi-minus-circle</v-icon
                                    >
                                    <v-icon
                                      @click="add()"
                                      v-show="k == inputs.length - 1"
                                      >mdi-plus-circle</v-icon
                                    >
                                  </span>
                                </v-col>
                              </v-row>
                            </div>
                          </v-card>

                          <v-btn color="primary" @click="nextStep(4)"
                            >Continue</v-btn
                          >
                          <v-btn text @click="nextStep(2)">Back</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                          <v-card> </v-card>

                          <v-btn color="primary">Continue</v-btn>
                          <v-btn text @click="nextStep(3)">Back</v-btn>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-card>
                </v-dialog>
              </v-row>
              <br />
              <v-row>
                <v-col cols="12" class="pa-0">
                  <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="this.products"
                    item-key="productId"
                    show-expand
                    single-expand
                    single-select
                    class="elevation-1"
                    hide-default-footer
                    v-show="this.isSearchTableProduct"
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>Sản phẩm</v-toolbar-title>

                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <!-- delete -->
                        <v-dialog
                          v-model="dialogDelete"
                          max-width="550px"
                          width="100%"
                        >
                          <DialogConf
                            :title="'Are you sure you want to delete product?'"
                            v-on:cancel="closeDelete"
                            v-on:accept="deleteItemConfirm"
                          ></DialogConf>
                        </v-dialog>
                        <v-dialog
                          v-model="dialogActive"
                          max-width="550px"
                          width="100%"
                        >
                          <DialogConf
                            :title="'Are you sure you want to active product?'"
                            v-on:cancel="closeDialogActive"
                            v-on:accept="activeItemConfirm"
                          ></DialogConf>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:[`item.categoryName`]="{ item }">
                      {{ item.category.proTypeName }}
                    </template>
                    <template v-slot:[`item.supplierName`]="{ item }">
                      {{ item.supplier.supplierName }}
                    </template>
                    <template v-slot:[`item.productPrice`]="{ item }">
                      {{ formatPrice(item.productPrice) }}
                    </template>
                    <template v-slot:[`item.realPrice`]="{ item }">
                      {{ formatPrice(item.realPrice) }}
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                      <v-chip :color="getColor(item.status)" dark>
                        {{ checkStatusProduct(item.status) }}
                      </v-chip>
                    </template>
                    <template v-slot:[`item.createAt`]="{ item }">
                      {{ formatDate(item.createAt) }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon
                        small
                        v-if="item.status !== -1"
                        class="mr-2"
                        @click="addProductDetailsDialog(item)"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        small
                        v-if="item.status !== -1"
                        class="mr-2"
                        @click="deleteItem(item)"
                      >
                        mdi-delete
                      </v-icon>
                      <v-icon
                        small
                        v-if="item.status === -1"
                        class="mr-2"
                        @click="activeItem(item)"
                      >
                        mdi-account-check-outline
                      </v-icon>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length">
                        <v-data-table
                          :headers="headersProductDetails"
                          :items="item.productDetails"
                          :item-key="item.proItemId"
                          hide-default-footer
                          class="elevation-1"
                        >
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-toolbar-title>Sản phẩm</v-toolbar-title>

                              <v-divider
                                class="mx-4"
                                inset
                                vertical
                              ></v-divider>
                              <v-spacer></v-spacer>
                            </v-toolbar>
                          </template>

                          <template v-slot:[`item.status`]="{ item }">
                            <v-chip :color="getColor(item.status)" dark>
                              {{ checkStatusProduct(item.status) }}
                            </v-chip>
                          </template>
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-icon
                              small
                              class="mr-2"
                              @click="addQuantityProductDetailsDialog(item)"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              small
                              v-if="item.status !== -1"
                              class="mr-2"
                              @click="deleteProductDetails(item)"
                            >
                              mdi-delete
                            </v-icon>
                            <v-icon
                              small
                              v-if="item.status === -1"
                              class="mr-2"
                              @click="activeProductDetails(item)"
                            >
                              mdi-account-check-outline
                            </v-icon>
                          </template>
                        </v-data-table>
                      </td>
                    </template>
                  </v-data-table>
                  <div class="text-center pt-2">
                    <v-pagination
                      v-show="this.isSearchTableProduct"
                      v-model="currentPage"
                      :length="this.pages.totalPages"
                      v-on:click="currentPage()"
                    ></v-pagination>
                  </div>

                  <!-- Table Category -->
                  <TableNoAction
                    :headers="headerCategory"
                    :items="categories"
                    :itemKey="'category'"
                    :title="'Loại hàng'"
                    v-show="this.isSearchTableCategory"
                  ></TableNoAction>
                  <div class="text-center pt-2">
                    <v-pagination
                      v-show="this.isSearchTableCategory"
                      v-model="currentPage"
                      :length="this.pagesCategory.totalPages"
                      v-on:click="currentPage()"
                    ></v-pagination>
                  </div>
                  <!-- Table Supplier -->
                  <TableNoAction
                    :headers="headerSupplier"
                    :items="suppliers"
                    :itemKey="'Supplier'"
                    :title="'Nhà cung cấp'"
                    v-show="this.isSearchTableSupplier"
                  ></TableNoAction>
                  <div class="text-center pt-2">
                    <v-pagination
                      v-show="this.isSearchTableSupplier"
                      v-model="currentPage"
                      :length="this.pagesSupplier.totalPages"
                      v-on:click="currentPage()"
                    ></v-pagination>
                  </div>
                  <v-dialog
                    v-model="dialogDeleteProductDetail"
                    max-width="550px"
                    width="100%"
                  >
                    <DialogConf
                      :title="'Are you sure you want to delete product detail?'"
                      v-on:cancel="closeDeleteProductDetails"
                      v-on:accept="deleteProductDetailsConfirm"
                    ></DialogConf>
                  </v-dialog>
                  <v-dialog
                    v-model="dialogActiveProductDetail"
                    max-width="550px"
                    width="100%"
                  >
                    <DialogConf
                      :title="'Are you sure you want to active product detail?'"
                      v-on:cancel="closeActiveProductDetails"
                      v-on:accept="activeProductDetailsConfirm"
                    ></DialogConf>
                  </v-dialog>
                  <v-dialog
                    v-model="dialogAddQuantityProductDetails"
                    max-width="550px"
                    width="100%"
                  >
                    <DialogCreate
                      :type="'number'"
                      :title="'Add quantity:'"
                      :label="'Số lượng'"
                      :rules="[numberRule]"
                      v-model="quantity"
                      :errorMessage="quantityErrors"
                      v-on:cancel="closeAddQuantityProductDetails"
                      v-on:accept="addQuantityProductDetailsConfirm"
                    ></DialogCreate>
                  </v-dialog>

                  <v-dialog
                    v-model="dialogAddProductDetails"
                    max-width="550px"
                    width="100%"
                  >
                    <v-card>
                      <v-card-title
                        class="headline blue lighten-1 pa-2 d-flex justify-center"
                        >Create new product details:</v-card-title
                      >
                      <v-card-actions>
                        <v-form>
                          <v-col>
                            <v-text-field
                              readonly
                              :value="itemSelected.productId"
                              label="Product Id"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-select
                              v-model="productDetailSize"
                              :items="itemsSize"
                              :error-messages="selectErrors"
                              @click="$v.productDetailSize.$touch()"
                              @blur="$v.productDetailSize.$touch()"
                              required
                              label="Chọn kích thước:"
                            ></v-select>
                          </v-col>
                          <v-col>
                            <v-text-field
                              type="number"
                              :rules="[numberRule]"
                              v-model="quantity"
                              :error-messages="quantityErrors"
                              @input="$v.quantity.$touch()"
                              @blur="$v.quantity.$touch()"
                              label="Số lượng"
                              append-outer-icon="mdi-information"
                              @change="quantity = $event"
                              re
                            ></v-text-field>
                          </v-col>
                        </v-form>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeAddProductDetailsDialog()"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="addProductDetailsConfirm()"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
import { validationMixin } from "vuelidate";
import { required, minValue, maxLength } from "vuelidate/lib/validators";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import TableNoAction from "../../components/TableNoAction.vue";
import DialogConf from "../../components/DialogConf.vue";
import DialogCreate from "./Components/DialogCreate.vue";
import Vue from "vue";
export default {
  components: { VmFooter, VmHeader, DialogConf, DialogCreate, TableNoAction },
  mixins: [validationMixin],

  validations: {
    quantity: { minValue: minValue(1) },
    productDetailSize: { required },
    productTypeName: { required, maxLength: maxLength(50) },
    supplierName: { required, maxLength: maxLength(50) },
  },
  data: () => ({
    inputs: [
      {
        name: "",
        quantity: 0,
        discount: 0,
      },
    ],
    e1: 1,
    curr: 1,
    lastStep: 4,
    imgUrlRules: [
      (value) =>
        !value ||
        value.size < 5000000 ||
        "Avatar size should be less than 5MB!",
    ],
    radio: "all",
    radioShow: "all",
    addTab: null,
    desTab: null,
    upHere: false,
    singleSelect: false,
    dialogSupplier: false,
    dialogType: false,
    dialogEdit: false,
    dialog: false,
    dialogAdd: false,
    dialogDelete: false,
    dialogDeleteProductDetail: false,
    dialogActive: false,
    dialogActiveProductDetail: false,
    dialogAddQuantityProductDetails: false,
    dialogAddProductDetails: false,
    renderComponent: true,
    editedIndex: -1,
    currentPage: 1,
    pageCount: 0,
    searchStatus: false,
    searchName: false,
    selected: [],
    itemSelected: [],
    productDetailSelected: [],
    credential: {},
    credentials: {},
    supplierName: "",
    productTypeName: "",
    // Search table
    isSearchTableProduct: true,
    isSearchTableSupplier: false,
    isSearchTableCategory: false,
    txtSearchProduct: "",
    txtSearchCategory: "",
    txtSearchSupplier: "",
    quantity: 0,
    productDetailSize: "",
    ////////////////////
    numberRule: (v) => {
      if (!isNaN(parseFloat(v)) && v > 0) return true;
      return "Number must be greater than 0!";
    },
    itemAdd: [
      { icon: "mdi-plus", text: "Thêm hàng hóa" },
      { icon: "mdi-plus", text: "Thêm khuyến mãi" },
    ],
    headers: [
      {
        text: "Mã hàng",
        align: "start",
        value: "productId",
      },
      { text: "Tên hàng", value: "productName" },
      { text: "Loại Hàng", value: "categoryName" },
      { text: "Giá bán", value: "realPrice" },
      { text: "Giá vốn", value: "productPrice" },
      { text: "Trạng thái", value: "status" },
      { text: "Nhà sản xuất", value: "supplierName" },
      { text: "Ngày đặt hàng", value: "createAt" },
      { text: "Actions", value: "actions", sortable: false },
      { text: "", value: "data-table-expand" },
    ],
    headersProductDetails: [
      {
        text: "Mã hàng",
        align: "start",
        value: "proItemId",
      },
      { text: "Kích cỡ", value: "proSize" },
      { text: "Số lượng", value: "proQuantity" },
      { text: "Trạng thái", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    headerCategory: [
      {
        text: "Mã loại hàng",
        value: "proTypeId",
      },
      { text: "Tên loại hàng", value: "proTypeName" },
    ],
    headerSupplier: [
      { text: "Mã nhà cung cấp", value: "supplierId" },
      { text: "Tên nhà cung cấp", value: "supplierName" },
    ],
    itemsSize: [
      { text: "S", value: "S" },
      { text: "M", value: "M" },
      { text: "L", value: "L" },
      { text: "XL", value: "XL" },
      { text: "2XL", value: "2XL" },
      { text: "3XL", value: "3XL" },
      { text: "4XL", value: "4XL" },
    ],
    steps: [
      {
        name: "Điền thông tin",
        rules: [(v) => !!v || "Required."],
        valid: true,
      },
      {
        name: "Thêm hình",
        rules: [(v) => !!v || "Required."],
        valid: true,
      },
      {
        name: "Số lượng",
        rules: [(v) => !!v || "Required."],
        valid: true,
      },
      {
        name: "Hoàn thành",
        rules: [(v) => !!v || "Required."],
        valid: true,
      },
    ],
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogActive(val) {
      val || this.closeDialogActive();
    },
    currentPage() {
      if (this.isSearchTableProduct) {
        if (this.searchName) {
          this.credential = {
            txtSearch: this.txtSearchProduct,
            currentPage: this.currentPage,
          };
          this.searchProductsByQ(this.credential);
        } else if (this.searchStatus) {
          if (this.radioShow === "all") {
            this.credential = {
              txtSearch: "",
              currentPage: this.currentPage,
            };
            this.searchProductsByQ(this.credential);
            this.pageCount = this.pages.totalPages;
          } else {
            if (this.radioShow === "isOnSale") {
              this.credentials = {
                status: 1,
                currentPage: this.currentPage,
              };
              this.searchProductsByStatus(this.credentials);
              this.pageCount = this.pages.totalPages;
            } else if (this.radioShow === "isOffSale") {
              this.credentials = {
                status: -1,
                currentPage: this.currentPage,
              };
              this.searchProductsByStatus(this.credentials);
              this.pageCount = this.pages.totalPages;
            }
            this.searchName = false;
            this.searchStatus = true;
          }
        } else {
          if (
            this.txtSearchProduct != null &&
            this.txtSearchProduct.length != 0
          ) {
            this.onEnterClickSearchProduct();
          } else {
            this.searchStatus = false;
            this.searchName = false;
            this.getProducts(this.currentPage);
            this.pageCount = this.pages.totalPages;
          }
        }
      } else if (this.isSearchTableSupplier) {
        var credential = {
          currentPage: this.currentPage,
          txtSearchSupplier: this.txtSearchSupplier,
        };
        this.getSuppliers(credential);
      } else if (this.isSearchTableCategory) {
        var credentia = {
          currentPage: this.currentPage,
          txtSearchCategory: this.txtSearchCategory,
        };
        this.getCategories(credentia);
      }
    },
    onEnterClickSearchProduct() {
      this.credential = {
        txtSearch: this.txtSearchProduct,
        currentPage: this.currentPage,
      };
      this.isSearchTableProduct = true;
      this.isSearchTableSupplier = false;
      this.isSearchTableCategory = false;
      this.searchStatus = false;
      this.searchName = true;
      this.searchProductsByQ(this.credential);
      this.pageCount = this.pages.totalPages;
    },
  },

  computed: {
    ...mapGetters("product", ["products", "pages"]),
    ...mapGetters("category", ["categories", "pagesCategory"]),
    ...mapGetters("supplier", ["suppliers", "pagesSupplier"]),
    title() {
      return this.editedIndex === -1 ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm";
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.quantity.$dirty) return errors;
      !this.$v.quantity.minValue &&
        errors.push(
          `Quantity must be greater or equal ${this.$v.quantity.$params.minValue.min} `
        );
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.productDetailSize.$dirty) return errors;
      !this.$v.productDetailSize.required &&
        errors.push("Select product size is required");
      return errors;
    },
    proTypeNameErrors() {
      const errors = [];
      if (!this.$v.productTypeName.$dirty) return errors;
      !this.$v.productTypeName.required &&
        errors.push("Product type name is required");
      return errors;
    },
    supplierNameErrors() {
      const errors = [];
      if (!this.$v.supplierName.$dirty) return errors;
      !this.$v.supplierName.required &&
        errors.push("Supplier name is required");
      return errors;
    },
  },
  methods: {
    ...mapActions("product", [
      "getProducts",
      "productDetails",
      "addProductToList",
      "deleteProductFromList",
      "updateProductOfList",
      "activeProductFromList",
      "searchProductsByQ",
      "searchProductsByStatus",
      "deleteProductDetail",
      "activeProductDetailFromList",
      "addQuantityProductDetail",
      "createProductDetail",
    ]),
    ...mapActions("supplier", ["addNewSupplier", "getSuppliers"]),
    ...mapActions("category", ["createNewCategory", "getCategories"]),
    add() {
      this.inputs.push({ name: "", quantity: 0, discount: 0 });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    stepComplete(step) {
      return this.curr > step;
    },
    stepStatus(step) {
      return this.curr > step ? "green" : "blue";
    },
    nextStep(index) {
      this.e1 = index;
    },
    validate(n) {
      this.steps[n].valid = false;
      let v = this.$$refs.stepForm[n].validate();
      if (v) {
        this.steps[n].valid = true;
        // continue
        this.curr = n + 2;
      }
    },
    done() {
      this.curr = 5;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////
    addQuantityProductDetailsDialog(item) {
      this.productDetailSelected = item;
      if (item.status == -1) {
        this.dialogActiveProductDetail = true;
      } else {
        this.dialogAddQuantityProductDetails = true;
      }
    },
    async addQuantityProductDetailsConfirm() {
      this.$v.$touch();
      if (this.quantityErrors.length === 0) {
        this.$v.$reset();
        const credential = {
          productId: this.productDetailSelected.proId,
          productItemId: this.productDetailSelected.proItemId,
          productSize: this.productDetailSelected.proSize,
          quantity: this.quantity,
        };
        const response = await this.addQuantityProductDetail(credential);
        if (response === 200) {
          Vue.toasted
            .show("Add quantity product detail successfully")
            .goAway(1500);
          this.closeAddQuantityProductDetails();
        } else {
          Vue.toasted.show("Add quantity product detail failed!").goAway(1500);
        }
      }
    },

    closeAddQuantityProductDetails() {
      this.productDetailSelected = "";
      this.renderComponent = false;
      this.dialogAddQuantityProductDetails = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
        this.quantity = 0;
      });
    },
    //////////////////////////////////////////////////////////////////////////////////

    addProductDetailsDialog(item) {
      this.itemSelected = item;
      this.dialogAddProductDetails = true;
    },
    async addProductDetailsConfirm() {
      this.$v.$touch();
      if (this.quantityErrors.length === 0 && this.selectErrors.length === 0) {
        this.$v.$reset();
        const credential = {
          productId: this.itemSelected.productId,
          proSize: this.productDetailSize,
          proQuantity: this.quantity,
        };
        var productDetailsCheck = null;
        const index = this.products.findIndex(
          (products) => products.productId === credential.productId
        );
        if (index != -1) {
          const ind = this.products[index].productDetails.findIndex(
            (prod) =>
              prod.proId === credential.productId &&
              prod.proSize === credential.proSize
          );
          productDetailsCheck = this.products[index].productDetails[ind];
        }
        if (productDetailsCheck != null && productDetailsCheck.status == -1) {
          this.activeProductDetails(productDetailsCheck);
        } else {
          const response = await this.createProductDetail(credential);
          if (response === 200) {
            Vue.toasted("Add product detail successfully").goAway(1500);
            this.closeAddProductDetailsDialog();
          } else {
            Vue.toasted.show("Add product detail failed!").goAway(1500);
          }
        }
      }
    },

    closeAddProductDetailsDialog() {
      this.itemSelected = "";
      this.productDetailSize = "";
      this.renderComponent = false;
      this.dialogAddProductDetails = false;
      this.quantity = 0;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
      });
    },

    ////////////////////////////////////////////////////////////////
    deleteProductDetails(item) {
      this.productDetailSelected = item;
      this.dialogDeleteProductDetail = true;
    },

    async deleteProductDetailsConfirm() {
      const response = await this.deleteProductDetail(
        this.productDetailSelected
      );
      if (response === 200) {
        Vue.toasted.show("Delete product detail successfully").goAway(1500);
        this.closeDeleteProductDetails();
      } else {
        Vue.toasted.show("Delete product detail failed!").goAway(1500);
      }
    },

    closeDeleteProductDetails() {
      this.productDetailSelected = "";
      this.renderComponent = false;
      this.dialogDeleteProductDetail = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
      });
    },
    /////////////////////////////////////////////////////////////////////////
    activeProductDetails(item) {
      this.productDetailSelected = item;
      this.dialogActiveProductDetail = true;
    },

    async activeProductDetailsConfirm() {
      const response = await this.activeProductDetailFromList(
        this.productDetailSelected
      );
      if (response === 200) {
        Vue.toasted.show("Active product successfully").goAway(1500);
        this.closeActiveProductDetails();
      } else {
        Vue.toasted.show("Active product failed!").goAway(1500);
      }
    },

    closeActiveProductDetails() {
      this.productDetailSelected = "";
      this.renderComponent = false;
      this.dialogActiveProductDetail = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
      });
    },
    closeDialogNewCategory() {
      this.dialogType = false;
      this.productTypeName = "";
      this.$v.$reset();
    },
    async onAddNewCategory() {
      this.$v.$touch();
      if (this.proTypeNameErrors.length === 0) {
        this.$v.$reset();
        const response = await this.createNewCategory({
          proTypeName: this.productTypeName,
        });
        if (response === 200) {
          Vue.toasted.show("Create new category successfully.").goAway(1500);
          this.productTypeName = "";
          this.dialogType = false;
        } else {
          Vue.toasted.show("Create new category failed!").goAway(1500);
        }
      }
    },
    closeDialogNewSupplier() {
      this.supplierName = "";
      this.dialogSupplier = false;
      this.$v.$reset();
    },
    async onAddNewSupplier() {
      this.$v.$touch();
      if (this.supplierNameErrors.length === 0) {
        this.$v.$reset();
        const response = await this.addNewSupplier({
          supplierName: this.supplierName,
        });
        console.log(response);
        if (response === 200) {
          Vue.toasted.show("Create new supplier successfully").goAway(1500);
          this.supplierName = "";
          this.dialogSupplier = false;
        } else {
          Vue.toasted.show("Create new supplier failed!").goAway(1500);
        }
      }
    },
    searchProductsWithStatus() {
      this.currentPage = 1;
      this.isSearchTableProduct = true;
      this.isSearchTableSupplier = false;
      this.isSearchTableCategory = false;
      if (this.radioShow === "all") {
        this.credential = {
          txtSearch: "",
          currentPage: this.currentPage,
        };
        this.searchProductsByQ(this.credential);
        this.pageCount = this.pages.totalPages;
      } else {
        if (this.radioShow === "isOnSale") {
          this.credentials = {
            status: 1,
            currentPage: this.currentPage,
          };
          this.searchProductsByStatus(this.credentials);
          this.pageCount = this.pages.totalPages;
        } else if (this.radioShow === "isOffSale") {
          this.credentials = {
            status: -1,
            currentPage: this.currentPage,
          };
          this.searchProductsByStatus(this.credentials);
          this.pageCount = this.pages.totalPages;
        }
        this.searchName = false;
        this.searchStatus = true;
      }
    },

    onEnterClickSearchProduct() {
      (this.currentPage = 1),
        (this.credential = {
          txtSearch: this.txtSearchProduct,
          currentPage: this.currentPage,
        });
      this.isSearchTableProduct = true;
      this.isSearchTableSupplier = false;
      this.isSearchTableCategory = false;
      this.searchName = true;
      this.searchStatus = false;
      this.searchProductsByQ(this.credential);
      this.pageCount = this.pages.totalPages;
    },
    editItem(item) {
      this.itemSelected = item;
      this.dialog = true;
    },

    //Dialog delete item
    deleteItem(item) {
      this.itemSelected = item;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const response = await this.deleteProductFromList(
        this.itemSelected.productId
      );
      if (response === 200) {
        Vue.toasted.show("Delete item successfully").goAway(1500);
        this.closeDelete();
      } else {
        Vue.toasted.show("Delete item failed!").goAway(1500);
      }
    },

    closeDelete() {
      this.itemSelected = "";
      this.renderComponent = false;
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
      });
    },
    /////////////////////

    //Dialog Active Item
    activeItem(item) {
      this.itemSelected = item;
      this.dialogActive = true;
    },

    async activeItemConfirm() {
      const response = await this.activeProductFromList(
        this.itemSelected.productId
      );
      if (response === 200) {
        Vue.toasted.show("Active item successfully").goAway(1500);
        this.closeDialogActive();
      } else {
        Vue.toasted.show("Active item failed!").goAway(1500);
      }
    },

    closeDialogActive() {
      this.dialogActive = false;
      this.itemSelected = "";
      this.renderComponent = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
      });
    },
    ////////////////////
    formatDate(value) {
      return moment(value).format("MM/DD/YYYY");
    },
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    checkStatusProduct(value) {
      if (value > 0) return "Active";
      if (value === -1) return "Delete";
      if (value === 0) return "Out of stock";
    },
    getColor(status) {
      if (status === 1) return "green";
      if (status === -1) return "red";
      return "yellow";
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.renderComponent = true;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } else {
      //   this.desserts.push(this.editedItem);
      // }
      this.close();
    },
    onEnterClickSearchCategory() {
      this.currentPage = 1;
      this.isSearchTableCategory = true;
      this.isSearchTableSupplier = false;
      this.isSearchTableProduct = false;
      var credential = {
        currentPage: this.currentPage,
        txtSearchCategory: this.txtSearchCategory,
      };
      this.getCategories(credential);
    },
    onEnterClickSearchSupplier() {
      this.currentPage = 1;
      this.isSearchTableSupplier = true;
      this.isSearchTableProduct = false;
      this.isSearchTableCategory = false;
      var credential = {
        currentPage: this.currentPage,
        txtSearchSupplier: this.txtSearchSupplier,
      };
      this.getSuppliers(credential);
    },
  },
  created() {
    this.getProducts(this.currentPage);
    this.pageCount = this.pages.totalPages;
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