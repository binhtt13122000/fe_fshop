<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-app id="inspire"> -->
        <!-- Navigation bar -->
        <my-header></my-header>
        <!-- V main -->
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <div class="main-image">
                <img class="img-responsive" :src="mainImageSrc" width="100%" />
              </div>

              <div class="image-center-item">
                <img
                  class="img-responsive-left"
                  src="https://ninomaxx.com.vn/wp-content/uploads/2020/10/Artboard-2.png"
                  alt="4men"
                  :image-ratio="16 / 9"
                  width="50%"
                />
                <h2 class="image-center-text-a">POLO</h2>
                <v-btn class="image-center-btn-a">XEM THÊM</v-btn>
                <img
                  class="img-responsive-right"
                  src="https://ninomaxx.com.vn/wp-content/uploads/2020/10/Artboard-1-1.png"
                  alt="4men"
                  :image-ratio="16 / 9"
                  width="50%"
                />
                <h2 class="image-center-text-b">SHIRT</h2>
                <v-btn class="image-center-btn-b">XEM THÊM</v-btn>
              </div>
            </v-row>
          </v-container>
        </v-main>

        <!-- Footer -->
        <!-- <VmFooter/> -->
        <my-footer></my-footer>
      <!-- </v-app> -->
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VmFooter from "../components/Footer.vue";
import VmHeader from "../components/Header.vue";
export default {
  props: {
    source: String,
  },
  components: {
    "my-footer": VmFooter,
    "my-header": VmHeader
  },
  data: () => ({
    drawer: null,
    linkBar: [
      "Nam",
      "Nữ",
      "Bộ sưu tập",
      "Blog",
      "khuyến mãi",
      "Hệ Thống cửa hàng",
    ],
    images: [],
    isValid: false,
    isAccount: false,
    mainImageSrc: null,
  }),
  mounted() {
    this.onResize();
    // console.log(this.$vuetify.breakpoint)

    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isValid = window.innerWidth <= 1040;
      this.isAccount = window.innerWidth <= 900;
    },
    ...mapGetters("auth", ["user"]),
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
      {
        id: "4",
        image:
          "https://ninomaxx.com.vn/wp-content/uploads/2021/01/BANNER-WEB.png",
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
// .app-bar {
//   opacity: 15%;
// }

// .app-bar:hover {
//   opacity: 100%;
// }
// .bar-center {
//   background-color: #ffffff;
//   opacity: 60%;
// }

// .nar-bar-btn {
//   .nar-links {
//     list-style-type: none;
//   }

//   .nar-links li {
//     display: inline;
//     padding: 0px 12px 0px 12px;
//   }
//   .nar-links li a {
//     color: #ffffff;
//     text-decoration: none;
//     font-size: 15px;
//     text-transform: uppercase;
//   }
// }

// #footer-center {
//   h4 {
//     font-family: "Times New Roman", Times, serif;
//     font-size: 25px;
//     text-align: center;
//   }
//   ul {
//     list-style-type: none;
//     li a {
//       text-decoration: none;
//       text-align: left;
//       justify-content: left;
//       color: #000000;
//     }
//     li a:hover {
//       text-decoration: underline;
//       color: #ff0000;
//     }
//   }
// }

// #footer-center .mx-auto {
//   display: inline-table;
//   align-items: center;
//   padding: 5px;
// }

// #socialIcon {
//   a {
//     text-decoration: none;
//     padding: 0px 15px 0px 15px;
//   }
// }

.image-center-item {
  position: relative;
  display: block;
}

.image-center-item .img {
  position: relative;
}

.image-center-text-a {
  position: absolute;
  top: 0.5em;
  left: 3.5em;
  /* background-color:#8F0005; */
  border-radius: 1.5em;
  color: #000000;
  border-color: #000000;
  text-transform: uppercase;
  padding: 1em 1.5em;
}
.image-center-text-b {
  position: absolute;
  top: 0.5em;
  right: 20em;
  /* background-color:#8F0005; */
  border-radius: 1.5em;
  color: #000000;
  border-color: #000000;
  text-transform: uppercase;
  padding: 1em 1.5em;
}

.image-center-item .image-center-btn-a {
  position: absolute;
  top: 7em;
  left: 6em;
  /* background-color:#8F0005; */
  border-radius: 1.5em;
  color: #000000;
  border-color: #000000;
  text-transform: uppercase;
  padding: 1em 1.5em;
}
.image-center-item .image-center-btn-b {
  position: absolute;
  top: 7em;
  right: 35em;
  /* background-color:#8F0005; */
  border-radius: 1.5em;
  color: #000000;
  border-color: #000000;
  text-transform: uppercase;
  padding: 1em 1.5em;
}
// @media only screen and (max-width: 340px) {
//   .image-center-item .image-center-btn-a {
//     left: 16em;
//   }
//   .image-center-text-a {
//     top: 1em;
//     font-size: 24px;
//     left: 5.3em;
//   }
//   .image-center-item .image-center-btn-b {
//     top: 35em;
//     left: 10em;
//   }
//   .image-center-text-b {
//     top: 10em;
//     font-size: 24px;
//     left: 5.1em;
//   }
// }

@media only screen and (max-width: 378px) {
  .image-center-item .image-center-btn-a {
    left: 10em;
  }
  .image-center-text-a {
    top: 1em;
    font-size: 24px;
    left: 5.3em;
  }
  .image-center-item .image-center-btn-b {
    top: 35em;
    left: 10em;
  }
  .image-center-text-b {
    top: 2em;
    font-size: 24px;
    left: 5.1em;
  }
}

@media only screen and (max-width: 430px) {
  .image-center-item .image-center-btn-a {
    left: 10em;
  }
  .image-center-text-a {
    top: 1em;
    font-size: 24px;
    left: 5.3em;
  }
  .image-center-item .image-center-btn-b {
    top: 37em;
    left: 10em;
  }
  .image-center-text-b {
    top: 18.2em;
    font-size: 24px;
    left: 5.3em;
  }
}
// @media only screen and (max-width: 560px) {
//   .image-center-item .image-center-btn-a {
//     left: 15em;
//   }
//   .image-center-text-a {
//     top: 1em;
//     font-size: 24px;
//     left: 8.5em;
//   }
//   .image-center-item .image-center-btn-b {
//     top: 47em;
//     left: 15em;
//   }
//   .image-center-text-b {
//     top: 24em;
//     font-size: 24px;
//     left: 8.2em;
//   }
// }
@media only screen and (min-width: 610px) {
  .image-center-item .image-center-btn-a {
    left: 10em;
  }
  .image-center-text-a {
    top: 1em;
    font-size: 24px;
    left: 5.3em;
  }
  .image-center-item .image-center-btn-b {
    top: 6.5em;
    right: 10em;
  }
  .image-center-text-b {
    top: 0.9em;
    font-size: 24px;
    right: 5.3em;
  }
}
@media only screen and (max-width: 600px) {
  .image-center-item {
    display: block;
    .img-responsive-left {
      width: 100%;
    }

    .img-responsive-right {
      width: 100%;
    }
  }
  #footer-center .mx-auto {
    display: block;
    text-align: center;
  }
}
</style>






