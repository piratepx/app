import { createRouter, createWebHistory } from 'vue-router'

import ProjectDashboardView from '/@/views/project/ProjectDashboardView.vue'
import ProjectIndexView from '/@/views/project/ProjectIndexView.vue'
import ProjectSettingsView from '/@/views/project/ProjectSettingsView.vue'
import SignupIndexView from '/@/views/signup/SignupIndexView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/signup',
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupIndexView,
    },
    {
      path: '/shared/:secret',
      component: ProjectIndexView,
      props: (route) => ({
        isShared: true,
        secret: route.params.secret,
      }),
      children: [
        {
          path: 'dashboard',
          name: 'shared/dashboard',
          alias: '',
          component: ProjectDashboardView,
        },
      ],
    },
    {
      path: '/:secret',
      component: ProjectIndexView,
      props: (route) => ({
        isShared: false,
        secret: route.params.secret,
      }),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          alias: '',
          component: ProjectDashboardView,
        },
        {
          path: 'settings',
          name: 'settings',
          component: ProjectSettingsView,
        },
      ],
    },
  ],
})

export default router
