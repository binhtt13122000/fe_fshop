<template>
  <div class="text-center">
    <div >
    <v-pagination 
      v-model="currenPage"
      :length="lastPage"
      :total-visible="8"
    ></v-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["product", "cart", "pages"],
  computed: {
    currenPage: {
        get() {
          console.log(this.$store("product").state.pages.number);
            return this.$store.state.pages.number
        }
    },
    lastPage: {
        get() {
          console.log(this.$store("product").state.pages.totalElement);
            return this.$store.state.pages.totalElements;
        }
    },
  },
    ...mapGetters("product", ["pages"]),
};
</script>