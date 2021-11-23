import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '../assets/scss/index.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light : {
                primary_expon: '266BB0',
                success_expon: '1CAC78',
                error_expon: 'D32F2F',
                info_expon: 'CCE5FF',
                blueMinsal:'#175EFB',   
                blueGrayMinsal:'#6A83BE',   
                blueDarkMinsal:'#2D52A8',
                bgMinsal:'#F4F7FD',
            }
        }
    }
});
