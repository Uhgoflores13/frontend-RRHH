export default [
    {
        path: "/libros",
        name: "libros",
        component: () => import(/* webpackChunkName: "librosList" */ "../libros.vue" ),
    },
    {
        path: "/nuevo-libro",
        name: "nuevo-libro",
        component: () => import(/* webpackChunkName: "nuevoLibro" */ "../nuevoLibro.vue" ),
    },
];
