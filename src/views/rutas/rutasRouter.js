export default [
    {
        path: "/rutas/list",
        name: "rutasList",
        component: () => import(/* webpackChunkName: "rutasList" */ "./rutasList.vue" ),
    },
    {
        path: "/rutas/create",
        name: "rutasCreate",
        component: () => import(/* webpackChunkName: "formPath" */ "./formPath.vue" ),
    },
    {
        path: "/rutas/edit/:id",
        name: "rutasEdit",
        component: () => import(/* webpackChunkName: "formPath" */ "./formPath.vue" ),},
];
