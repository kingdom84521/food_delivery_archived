import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/styles/variables.sass' // custom font family

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
