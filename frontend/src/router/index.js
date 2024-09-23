import { createRouter, createWebHistory } from 'vue-router'

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
import confirm_email from "../views/confirm_Email.vue"
//import forgot_password from "../views/forgotpassword.vue"

const routes = [
  //jene loginhelp huehfjkgjgsad
  {
    path:'/login',
    name: 'login',
    component:login
  },
  {
    path: '/buddy-registration',
    name: 'registration',
    component: registration
  },
  {
    path: '/shelter-registration',
    name: 'shelter_registration',
    component: shelter_registration
  },
  {
    path: '/confirming-email',
    name: 'confirm_Email',
    component: confirm_email
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
    meta: { requiresAuth: true, userType: 'shelter' }, //testing
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  const userType = localStorage.getItem('u_type');

  // Prevent navigating to login if the user is already authenticated
  if (isAuthenticated && to.path === '/login') { //
    if (userType === 'shelter') {
      return next('/shelterDashboard'); // Redirect shelter users to their dashboard
    } else if (userType === 'buddy') {
      return next('/buddydashboard'); // Redirect buddy users to their dashboard
    } else if (userType === 'admin') {
      return next('/admin'); // Redirect admin users to their dashboard
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next('/login'); // Redirect to login if not authenticated, and after registration
    } else if (to.meta.userType && to.meta.userType !== userType) {
      console.log(`Access denied for user type: ${userType}`);
      return next('/'); // Redirect to home if user type is not allowed
    }
  }

  next(); // Proceed if no guards block the navigation
});

export default router
