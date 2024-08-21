<template>
    <div class="border rounded-lg">
        <div>
            <img class="h-32 w-full object-cover lg:h-48 rounded-t-lg" :src="profile.backgroundImage" alt="" />
        </div>
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div class="flex">
                    <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" :src="profile.avatar" alt="" />
                </div>
                <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 md:pb-4 lg:pb-4">
                    <div class="mt-6 min-w-0 flex-1 sm:hidden md:block">
                        <h1 class="truncate text-2xl font-bold text-gray-900">{{ profile.name }}</h1>
                    </div>
                    <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <!-- <button type="button"
                          class="inline-flex justify-center rounded-md bgteal px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bgteal">
                          <span class="sm:text-[11.5px] md:text-[14px] md:px-[1rem]">Create New Post</span>
                        </button> -->
                        <router-link to="/editprofileform">
                            <button type="button"
                                class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <PencilIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span class="sm:text-[12.5px] md:text-[14px]">Edit Profile</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="mt-6 hidden min-w-0 flex-1 sm:block md:hidden mb-[1rem]">
                <h1 class="truncate text-2xl font-bold text-gray-900">{{ profile.name }}</h1>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { PencilIcon } from '@heroicons/vue/20/solid'

const profile = {
    name: 'FurrySafe Shelter',
    avatar: require('@/assets/images/rescue.png'),
    backgroundImage: require('@/assets/images/homepage.png'),
}
</script>