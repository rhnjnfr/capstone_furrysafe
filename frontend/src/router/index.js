import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue';

// import regis from '../views/shelter_registration.vue'
import landingpage from '../layouts/index.vue'
import landingcontent from '../views/index.vue'

// layouts
import adminDashboard from '../layouts/admin/dashboard.vue'
import shelterDashboard from '../layouts/client/shelter/dashboard.vue'

// Admin Views
import dashboard from '../views/admin/dashboard.vue'
import request_preview from '@/views/admin/registration_requestpreview.vue'
import registration from '../views/admin/manage_registration.vue'
import details from '../views/admin/manage_animaldetails.vue'
import mockup from '../views/mockup.vue'

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

import map from "../views/shelter/pin_Location.vue"
import test from '@/components/pin_MapModal.vue'

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
        },
      ],
  },
  {
    path: '/mockup',
    name: 'mockup',
    component: mockup,
  },
  {
    path: '/Furrysafe_admin',
    name: 'adminDashboard',
    component: adminDashboard,
    redirect: '/dashboard',
    children:
      [
        { // dashboard
          path: '/dashboard',
          name: 'dashboard',
          component: dashboard
        },
        { // registration
          path: '/registration',
          name: 'registration',
          component: registration
        },
        { // registration
          path: '/request_preview',
          name: 'request_preview',
          component: request_preview
        },
        { // details
          path: '/details',
          name: 'details',
          component: details
        },
      ],
  },
  { // modal
    path: '/modal',
    name: 'modal',
    component: test, // import test from '@/components/pin_MapModal.vue'
    props: (route) => ({ open: route.query.open }),
    beforeRouteLeave(to, from, next) {
      console.log('beforeRouteLeave called');
      console.log('from.query.open:', from.query.open);
      if (!from.query.open) {
        console.log('Navigating to shelterDashboard');
        next({ name: 'shelterDashboard' });
      } else {
        console.log('Not navigating');
        next();
      }
    }
  },
  {
    path: '/FurrySafe',
    name: 'shelterDashboard',
    component: shelterDashboard,
    redirect: '/shelterdashboard', // Redirect to the modal route by default
    children: [
      { // dashboard
        path: '/shelterdashboard',
        name: 'dashboardContent',
        component: shelterdashboardContent,
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
  // console.log('shelterDashboard component:', shelterDashboard),
  // console.log('shelterdashboardContent component:', shelterdashboardContent),


]
routes.forEach((route, index) => {
  console.log(`Route ${index}:`, route);
  if (!route.path) {
    console.error(`Route ${index} has no path!`);
  }
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
