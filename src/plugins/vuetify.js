import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '../assets/scss/index.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light : {
                dark_bcen: '313945',
                grey_bcen: '697185',
                grey_bcen_light: 'C5C8CF',
                primary_bcen: '175EFB',
                secondary_bcen: '6A83BE',
                success_bcen: 'B7EE40',
                error_bcen: 'F36F23',
                info_bcen: '9DB3E8',
            }
        }
    }
});
