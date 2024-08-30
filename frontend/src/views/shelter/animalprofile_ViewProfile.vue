<template>
    <div>
        <div id="marginright" class="pb-[2rem] lg:mx-[3rem] flex justify-between items-center">
            <div>
                <RouterLink to="/animalprofile" class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span class="text-[14px] hover:font-medium">Back</span>
                </RouterLink>
            </div>
        </div>
        <div id="margin" class="sm:mx-[1rem] md:mx-[10rem]">
            <div class="">
                <div class=" flex justify-between px-4 sm:px-0">
                    <h3 class="text-base font-semibold leading-7 text-gray-900">Pet Information</h3>
                </div>
                <div>
                    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">This Information related to this Furry
                        Animal will be displayed publicly.</p>
                </div>
            </div>
            <div class="flex mt-[1rem] place-content-center space-x-10">
                <div class="w-[13rem] border rounded-lg p-[1rem]">
                    <img :src="petprofile.profile" alt="Pet Profile">
                </div>
                <div class="grid grid-flow-col items-center space-x-8">
                    <button id="switch1"
                        class="flex items-center gap-x-2 h-fit py-2 px-[2rem] sm:px-[1rem] rounded-md hover:bg-bgteal bgteal sm:text-[13.5px] md:text-[14px] text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                        </svg>
                        <span>Generate QR Code</span>
                    </button>
                    <RouterLink to="/edit_animalprofileform">
                        <button id="switch2" type="button"
                            class="inline-flex justify-center rounded-md bg-white sm:px-[2rem]  md:px-[2rem] lg:px-[2.5rem] py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <PencilIcon class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span class="sm:text-[13.5px] md:text-[14px]">Edit Profile</span>
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="mt-6">
                <dl class="grid grid-cols-1 sm:grid-cols-2">
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Given-Name</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ `${info.name} "${info.nickname}"` }}
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Age / Gender</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ `${info.age}, ${info.gender}` }}
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Breed / Mix</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ info.mixbreed }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Size</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ info.size }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0 mr-[2rem]">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Coat / Fur</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ info.fur }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Energy Level</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ info.EnergyLvl }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">About</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{{ info.about }}</dd>
                    </div>
                    <div class="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                        <span class="text-sm font-semibold leading-6 text-gray-900">Health and Medical</span>
                        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                            v-for="(item, index) in healthAndMedical" :key="index">
                            <dt class="text-sm font-normal  leading-6 text-gray-900 mr-[2rem]">{{ item.label }}</dt>
                            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ item.status }} {{
                                item.details ? `(${item.details})` : '' }}</dd>
                        </div>
                    </div>
                    <div class="border-t border-gray-100 px-4 pt-6 sm:col-span-2 sm:px-0">
                        <span class="text-sm font-medium leading-6 text-gray-900">Photos</span>
                    </div>
                    <div class="px-4 py-6 sm:col-span-2 sm:px-0">
                        <ul role="list"
                            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            <li v-for="image in photos" :key="image.source" class="relative">
                                <div
                                    class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                    <img :src="image.source" alt="" class="pointer-events-none object-cover" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </dl>
            </div>
        </div>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/20/solid'
import linkfooter from '@/components/footerLink.vue'

const petprofile = {
    profile: new URL('@/assets/images/animalshelterdog.png', import.meta.url).href
}

const info = {
    avatar: require('@/assets/images/animalshelterdog.png'),
    name: 'Jeneh',
    nickname: 'rhona',
    mixbreed: 'Labrador Retriever',
    age: '2 yrs old',
    gender: 'Female',
    size: '38 pounds, 59 inches tall',
    fur: 'Short, dark-brown coat with a slight wave',
    EnergyLvl: 'Medium-High',
    about: 'A Friendly, outgoing, and playful. an be prone to digging if bored, loves to chase squirrels. Good with people of all ages, gets along with other dogs, but can be shy around loud noises and knows "sit" and "stay"'
}

import { reactive } from 'vue'

const healthAndMedical = reactive([
    {
        label: 'Vaccinations Status',
        status: "Up-to-date",
        details: "including rabies and FVRCP"
    },
    {
        label: 'Spay / Neuter',
        status: "Spayed"
    },
    {
        label: 'Medical Conditions',
        status: "None known",
        details: "but has a slight dental issue that requires regular cleaning"
    },
    {
        label: 'Special Needs',
        status: "None"
    }
])

const photos = [
    {
        source: require('@/assets/images/animalshelterdog.png'),
    },
    // More files...
]

</script>