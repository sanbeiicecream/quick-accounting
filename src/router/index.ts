import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import money from '@/views/Money.vue';
import label from '@/views/Label.vue';
import statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: money
  },
  {
    path: '/label',
    component: label
  },
  {
    path: '/statistics',
    component: statistics
  },
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
