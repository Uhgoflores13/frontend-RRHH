import Vue from "vue";
import VueRouter from "vue-router";
import {rolesRouter} from "../views/roles/rolesRouter";
import {perfilesRouter} from "../views/perfiles/perfilesRouter";
import {usuariosRouter} from "../views/usuarios/usuariosRouter";
import {rutasRouter} from "../views/rutas/rutasRouter";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "layout",
        component: () => import(/* webpackChunkName: "layout" */ "../views/layout"),
        children: [
            {
                path: "/",
                name: "dashboard",
                component: () =>
                    import(/* webpackChunkName: "perfiles" */ "../views/dashboard"),
            },
            {
                path: "perfil",
                name: "perfil",
                component: () =>
                    import(/* webpackChunkName: "perfiles" */ "../views/perfil"),
            },
            {
                path: "/seguridad",
                name: "seguridad",
                component: () =>
                    import(/* webpackChunkName: "seguridad" */ "../views/auth/seguridad.vue"),
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
        component: () => import(/* webpackChunkName: "login" */ "../views/auth/login"),
    },
    {
        path: "/recuperar-password",
        name: "recuperar-password",
        component: () =>
            import(
                /* webpackChunkName: "recuperarPassword" */ "../views/auth/recoverPassword"
                ),
    },
    {
        path: "/reset-password/:id",
        name: "reset-password",
        component: () =>
            import(/* webpackChunkName: "resetPassword" */ "../views/auth/resetPassword"),
    },
    {
        path: "/verify-mail/:token",
        name: "verifyMail",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/auth/verifyMail"),
    },
    {
        path: "/forbidden",
        name: "Forbidden",
        component: () =>
            import(/* webpackChunkName: "forbidden" */ "../views/forbidden"),
    },
    {
        path: "/autenticacionqr",
        name: "2fa",
        component: () => import(/* webpackChunkName: "qr" */ "../views/auth/2fa"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach(async (to, from, next) => {
    if (to.fullPath === "/") {
        const token = localStorage.getItem("token");
        if (!token) {
            next("/login");
            return;
        }
    }
    if (await Vue.prototype.canNext(to)) {
        next();
    } else {
        next("/forbidden");
    }
});

export default router;
