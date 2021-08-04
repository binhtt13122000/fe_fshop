<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
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

      <!--App bar -->
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <img
            class="img-responsive"
            src="https://4menshop.com/logo.png"
            alt="4men"
          />
          <span class="hidden-sm-and-down">2$</span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-xs-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon class="hidden-xs-and-down">
          <v-icon>mdi-shopping</v-icon>
        </v-btn>
        <v-btn icon to="/loginpage" class="hidden-xs-and-down">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <!-- <v-icon large>mdi-code-tags</v-icon> -->
                  <p>Nơi chứa nội dung sản phẩm</p>
                </v-btn>
              </template>
              <span>Nơi chứa nội dung sản phẩm</span>
            </v-tooltip>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    btns: [["mdi-account", "0"]],
    colors: ["blue darken-3"],
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-history", text: "History" },
      { icon: "mdi-share-variant-outline", text: "Share" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Manage",
        model: true,
        children: [
          { icon: "mdi-reproduction", text: "Product" },
          { icon: "mdi-account", text: "Account" },
          { icon: "mdi-human", text: "Seller" },
        ],
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "More",
        model: false,
        children: [
          { text: "View revenue" },
          { text: "View trend search" },
          { text: "Print" },
          { text: "Other contacts" },
        ],
      },
      { icon: "mdi-cog", text: "Settings" },
      { icon: "mdi-message", text: "Send feedback" },
      { icon: "mdi-help-circle", text: "Help" },
      { icon: "mdi-cellphone-link", text: "App downloads" },
      { icon: "mdi-shopping", text: "Shopping" },
    ],
  }),
};
</script>

<style lang="scss">
@media only screen and (max-width: 850px) {
}
@media only screen and (max-width: 500px) {
}
</style>