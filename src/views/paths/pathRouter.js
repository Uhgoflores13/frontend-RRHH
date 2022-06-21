export default [
    {
        path: "/paths",
        name: "paths",
        component: () => import(/* webpackChunkName: "rutasList" */ "./paths.vue" ),
    },
    {
        path: "/paths/create",
        name: "pathCreate",
        component: () => import(/* webpackChunkName: "formPath" */ "./pathForm.vue" ),
    },
    {
        path: "/paths/edit/:id",
        name: "pathEdit",
        component: () => import(/* webpackChunkName: "formPath" */ "./pathForm.vue" ),},
];
