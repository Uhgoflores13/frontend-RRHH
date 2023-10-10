export default [
    {
        path: "/libros",
        name: "libros",
        component: () => import(/* webpackChunkName: "librosList" */ "../libros.vue" ),
    },
];
