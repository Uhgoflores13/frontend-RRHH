import Vue from "vue";
import VueRouter from "vue-router";
import { rolesRouter } from "../modules/roles/rolesRouter"
import { perfilesRouter } from "../modules/perfiles/perfilesRouter"
import { usuariosRouter } from "../modules/usuarios/usuariosRouter"
import { rutasRouter } from "../modules/rutas/rutasRouter"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import(/* webpackChunkName: "layout" */ "../views/layout"),
    children: [
      {
        path: "perfil",
        name: "perfil",
        component: () =>
          import(/* webpackChunkName: "perfil" */ "../views/perfil"),
      },
      {
        path: "/",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "perfil" */ "../views/dashboard"),
      },
      rolesRouter,
      perfilesRouter,
      usuariosRouter,
      rutasRouter,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login"),
  },
  {
    path: "/recuperar-password",
    name: "recuperar-password",
    component: () =>
      import(
        /* webpackChunkName: "recuperarPassword" */ "../views/recuperarPassword"
      ),
  },
  {
    path: "/reset-password/:id",
    name: "reset-password",
    component: () =>
      import(/* webpackChunkName: "resetPassword" */ "../views/resetPassword"),
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () =>
      import(/* webpackChunkName: "forbidden" */ "../views/Forbidden"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // if (to.fullPath == "/") {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     next("/login");
  //     return;
  //   }
  // }
  if (await Vue.prototype.canNext(to)) {
    next();
  } else {
    next("/forbidden");
  }
});

export default router;
