import Vue from "vue";
import store from '../store'

Vue.prototype.showLoader = async() => {
    await store.commit('utils/setLoader', true)
}

Vue.prototype.hideLoader =async () => {
    await store.commit('utils/setLoader', false)
}

Vue.prototype.isEmail = (value) => {
    if (value === null) return false
    return /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/.test(value)
}
Vue.prototype.validInput = (v) => {
    if (v.value != null && v.value != "") {
      v.error = false;
      v.error_msg = "";
      return true
    } else {
      v.error = true;
      v.error_msg = "Este campo es requerido";
      return false
    }
  },
Vue.prototype.isDui = (dui) => {
    if (dui === null) return false
    let valido = false;

    // Validando la longitud del numero de DUI
    if (dui.length === 10) {

        // Validando que no sea ceros todos los dígitos
        if (dui !== '00000000-0') {

            // Obteniendo los dígitos y el verificador
            let [digitos, validador] = dui.split('-');

            // Verficiando que la cadena
            if (typeof digitos !== 'undefined' && typeof validador !== 'undefined') {

                // Verificando que el validador sea de un solo caracter
                if (validador.length === 1) {

                    // Convirtiendo los digitos a array
                    digitos = digitos.split('');

                    // Convirtiendo los datos a tipo integer
                    validador = parseInt(validador, 10);
                    digitos = digitos.map(digito => parseInt(digito, 10));

                    // Obteniendo la suma corresponiente
                    let suma = digitos.reduce((total, digito, index) => total += (digito * (9 - index)), 0);

                    // Obteniendo el Modulo base 10
                    let mod = suma % 10;
                    mod = (validador === 0 && mod === 0) ? 10 : mod;

                    let resta = 10 - mod;

                    if (resta === validador) {
                        valido = true;
                    }
                }
            }
        }
    }
    return valido;
}

Vue.prototype.isNit = (nit) => {
    if (nit === null) return false

    let valido = false;

    // Validando la longitud del numero de DUI
    if (nit.length === 17) {
        // Validando que no sea ceros todos los dígitos
        if (nit !== '0000-000000-000-0' && nit.match(/^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$/)) {

            // Obteniendo los dígitos y el verificador por separado
            let [ubicacion, fecha, correlativo, validador] = nit.split('-');
            let digitos = (ubicacion + fecha + correlativo).split('');

            // Convirtiendo los datos a tipo integer
            validador = parseInt(validador, 10);
            correlativo = parseInt(correlativo, 10);
            let suma = 0;
            let mod = 0;
            if (correlativo <= 100) {
                // Obteniendo la suma corresponiente
                suma = digitos.reduce((total, digito, index) => total += (parseInt(digito, 10) * (14 - index)), 0);
                // Obteniendo el Modulo base 11
                mod = suma % 11;
                mod = mod === 10 ? 0 : mod;
            } else {
                // Obteniendo la suma corresponiente
                suma = digitos.reduce((total, digito, index) => total += (parseInt(digito, 10) * parseInt((3 + 6 * Math.floor((index + 5) / 6)) - (index + 1), 10)), 0);
                // Obteniendo el Modulo base 11
                mod = suma % 11;
                mod = mod > 1 ? (11 - mod) : 0;
            }
            if (mod === validador) {
                valido = true;
            }
        }
    }
    return valido;
}
