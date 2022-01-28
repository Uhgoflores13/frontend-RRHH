import Vue from "vue";
import store from "../store";

const http_client = async (
  url,
  data = {},
  method = "get",
  headers = {},
  sendToken = true
) => {
  const token = store.state.token
    ? store.state.token
    : localStorage.getItem("token");

  if (token && sendToken) headers.Authorization = "Bearer " + token;

  let config = {
    method,
    url,
    headers,
  };
  if (method === "get") {
    config.params = data;
  } else {
    config.data = data;
  }
  try {
    return await Vue.prototype.axios(config);
  } catch (e) {
    if (e.response.status === 500) {
      Vue.prototype.temporalAlert({
        show: true,
        message: e.response.data.message
          ? e.response.data.message
          : "Ha ocurrido un error interno",
        type: "error",
      });
    }
    if (e.response.status === 422) {
      Vue.prototype.temporalAlert({
        show: true,
        message: e.response.data.message
          ? e.response.data.message
          : "No se pudo procesar la entidad",
        type: "error",
      });
    }
    if (e.response.status === 404) {
      Vue.prototype.temporalAlert({
        show: true,
        message: e.response.data.message
          ? e.response.data.message
          : "No se encontró el recurso",
        type: "error",
      });
    }
    if (e.response.status === 403) {
      Vue.prototype.temporalAlert({
        show: true,
        message: e.response.data.message
          ? e.response.data.message
          : "Petición rechazada",
        type: "error",
      });
    }
    if (e.response.status === 400) {
      Vue.prototype.temporalAlert({
        show: true,
        message: e.response.data.message
          ? e.response.data.message
          : "Petición erronea",
        type: "error",
      });
    }
    if (e.response.status === 401) {
      Vue.prototype.temporalAlert({
        show: true,
        message: e.response.data.message
          ? e.response.data.message
          : "Acceso no autorizado",
        type: "error",
      });
    }
    Vue.prototype.hideLoader();
    return;
  }
};

Vue.prototype.http_client = http_client;

export { http_client };
