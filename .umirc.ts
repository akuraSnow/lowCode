import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/data', component: '@/pages/data' },
        { path: '/actionData', component: '@/pages/visibilityData' },
        { path: '/staticData', component: '@/pages/staticData' },
        { path: '/calculatorData', component: '@/pages/calculatorData' },
        { path: '/interfaceData', component: '@/pages/interfaceData' },
      ],
    },
  ],
  fastRefresh: {},
});
