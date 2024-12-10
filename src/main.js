import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import TopicList from './components/TopicList.vue';
import ThreadsList from './components/ThreadList.vue';
import TopicForm from './components/TopicForm.vue';
import LoginPage from './components/LoginPage.vue';


const routes = [
  { path: '/login', component: LoginPage },
  { path: '/topics', component: TopicList },
  { path: '/topics/new', component: TopicForm },
  { path: '/topics/:topicId/threads', component: ThreadsList, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');