export const rolesRouter =
{
    path: "roles",
    name: "roles",
    component: () =>
        import(
            /* webpackChunkName: "roles" */ "./roles.vue"
        ),
    children: [
        {
            path: "list",
            name: "rolesList",
            component: () =>
                import(
                /* webpackChunkName: "rolesList" */ "./rolesList.vue"
                ),
        },
        {
            path: "create",
            name: "rolesCreate",
            component: () =>
                import(
                /* webpackChunkName: "rolesCreate" */ "./rolesCreate.vue"
                ),
        },
        {
            path: "edit/:id",
            name: "rolesEdit",
            component: () =>
                import(
                /* webpackChunkName: "rolesEdit" */ "./rolesEdit.vue"
                ),
        },
    ],
}
