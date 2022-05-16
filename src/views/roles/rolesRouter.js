export default [
    {
        path: "/roles/list",
        name: "rolesList",
        component: () =>
            import(
                /* webpackChunkName: "rolesList" */ "./rolesList.vue"
                ),
    },
]
