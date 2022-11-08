import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import NewIndex from "./components/NewIndex.vue";
import NewDetails from "./components/NewDetails.vue";

const routes = [
    { path: "/", component: Home },

    { path: "/new", component: NewIndex },
    {
        path: "/new/show/:id",
        component: NewDetails,
        props: { show: true }
    },
    {
        path: "/new/edit/:id",
        component: NewDetails,
        props: { edit: true }
    },
    {
        path: "/new/create",
        component: NewDetails,
        props: { create: true }
    },
    {
        path: "/new/delete/:id",
        component: NewDetails,
        props: { delete: true }
    },
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;