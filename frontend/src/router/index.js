import { createRouter, createWebHistory } from 'vue-router'

// import regis from '../views/shelter_registration.vue'
import landingpage from '../layouts/index.vue'
import landingcontent from '../views/index.vue'

// layouts
import shelterDashboard from '../layouts/client/shelter/dashboard.vue'

// Shelter Views
import shelterdashboardContent from '../views/shelter/dashboard.vue'
import shelterprofile from "../views/shelter/myshelter.vue";
import shelteranimalprofile from "../views/shelter/animalprofile.vue"
import rescueoperation from "../views/shelter/rescueoperation.vue"

// my shelter feed, view post, edit profile
import shelterfeed from "../components/shelter_NewsfeedCard.vue"
import shelterviewpost from "../components/shelter_ViewPostCard.vue"
import editshelterprofile from "../views/shelter/myshelter_EditProfile.vue";

// animal profile
import createanimalprofile from "../views/shelter/animalprofile_CreateNewProfile.vue"
import viewanimalprofile from "../views/shelter/animalprofile_ViewProfile.vue"
import editanimalprofile from "../views/shelter/animalprofile_EditProfile.vue"

const routes = [
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
