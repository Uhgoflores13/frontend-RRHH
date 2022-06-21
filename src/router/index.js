import Vue from "vue";
import VueRouter from "vue-router";
import rolesRouter from "../views/roles/rolesRouter";
import perfilesRouter from "../views/profiles/profilesRouter";
import usuariosRouter from "../views/users/userRouter";
import rutasRouter from "../views/paths/pathRouter";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import(/* webpackChunkName: "layout" */ "../views/layout"),
        children: [
            {
                path: "/",
                name: "dashboard",
                component: () =>
                    import(/* webpackChunkName: "profiles" */ "../views/dashboard"),
            },
            {
                path: "perfil",
                name: "perfil",
                component: () =>
                    import(/* webpackChunkName: "profiles" */ "../views/perfil"),
            },
            ...rolesRouter,
            ...perfilesRouter,
            ...usuariosRouter,
            ...rutasRouter,
            {
                path: "/security",
                name: "security",
                component: () => import(/* webpackChunkName: "qr" */ "../views/auth/security"),
            },
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
