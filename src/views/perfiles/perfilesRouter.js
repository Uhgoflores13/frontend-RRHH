export const perfilesRouter =
{
    path: "perfiles",
    name: "perfiles",
    component: () =>
        import(
        /* webpackChunkName: "rolesList" */ "./perfiles.vue"
        ),
    children: [
        {
            path: "list",
            name: "perfilesList",
            component: () =>
                import(
            /* webpackChunkName: "perfilesList" */ "./perfilesList.vue"
                ),
        },
        {
            path: "create",
            name: "perfilesCreate",
            component: () =>
                import(
            /* webpackChunkName: "perfilesCreate" */ "./perfilesCreate.vue"
                ),
        },
        {
            path: "edit/:id",
            name: "perfilesEdit",
            component: () =>
                import(
            /* webpackChunkName: "perfilesEdit" */ "./perfilesEdit.vue"
                ),
        },
    ],
}