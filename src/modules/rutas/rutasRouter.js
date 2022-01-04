export const rutasRouter = {
    path: "rutas",
    name: "rutas",
    component: () =>
        import(
        /* webpackChunkName: "rutas" */ "./rutas.vue"
        ),
    children: [
        {
            path: "list",
            name: "rutasList",
            component: () =>
                import(
            /* webpackChunkName: "rutasList" */ "./rutasList.vue"
                ),
        },
        {
            path: "create",
            name: "rutasCreate",
            component: () =>
                import(
            /* webpackChunkName: "rutasCreate" */ "./rutasCreate.vue"
                ),
        },
        {
            path: "edit/:id",
            name: "rutasEdit",
            component: () =>
                import(
            /* webpackChunkName: "rutasEdit" */ "./rutasEdit.vue"
                ),
        },
    ],
}