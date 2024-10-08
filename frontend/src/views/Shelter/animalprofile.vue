<template>
    <div class="h-screen flex flex-col">
      <header class="flex justify-between items-center">
        <div class="graycolor">
          <textvalue msg="Animal Profile" />
        </div>
        <div class="flex gap-x-3 sm:gap-1 items-center">
          <div class="bgorange py-[.40rem] px-[2rem] sm:px-[12px] rounded-md hover:bg-bgdarkorange">
            <RouterLink to="/create_animalprofileform" class="flex gap-x-1 items-center">
              <FolderPlusIcon class="-ml-0.5 mr-1.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white"
                aria-hidden="true" />
              <span class="text-white font-medium text-[13.5px] sm:text-[11.6px]">Create New Profile</span>
            </RouterLink>
          </div>
          <div class="flex gap-5">
            <datetoday />
          </div>
        </div>
      </header>
      <main class="mt-[1rem]">
        <ul id="profile-columns" role="list"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li v-for="pets in profiles" :key="pets.name"
            class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center border drop-shadow-md">
            <div class="flex flex-1 flex-col p-7">
              <!-- Image with fallback and error handling -->
              <img class="mx-auto w-52 h-52 flex-shrink-0 object-cover" 
                   :src="pets.imageUrl || default_profile" 
                   @error="onImageError($event)" 
                   alt="Pet profile picture" />
              <h3 class="mt-6 text-sm font-medium text-gray-900">{{ pets.name }} </h3>
              <dl class="mt-1 flex flex-grow flex-col justify-between">
                <dt class="sr-only">Animal Type</dt>
                <dd class="text-sm text-gray-500">{{ pets.petType }}</dd>
              </dl>
            </div>
            <div>
              <div class="text-[14px] bg-slate-50 p-[1rem] hover:bg-bgteal hover:text-white rounded-b-lg">
                <RouterLink :to="{ name: 'viewanimalprofile', params: { petid: pets.petid }}">
                  <span class="px-[5rem] py-[1rem]">View Profile</span>
                </RouterLink>
              </div>
            </div>
          </li>
        </ul>
      </main>
      <footer class="mt-auto">
        <linkfooter />
      </footer>
    </div>
  </template>
  
  <script setup>
  import axios from "axios"; 
  import { ref, onMounted } from 'vue';
  import { FolderPlusIcon } from '@heroicons/vue/20/solid';
  import textvalue from '@/components/textString.vue';
  import datetoday from '@/components/dateCard.vue';
  import linkfooter from '@/components/footerLink.vue';
  
  import default_profile from '@/assets/images/default_profile_photo.png';
  
  const profiles = ref([]);
  
  const id = localStorage.getItem('u_id');
  const petid = null;
  
  // Function to load pet profiles
  async function loadPetProfiles(){
      try {
          const response = await axios.post("http://localhost:5000/profile", {
              _userid: id,
              _petid: petid
          });
          
          if (response.data && response.data.length > 0) {
              response.data.forEach(profile => {
                  const _name_nickname = profile.name_nickname;
                  const [name] = _name_nickname.split('/');
                  profiles.value.push({
                      petid: profile.id,
                      name: name,
                      petType: profile.breed,
                      imageUrl: profile.profileurl || ''  // Ensure this is an empty string if no URL
                  });
              });
          }
      }
      catch(err) {
          console.log("Error loading profiles: ", err);
      }
  }
  
  // Function to handle image load errors (sets to default profile)
  function onImageError(event) {
      event.target.src = default_profile;
  }
  
  // Load profiles on component mount
  onMounted(() => {
      loadPetProfiles();
  });
  </script>
  

<!-- <script setup>
import axios from "axios"; 
import { ref, onMounted } from 'vue';

import { FolderPlusIcon } from '@heroicons/vue/20/solid';
import textvalue from '@/components/textString.vue';
import datetoday from '@/components/dateCard.vue';
import linkfooter from '@/components/footerLink.vue';

import default_profile from '@/assets/images/default_profile_photo.png'

// Register components (no need for export default)
const profiles = ref([ ]);

const id = localStorage.getItem('u_id');
const petid = null

async function loadPetProfiles(){
    try{
        const response = await axios.post("http://localhost:5000/profile", {
            _userid: id,
            _petid: petid
        });
        
        console.log("response pet profile", response.data)
        if (response.data && response.data.length > 0) {
            response.data.forEach(profile => {
                const _name_nickname = profile.name_nickname
                const [name, nickname] = _name_nickname.split('/')
                profiles.value.push({
                    petid: profile.id, 
                    name: name, 
                    petType: profile.breed,
                    imageUrl: profile.profileurl
                })
            });
        }
    }
    catch(err){
        console.log("error: ", err)
    }
}

onMounted(() => {
    loadPetProfiles();
});

</script>
<template>
    <div class="h-screen flex flex-col">
        <header class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Animal Profile" />
            </div>
            <div class="flex gap-x-3 sm:gap-1 items-center">
                <div class="bgorange py-[.40rem] px-[2rem] sm:px-[12px] rounded-md hover:bg-bgdarkorange">
                    <RouterLink to="/create_animalprofileform" class="flex gap-x-1 items-center">
                        <FolderPlusIcon class="-ml-0.5 mr-1.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white"
                            aria-hidden="true" />
                        <span class="text-white font-medium text-[13.5px] sm:text-[11.6px]">Create New Profile</span>
                    </RouterLink>
                </div>
                <div class="flex gap-5">
                    <datetoday />
                </div>
            </div>
        </header>
        <main class="mt-[1rem]">
            <ul id="profile-columns" role="list"
                class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <li v-for="pets in profiles" :key="pets.name"
                    class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center border drop-shadow-md">
                    <div class="flex flex-1 flex-col p-7">
                        <img class="mx-auto w-52 h-52 flex-shrink-0 object-cover" :src="pets.imageUrl || default_profile " alt="" />
                        <h3 class="mt-6 text-sm font-medium text-gray-900">{{ pets.name }} </h3>
                        <dl class="mt-1 flex flex-grow flex-col justify-between">
                            <dt class="sr-only">Animal Type</dt>
                            <dd class="text-sm text-gray-500">{{ pets.petType }}</dd>
                        </dl>
                    </div>
                    <div>
                        <div class="text-[14px] bg-slate-50 p-[1rem] hover:bg-bgteal hover:text-white rounded-b-lg">
                            to="/view_animalprofileform" 
                            <RouterLink :to="{ name: 'viewanimalprofile', params: { petid: pets.petid }}" >
                                <span class="px-[5rem] py-[1rem]">View Profile</span>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
        </main>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template> -->