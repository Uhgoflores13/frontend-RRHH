import Vue from "vue";
import VueRouter from "vue-router";

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
        path: "/dashboard",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "perfil" */ "../views/dashboard"),
      },
      {
        path:"roles",
        name:'roles',
        component: () =>
              import(/* webpackChunkName: "rolesList" */ "../views/roles/roles.vue"),
        children:[
          {
            path: "list",
            name: "rolesList",
            component: () =>
              import(/* webpackChunkName: "rolesList" */ "../views/roles/rolesList.vue"),
          },
          {
            path: "create",
            name: "rolesCreate",
            component: () =>
              import(/* webpackChunkName: "rolesCreate" */ "../views/roles/rolesCreate.vue"),
          },
          {
            path: "edit/:id",
            name: "rolesEdit",
            component: () =>
              import(/* webpackChunkName: "rolesCreate" */ "../views/roles/rolesEdit.vue"),
          },
        ]
      },
      {
        path:"perfiles",
        name:'perfiles',
        component: () =>
              import(/* webpackChunkName: "rolesList" */ "../views/perfiles/perfiles.vue"),
        children:[
          {
            path: "list",
            name: "perfilesList",
            component: () =>
              import(/* webpackChunkName: "perfilesList" */ "../views/perfiles/perfilesList.vue"),
          },
          {
            path: "create",
            name: "perfilesCreate",
            component: () =>
              import(/* webpackChunkName: "perfilesCreate" */ "../views/perfiles/perfilesCreate.vue"),
          },
          {
            path: "edit/:id",
            name: "perfilesEdit",
            component: () =>
              import(/* webpackChunkName: "perfilesEdit" */ "../views/perfiles/perfilesEdit.vue"),
          },
        ]
      },
      {
        path:"usuarios",
        name:'usuarios',
        component: () =>
              import(/* webpackChunkName: "rolesList" */ "../views/usuarios/usuarios.vue"),
        children:[
          {
            path: "list",
            name: "usuariosList",
            component: () =>
              import(/* webpackChunkName: "usuariosList" */ "../views/usuarios/usuariosList.vue"),
          },
          {
            path: "create",
            name: "usuariosCreate",
            component: () =>
              import(/* webpackChunkName: "usuariosCreate" */ "../views/usuarios/usuariosCreate.vue"),
          },
          {
            path: "edit/:id",
            name: "usuariosEdit",
            component: () =>
              import(/* webpackChunkName: "usuariosEdit" */ "../views/usuarios/usuariosEdit.vue"),
          },
        ]
      },
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
    component: () => import(/* webpackChunkName: "recuperarPassword" */ "../views/recuperarPassword"),
  },
  {
    path: "/reset-password/:id",
    name: "reset-password",
    component: () => import(/* webpackChunkName: "resetPassword" */ "../views/resetPassword"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
