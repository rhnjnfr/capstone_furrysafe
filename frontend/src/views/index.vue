<template>
    <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between">
                <div class="flex">
                    <div class="flex flex-shrink-0 items-center">
                        <img :src="logo" alt="Logout Icon" class="w-10" aria-hidden="true" />
                        <h1 id="logotext" class="pl-3 font-extrabold text-2xl text-gray-600 md:hidden lg:hidden">
                            FurrySafe</h1>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <RouterLink to="/"
                            class="inline-flex items-center border-b-2 border-teal-500 px-1 pt-1 text-sm font-bold text-gray-800 hover:text-lightorange">
                            FurrySafe</RouterLink>
                        <RouterLink to="shelterDashboard"
                            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-teal hover:text-lightorange">
                            Featured</RouterLink>
                        <RouterLink to=""
                            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-teal hover:text-lightorange">
                            Contact</RouterLink>
                        <RouterLink to=""
                            class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 hover:border-teal hover:text-lightorange">
                            About Us</RouterLink>
                    </div>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:items-center gap-4">
                    <RouterLink to="" class="hover:text-lightorange">
                        Login</RouterLink>
                    <RouterLink to="" class="bgteal text-white p-1.5 px-4 rounded-lg font-medium hover:bg-lightorange">
                        Sign-Up</RouterLink>
                </div>
                <div class="-mr-2 flex items-center sm:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="pb-3 pt-2">
                <DisclosureButton v-for="item in navigation" :key="item.name" @click="$router.push(item.to)"
                    :class="[item.current ? 'bgteal py-2 pl-3 pr-4 text-base font-medium text-white' : 'text-gray-500  hover:text-white', 'block border-transparent py-2 pl-3 pr-4 w-full text-base font-medium hover:bg-lightorange hover:text-white']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                </DisclosureButton>
            </div>
            <div class="border-t border-gray-200 pb-3 pt-4 space-y-2 text-white">
                <div class="mx-[1rem]">
                    <RouterLink to="" class="w-full bgteal rounded-lg py-2 flex justify-center hover:bg-bgteal">
                        Sign-Up</RouterLink>
                </div>
                <div class="mx-[1rem]">
                    <RouterLink to="" class="w-full bgorange rounded-lg py-2 flex justify-center hover:bg-lightorange">
                        Login</RouterLink>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import logo from '@/assets/images/frrysfLOGO.png' // FurrySafe Logo
const navigation = [
    { name: 'Home', to: { name: 'landingpage' }, current: true },
    { name: 'Featured', to: { name: 'shelterDashboard' }, current: false },
    { name: 'Contacts', to: { name: '' }, current: false },
    { name: 'About', to: { name: '' }, current: false },
    { name: 'FAQ', to: { name: '' }, current: false },
]
</script>