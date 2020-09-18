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
      path: '/:secret',
      component: ProjectIndexView,
      props: true,
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

if (import.meta.env.MODE === 'production') {
  router.afterEach((to) => {
    const query = new URLSearchParams({
      p: '7aeb3ca2-ca76-49ec-ad27-24f0d380a545',
      i: to.name,
    })

    fetch(`https://app.piratepx.com/ship?${query.toString()}`)
  })
}

export default router
