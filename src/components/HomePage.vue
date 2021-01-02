<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <!-- Navigation bar -->
        <v-navigation-drawer
          v-model="drawer"
          v-if="isValid"
          :clipped="$vuetify.breakpoint.lgAndUp"
          app
          right
        >
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="nav-bar-search"
            style="width: 10%"
          ></v-text-field>
          <v-list class="nar-bar-btn"  dense  justify="center" align="center">
            <!-- <v-list-group> -->
              <v-list-item link v-if="isAccount">
                <v-list-item-content>
                  <v-list-item-title>Login/Register</v-list-item-title>
                </v-list-item-content>
              
              </v-list-item>
              <br>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Name<v-icon>mdi-chevron-down</v-icon></v-list-item-title>
                  
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Nữ<v-icon>mdi-chevron-down</v-icon></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Bộ sưu tập<v-icon>mdi-chevron-down</v-icon></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Blog<v-icon>mdi-chevron-down</v-icon></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Khuyến mãi</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title>Hệ Thống cửa hàng</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- </v-list-group> -->
            </v-list>
          
        </v-navigation-drawer>
  <!--App bar -->
        <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="grey darken-3"
          dark
          style="height: 65px"
          class="app-bar"
        >
          <div class="site-logo">
            <a href="/" >
              <img
                class="img-responsive"
                src="https://4menshop.com/logo.png"
                alt="4men"
              />
            </a>
          </div>
          <!-- <v-row class="hidden-md-and-down" width="90px" justify="center">
            <v-btn v-for="link in linkBar" :key="link" color="white" text>{{
              link
            }}</v-btn>
          </v-row> -->
          <v-row id="nav-bar-btn" class="hidden-md-and-down" width="90px" justify="center">
            <div class="nar-bar-btn">
              <ul class="nar-links">
                <li><a  href="">Nam</a></li>
                <li><a href="">Nữ</a></li>
                <li><a href="">Blog</a></li>
                <li><a href="">Bộ sưu tập</a></li>
                <li><a href="">Khuyến mãi</a></li>
                <li><a href="">Hệ thống cửa hàng</a></li>
              </ul>
            </div>
          </v-row>
          

  <!-- Create right column -->

          <v-spacer></v-spacer>
          <!-- <v-col cols="12" sm="3" md="3" lg="3" xl="3"> -->
            <v-text-field
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              class="hidden-sm-and-down"
            ></v-text-field>
          <!-- </v-col> -->
            <v-btn icon class="hidden-xs-and-down">
              <v-icon>mdi-shopping</v-icon>
            </v-btn>
            <v-btn icon to="/loginpage" class="hidden-md-and-down">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          
          <v-app-bar-nav-icon
            class="ml-0 pl-4"
            @click.stop="drawer = !drawer"
            v-if="isValid"
          ></v-app-bar-nav-icon>
        </v-app-bar>
  <!-- V main -->
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <div class="main-image">
                <img class="img-responsive" :src="mainImageSrc" width="100%"/>
              </div>
              <!-- <div class="image-list">
                <div v-for="img in images" :key="img" class="item">
                  <img class="img-responsive" src="img.image" />
                </div>
              </div> -->
            </v-row>
          </v-container>
        </v-main>
  <!-- footer -->
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
            <v-col class="grey darken-1 py-4 text-center white--text" cols="12">
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
    drawer: null,
    linkBar: [
      "Name",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    images: [],
    isValid: false,
    isAccount: false,
    mainImageSrc: null,
  }),
  // beforeDestroy () {
  //     if (typeof window === 'undefined') return

  //     window.removeEventListener('resize', this.onResize, { passive: true })
  //   },
  mounted () {
      this.onResize()

      window.addEventListener('resize', this.onResize, { passive: true })
    },
  methods: {
      onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    }
  },
  
  created() {
    let self = this;
    this.images = [
      {
        id: "1",
        image:
          "https://ninomaxx.com.vn/wp-content/uploads/2020/12/1920x1089banner-destop-1.jpg",
      },
      {
        id: "2",
        image:
          "https://ninomaxx.com.vn/wp-content/uploads/2020/10/BANNER-WEB-2.png",
      },
      {
        id: "3",
        image:
          "https://ninomaxx.com.vn/wp-content/uploads/2020/10/BANNER-PC.png",
      },
    ];
    setInterval(function () {
      self.mainImageSrc =
        self.images[Math.floor(Math.random() * self.images.length)].image;
    }, 3000);
  },
};
</script>

<style lang="scss">
.app-bar {
  opacity: 15%;
}

.app-bar:hover {
  opacity: 100%;
}
.bar-center {
  background-color: #ffffff;
  opacity: 60%;
}


.nar-bar-btn  {

  .nar-links {
    list-style-type: none;
  }

  .nar-links li{
    display: inline;
    padding: 0px 12px 0px 12px;
  }
  .nar-links li a{
      color: #ffffff;
      text-decoration: none;
      font-size: 15px;
      text-transform: uppercase;
  }
}

@media only screen and (max-width: 1390px) {

}
@media only screen and (max-width: 560px) {
  // .right-column-icon v-btn {
  //   text-align: center;
  // }
}
</style>