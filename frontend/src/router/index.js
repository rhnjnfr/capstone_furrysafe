import { createRouter, createWebHistory } from 'vue-router'

// import regis from '../views/shelter_registration.vue'
import landingpage from '../layouts/index.vue'
import landingcontent from '../views/index.vue'

// layouts
import shelterDashboard from '../layouts/Client/Shelter/dashboard.vue'

// Shelter Views
import shelterdashboardContent from '../views/Shelter/dashboard.vue'
import shelterprofile from "../views/Shelter/myshelter.vue";
import shelteranimalprofile from "../views/Shelter/animalprofile.vue"
import rescueoperation from "../views/Shelter/rescueoperation.vue"

// my shelter feed, view post, edit profile
import shelterfeed from "../components/shelter_NewsfeedCard.vue"
import shelterviewpost from "../components/shelter_ViewPostCard.vue"
import editshelterprofile from "../views/Shelter/myshelter_EditProfile.vue";

// animal profile
import createanimalprofile from "../views/Shelter/animalprofile_CreateNewProfile.vue"
import viewanimalprofile from "../views/Shelter/animalprofile_ViewProfile.vue"
import editanimalprofile from "../views/Shelter/animalprofile_EditProfile.vue"

//jene 
import login from "../views/login.vue"
import registration from "../views/registration.vue"
import shelter_registration from '@/views/shelter_registration.vue';
import map from "../views/mapview.vue"

//import forgot_password from "../views/forgotpassword.vue"

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
    path: '/map',
    name: 'map',
    component: map
  },
  // {
  //   path: '/forgot-password',
  //   name: 'forgot_password',
  //   component: forgot_password
  // },
  //
  {
    path: '/',
    name: 'landingpage',
    component: landingpage,
    redirect: '/landingcontent',
    children:
      [
        { // dashboard
          path: '/landingcontent',
          name: 'landingcontent',
          component: landingcontent
        }
      ],
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
        { // my shelter view
          path: '/myshelter',
          name: 'shelterprofile',
          component: shelterprofile,
          redirect: '/myshelter_feed', // shelter_NewsfeedCard.vue
          children:
            [
              { // a component shelter_NewsfeedCard.vue
                path: '/myshelter_feed',
                name: 'shelterfeed',
                component: shelterfeed,
              },
              { // a component shelter_ViewPostCard.vue
                path: '/myshelter_viewpost',
                name: 'shelterviewpost',
                component: shelterviewpost,
              },
            ],
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
        { // animal profile - create animal profile
          path: '/create_animalprofileform',
          name: 'createanimalprofile',
          component: createanimalprofile
        },
        { // animal profile - view animal profile
          path: '/view_animalprofileform',
          name: 'viewanimalprofile',
          component: viewanimalprofile
        },
        { // animal profile - edit animal profile
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
