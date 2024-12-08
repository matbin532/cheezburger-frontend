import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRouter, createWebHistory } from 'vue-router';
import TopicList from './components/TopicList.vue';
import ThreadsList from './components/ThreadList.vue';


const routes = [
  { path: '/topics', component: TopicList },
  { path: '/topics/:topicId/threads', component: ThreadsList, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');