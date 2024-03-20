import { createRouter, createWebHistory } from 'vue-router';
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

const Login = () =>
    import('./pages/Login.vue');
const Signup = () => import('./pages/Signup.vue');
const LandingPage = () => import('./pages/LandingPage.vue');
const AboutUs = () => import('./pages/AboutUs.vue');


const routes = [
    { path: '', component: Home },
    { path: '/login', component: Login, meta: { auth: false } },
    { path: '/signup', component: Signup, meta: { auth: false } },
    { path: '/landingpage', component: LandingPage, meta: { auth: true } },
    { path: '/about', component: AboutUs, meta: { auth: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login');
    } else if (
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/landingpage');
    } else {
        next();
    }
});

export default router;
