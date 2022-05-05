export default [
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
]
