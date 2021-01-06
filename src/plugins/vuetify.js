import '@mdi/font/css/materialdesignicons.css'
// import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: ['mdi','fa4'], // default
        values: {
          facebook: 'mdi-facebook',
          google: 'mdi-google'
        },
      },
});
