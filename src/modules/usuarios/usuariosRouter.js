export const usuariosRouter =
{
    path: "usuarios",
    name: "usuarios",
    component: () =>
        import(
        /* webpackChunkName: "usuarios" */ "./usuarios.vue"
        ),
    children: [
        {
            path: "list",
            name: "usuariosList",
            component: () =>
                import(
            /* webpackChunkName: "usuariosList" */ "./usuariosList.vue"
                ),
        },
        {
            path: "create",
            name: "usuariosCreate",
            component: () =>
                import(
            /* webpackChunkName: "usuariosCreate" */ "./usuariosCreate.vue"
                ),
        },
        {
            path: "edit/:id",
            name: "usuariosEdit",
            component: () =>
                import(
            /* webpackChunkName: "usuariosEdit" */ "./usuariosEdit.vue"
                ),
        },
    ],
}