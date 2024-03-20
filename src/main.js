import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router'; // Assuming your router is exported from './router/index.js'
import { store } from './store/store'; // Assuming your store is exported from './store/store.js'

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
