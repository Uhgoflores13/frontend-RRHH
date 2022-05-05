export default [
    {
        path: "usuarios/list",
        name: "usuariosList",
        component: () =>
            import(
                /* webpackChunkName: "usuariosList" */ "./usuariosList.vue"
                ),
    },
    {
        path: "usuarios/create",
        name: "usuariosCreate",
        component: () =>
            import(
                /* webpackChunkName: "usuariosCreate" */ "./usuariosCreate.vue"
                ),
    },
    {
        path: "usuarios/edit/:id",
        name: "usuariosEdit",
        component: () =>
            import(
                /* webpackChunkName: "usuariosEdit" */ "./usuariosEdit.vue"
                ),
    },
]