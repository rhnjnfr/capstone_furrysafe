<template>
    <div class="md:flex md:items-center md:justify-between md:space-x-5 border rounded-lg p-[2rem] lg:px-[5rem] shadow-md">
        <div class="flex items-center space-x-5 sm:justify-center">
            <div class="flex-shrink-0">
                <div class="relative">
                    <img class="h-32 w-32 rounded-full"
                        :src="profile.avatar"
                        alt="profile image" />
                    <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                </div>
            </div>
            <div class="pt-1.5 lg:pl-[10px]">
                <h1 class="text-2xl font-bold text-gray-900">{{ profile.name }}</h1>
                <span class="text-sm font-medium text-gray-500">{{ profile.email }}</span>
            </div>
        </div>
        <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <router-link to="/editprofileform">
                <button type="button"
                    class="inline-flex justify-center rounded-md bg-white sm:px-[3rem]  md:px-[2rem] lg:px-[13px]  py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <PencilIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span class="sm:text-[13.5px] md:text-[14px]">Edit Profile</span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/20/solid'

const profile = {
    name: 'FurrySafe Shelter',
    avatar: require('@/assets/images/rescue.png'),
    email: 'furrySafe2024@gmail.com'
}
</script>
  