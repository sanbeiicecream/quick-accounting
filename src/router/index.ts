import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import NotFound from '@/views/NotFound.vue';
import Statistics from '@/views/Statistics.vue';
import Chart from '@/views/Chart.vue';
import Money from '@/views/Money.vue';
import UpdateStatistics from '@/components/Statistics/UpdateStatistics.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/statistics'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/chart',
    component: Chart
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/update',
    component: UpdateStatistics
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;