import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'CSI',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Dashboard',
      path: '/home',
      component: './Home',
    },
  ],
  locale: {
    default: 'en-US',
  },
  npmClient: 'npm',
});
