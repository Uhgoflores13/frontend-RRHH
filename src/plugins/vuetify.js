import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '../assets/scss/index.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            //Se definen colores globales para el tema claro
            light : {
                blueMinsal:'#175EFB',   
                blueGrayMinsal:'#6A83BE',   
                blueDarkMinsal:'#2D52A8',
                bgMinsal:'#F4F7FD',
            }
        }
    }
});
