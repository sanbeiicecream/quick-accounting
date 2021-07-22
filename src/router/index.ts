import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import money from '@/views/money.vue';
import label from '@/views/label.vue';
import statistics from '@/views/statistics.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/#money',
    component: money
  },
  {
    path: '/#label',
    component: label
  },
  {
    path: '/#statistics',
    component: statistics
  }
];

const router = new VueRouter({
  routes
});

export default router;
