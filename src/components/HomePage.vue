<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <!--App bar -->
        <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="grey darken-3"
          dark
          style="height: 80px"
        >
            <div class="site-logo">
                <a href="#">
                  <img
                    class="img-responsive"
                    src="https://4menshop.com/logo.png"
                    alt="4men"
                  />
                </a>
            </div>    
          <v-row justify="center">
              <v-btn 
                v-for="link in linkBar"
                :key="link"
                color="white"
                text
              >{{link}}</v-btn>
          </v-row>
        </v-app-bar>

        <v-main> 


        </v-main>
        <v-footer color="grey darken-3" padless>
          <v-row justify="center" no-gutters>
            <v-btn
              v-for="link in links"
              :key="link"
              color="white"
              text
              rounded
              class="my-2"
            >
              {{ link }}
            </v-btn>
            <v-col
              class="grey darken-1 py-4 text-center white--text"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
          </v-row>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    linkBar: ["Name", "Nữ", "Bộ sưu tập", "Blog", "khuyến mãi", "Hệ Thống cửa hàng"],
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>

<style lang="scss">
@media only screen and (max-width: 850px) {
}
@media only screen and (max-width: 500px) {
}
</style>