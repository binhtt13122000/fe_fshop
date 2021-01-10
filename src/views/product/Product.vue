<template>
  <div>
    <v-card class="mx-4 mb-4">
      <div
        class="md-4 shadow-sm"
        v-for="(productImage, i) in product.productImages"
        :key="i"
        id="button-container"
      >
        <a :href="'/productdetail/' + product.productId">
          <img class="img-responsive" :src="productImage.imgUrl" width="100%" />
        </a>
        <v-btn
            class="is-small"
            align="left"
            justify="right"
            :title="removeToFavourite"
            v-show="isFavourite"
            @click="changeFavourite()"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn
            class="is-small"
            align="left"
            justify="right"
            :title="addToFavourite"
            v-show="!isFavourite"
            @click="changeFavourite()"
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
      </div>
      <div class="media">
        <v-card-title>{{ product.productName }}</v-card-title>
        <v-card-text>
          <p>{{ product.productDescription }}</p>
          <v-row>
            <v-col>
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          </v-col>
          
          </v-row>
        </v-card-text>
      </div>

      <v-spacer></v-spacer>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn width="100%">
              <v-icon>mdi-shopping</v-icon>
              Đăng ký mua</v-btn>
          </v-col>
          <v-col>
            <v-btn width="100%">
              <v-icon>mdi-plus</v-icon>
              Giỏ hàng
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "product",
  props: ["product"],

  data() {
    return {
      isFavourite: true,
      rating: 6,
      addToFavourite: "Add to favourite",
      removeToFavourite: "Remove from favourite",
    };
  },

  methods: {
    changeFavourite() {
      if (this.isFavourite == true) {
        this.isFavourite = false;
      } else if (this.isFavourite == false) {
        this.isFavourite = true;
      }
    },
  },
};
</script>
<style>
.title {
  color: #000000;
}

/* #container {
  position: relative;
}

#container .img{
  display: block;
}

#container .is-small{
  position: absolute; 
  bottom:0; 
  left:0
} */


 #button-container {
  position: relative;
  display:inline-block;
}

#button-container .img{
  /* display: block; */
  position: relative;
  z-index: 1;
}

#button-container .is-small{
 position: absolute;
bottom:2em;
right:2em;
/* background-color:#8F0005; */
border-radius:1.5em;
color:red;
text-transform:uppercase;
padding:1em 1.5em;

} 

/* @media only screen and (max-width:600px) {

#button-container{
display:inline-block;
margin-bottom:2em;
}
#button-container .is-small{
position:relative;
bottom:0em;
right:-2em;
background-color:#8F0005;
color:white;
font-size:1em;
padding:1em 1.5em;
text-transform:uppercase;
border-color:#ff0000;
border-radius:1.5em;
}
}

.button-container .is-small:hover{
background-color: #ff0000;
cursor:pointer;
color:white;
} */
</style>