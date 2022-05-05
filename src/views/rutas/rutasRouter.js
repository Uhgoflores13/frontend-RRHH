export default [
    {
        path: "/rutas/list",
        name: "rutasList",
        component: () => import(/* webpackChunkName: "rutasList" */ "./rutasList.vue" ),
    },
    {
        path: "/rutas/create",
        name: "rutasCreate",
        component: () => import(/* webpackChunkName: "rutasCreate" */ "./rutasCreate.vue" ),
    },
    {
        path: "/rutas/edit/:id",
        name: "rutasEdit",
        component: () => import(/* webpackChunkName: "rutasEdit" */ "./rutasEdit.vue" ),},
];
