export default [
    {
        path: "perfiles/list",
        name: "perfilesList",
        component: () =>
            import(
                /* webpackChunkName: "perfilesList" */ "./perfilesList.vue"
                ),
    },
    {
        path: "perfiles/create",
        name: "perfilesCreate",
        component: () =>
            import(
                /* webpackChunkName: "perfilesCreate" */ "./perfilesCreate.vue"
                ),
    },
    {
        path: "perfiles/edit/:id",
        name: "perfilesEdit",
        component: () =>
            import(
                /* webpackChunkName: "perfilesEdit" */ "./perfilesEdit.vue"
                ),
    },
]