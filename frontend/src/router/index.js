import { createRouter, createWebHistory } from 'vue-router'

import landingpage from '../views/index.vue'
// Shelter Views
import shelterDashboard from '../layouts/Client/Shelter/dashboard.vue' 
import shelterdashboardContent from '../views/Shelter/dashboard.vue'
import shelterprofile from "../views/Shelter/myshelter.vue";
import editshelterprofile from "../views/Shelter/shelter_EditProfile.vue";
import shelteranimalprofile from "../views/Shelter/animalprofile.vue"
import createanimalprofile from "../views/Shelter/animalprofile_CreateNewProfile.vue"
import viewanimalprofile from "../views/Shelter/animalprofile_ViewProfile.vue"
import editanimalprofile from "../views/Shelter/animalprofile_EditProfile.vue"
import rescueoperation from "../views/Shelter/rescueoperation.vue"

//jene
import login from "../views/login.vue"
import registration from "../views/registration.vue"
import shelter_registration from '@/views/shelter_registration.vue';

const routes = [
  //jene loginhelp huehfjkgjgsad
  {
    path:'/login',
    name: 'login',
    component:login
  },
  {
    path: '/registration',
    name: 'registration',
    component: registration
  },
  {
    path: '/shelter_registration',
    name: 'shelter_registration',
    component: shelter_registration
  },
  {
    path: '/',
    name: 'landingpage',
    component: landingpage
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

