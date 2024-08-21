import { createRouter, createWebHistory } from 'vue-router'

// layouts
import landingpage from '@/layouts/Admin/index.vue'
import adminDashboard from '../layouts/Admin/Dashboard.vue'
import shelterDashboard from '../layouts/Client/Shelter/Dashboard.vue'

// views
import homeContent from '../views/LandingPage/index.vue'
import registration from '../views/registration.vue'
import login from '../views/login.vue'

  //admin
import dashboardContent from '../views/Admin/dashboard.vue'
import managepetsContent from '../views/Admin/pets.vue'
import applicationContent from '../views/Admin/application.vue'
import userContent from '../views/Admin/user.vue'
import mapContent from '../views/Admin/map.vue'
import profileContent from '../views/Admin/userprofile.vue'

//shelter
import sdashboardContent from '../views/Shelter/dashboard.vue'
import myshelterContent from '../views/Shelter/myShelter.vue'
import animalprofileContent from '../views/Shelter/animalProfile.vue'
import rescueOperationContent from '../views/Shelter/rescueOperation.vue'
import editprofileContent from '../views/Shelter/editProfile.vue'

const routes = [
  { //index
    path: '/',
    name: 'landingpage',
    component: landingpage,
    redirect: '/FurrySafe',
    children: // landing page navigation path
      [
        { // dashboard
          path: '/FurrySafe',
          name: 'homeContent',
          component: homeContent
        },
      ]
  },
  { //login
    path: '/loginform',
    name: 'login',
    component: login
  },
  { //register
    path: '/registrationform',
    name: 'registration',
    component: registration
  },
  { // admin dashboard
    path: '/admin',
    name: 'adminDashboard',
    component: adminDashboard,
    redirect: '/dashboard',
    children: 
      [
        { // dashboard
          path: '/dashboard',
          name: 'dashboardContent',
          component: dashboardContent
        },
        { // manage pets
          path: '/managepets',
          name: 'managepetsContent',
          component: managepetsContent
        },
        { // manage application
          path: '/manageapplication',
          name: 'applicationContent',
          component: applicationContent
        },
        { // manage pets
          path: '/manageuser',
          name: 'userContent',
          component: userContent
        },
        { // manage pets
          path: '/managemap',
          name: 'mapContent',
          component: mapContent
        },
        { // Profile
          path: '/yourprofile',
          name: 'profileContent',
          component: profileContent
        },
      ]
  },
  { // shelter dashboard
    path: '/shelter',
    name: 'shelterDashboard',
    component: shelterDashboard,
    redirect: '/shelterdashboard',
    children: 
      [
        { // dashboard
          path: '/shelterdashboard',
          name: 'sdashboardContent',
          component: sdashboardContent
        },
        { // My shelter
          path: '/shelter',
          name: 'myshelterContent',
          component: myshelterContent
        },
        { // Animal Profile
          path: '/animalprofile',
          name: 'animalprofileContent',
          component: animalprofileContent
        },
        { // Rescue Operation
          path: '/rescueoperation',
          name: 'rescueOperationContent',
          component: rescueOperationContent
        },
        { // 
          path: '/editprofileform',
          name: 'editprofileContent',
          component: editprofileContent
        },
        { // Profile change this
          path: '/yourprofile',
          name: 'profileContent',
          component: profileContent
        },
      ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
