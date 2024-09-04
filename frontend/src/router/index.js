import { createRouter, createWebHistory } from 'vue-router'

import landingpage from '../views/index.vue'
// Shelter Views
import shelterDashboard from '../layouts/client/shelter/dashboard.vue'
import shelterdashboardContent from '../views/shelter/dashboard.vue'
import shelterprofile from "../views/shelter/myshelter.vue";
import editshelterprofile from "../views/shelter/shelter_EditProfile.vue";
import shelteranimalprofile from "../views/shelter/animalprofile.vue"
import createanimalprofile from "../views/shelter/animalprofile_CreateNewProfile.vue"
import viewanimalprofile from "../views/shelter/animalprofile_ViewProfile.vue"
import editanimalprofile from "../views/shelter/animalprofile_EditProfile.vue"
// import rescueoperation from "../views/shelter/rescueoperation.vue"
import rescueoperation from "../views/shelter/try.vue"

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: landingpage,
  },
  {
    path: '/FurrySafe',
    name: 'shelterDashboard',
    component: shelterDashboard,
    redirect: '/shelterdashboard',
    children:
      [
        { // dashboard
          path: '/shelterdashboard',
          name: 'dashboardContent',
          component: shelterdashboardContent
        },
        { // my shelter
          path: '/myshelter',
          name: 'shelterprofile',
          component: shelterprofile
        },
        { // my shelter - Edit Profile
          path: '/edit_shelterprofile',
          name: 'editshelterprofile',
          component: editshelterprofile
        },
        { // animal profile
          path: '/animalprofile',
          name: 'animalprofile',
          component: shelteranimalprofile
        },
        { // create animal profile
          path: '/create_animalprofileform',
          name: 'createanimalprofile',
          component: createanimalprofile
        },
        { // view animal profile
          path: '/view_animalprofileform',
          name: 'viewanimalprofile',
          component: viewanimalprofile
        },
        { // edit animal profile
          path: '/edit_animalprofileform',
          name: 'editanimalprofile',
          component: editanimalprofile
        },
        { // rescue operation
          path: '/rescueoperation',
          name: 'rescueoperation',
          component: rescueoperation
        },
      ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
