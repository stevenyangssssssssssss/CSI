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
      redirect: '/access',
    },
    {
      path: '/access/:id',
      component: './Home',
    },
    {
      name: 'Organization',
      path: '/access',
      component: './Access',
    },
  ],
  locale: {
    default: 'en-US',
  },
  npmClient: 'npm',
});
