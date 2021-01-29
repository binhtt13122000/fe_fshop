<template>
  <div>
    <v-dialog v-model="dialog" width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark class="mb-2" v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
          Thêm sản phẩm
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="blue darken-1"> {{ title }} </v-card-title>
        <v-tabs v-model="addTab">
          <v-tab>Thông tin</v-tab>
          <v-tab>Mô tả chi tiết</v-tab>
        </v-tabs>
        <v-tabs-items v-model="addTab">
          <v-tab-item v-for="n in 2" :key="n">
            <v-container v-if="n === 1">
              <v-row class="mx-2">
                <v-col class="align-center justify-space-between" cols="6">
                  <v-text-field
                    append-outer-icon="mdi-information"
                    label="Mã hàng"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.proType"
                    label="Loại hàng"
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
                  <v-row class="file-image">
                    <!-- <span class="img-span">Thêm</span> -->
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
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <h1>love you</h1>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </div>
</template>