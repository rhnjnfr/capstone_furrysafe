<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-teal-200/50" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bgorange pb-2 ring-1 ring-white/10">
                                <div class="flex h-[3.97rem] shrink-0 items-center bg-white pl-[3rem]">
                                    <img :src="logo" alt="Logout Icon" class="w-10" aria-hidden="true" />
                                    <h1 class="pl-3 font-extrabold text-2xl text-gray-600">FurrySafe</h1>
                                </div>
                                <nav class="flex flex-1 flex-col px-6">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <RouterLink v-if="!item.children" :to="item.to"
                                                        :class="[item.current ? 'bgteal text-white text-[15px]' : 'text-white hover:text-white hover:bg-bgdarkorange pl-[1.5rem]', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <img v-if="typeof item.icon === 'string'" :src="item.icon"
                                                            class="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                                                        <component v-else :is="item.icon"
                                                            class="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                                                        {{ item.name }}
                                                    </RouterLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <div class="font-semibold leading-6 text-white flex gap-2">
                                                <PuzzlePieceIcon class="h-5 w-5 shrink-0 text-white"
                                                    aria-hidden="true" />
                                                Activity
                                            </div>
                                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                                <li v-for="modal in shorcutpopups" :key="modal.name">
                                                    <button v-if="!modal.children" @click="toggleModal(modal)"
                                                        :class="[modal.current ? 'bgteal text-white' : 'items-center text-white hover:text-white hover:bg-bgdarkorange pl-[1.5rem] w-full', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <component :is="modal.icon" class="h-5 w-5 shrink-0 text-white"
                                                            aria-hidden="true" />
                                                        {{ modal.name }}
                                                    </button>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mt-auto">
                                            <router-link :to="{ name: '' }"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-bgdarkorange hover:text-white">
                                                <ArrowRightStartOnRectangleIcon class="h-5 w-5 shrink-0 text-white"
                                                    aria-hidden="true" />
                                                Logout
                                            </router-link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bgorange border-r">
                <div class="flex h-[3.97rem] shrink-0 items-center bg-white pl-[3rem]">
                    <img :src="logo" alt="Logout Icon" class="w-10" aria-hidden="true" />
                    <h1 class="pl-3 font-extrabold text-2xl text-gray-600">FurrySafe</h1>
                </div>
                <nav class="flex flex-1 flex-col pt-10 text-white font-medium">
                    <div class="flex gap-2 mx-6 py-3">
                        <img :src="shelterICON" alt="" class="w-5 h-5" />
                        <span>Shelter</span>
                    </div>
                    <ul role="list" class="flex flex-1 flex-col gap-y-7 px-6">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <RouterLink v-if="!item.children" :to="item.to"
                                        :class="[item === currentNavigationItem ? 'bgteal text-white text-[15px] items-center pl-[1.5rem]' : 'items-center text-white hover:text-white hover:bg-bgdarkorange pl-[1.5rem]', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                        <img v-if="typeof item.icon === 'string'" :src="item.icon"
                                            class="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                                        <component v-else :is="item.icon" class="h-5 w-5 shrink-0 text-white"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div class="font-semibold leading-6 text-white flex gap-2">
                                <PuzzlePieceIcon class="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                                Activity
                            </div>
                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                <li v-for="modal in shorcutpopups" :key="modal.name">
                                    <button v-if="!modal.children" @click="toggleModal(modal)"
                                        :class="[modal.current ? 'bgteal text-white' : 'items-center text-white hover:text-white hover:bg-bgdarkorange pl-[1.5rem] w-full', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                        <component :is="modal.icon" class="h-5 w-5 shrink-0 text-white"
                                            aria-hidden="true" />
                                        {{ modal.name }}
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li class="mt-auto">
                            <router-link :to="{ name: 'landingpage' }"
                                class="group items-center flex gap-x-3 rounded-md py-2 px-6 text-sm font-semibold leading-6 text-white hover:bg-bgdarkorange hover:text-white">
                                <ArrowRightStartOnRectangleIcon class="h-5 w-5 shrink-0 text-white"
                                    aria-hidden="true" />
                                Logout
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="sticky top-0 z-40 flex items-center gap-x-6 bgorange px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" class="-m-2.5 p-2.5 text-white lg:hidden" @click="sidebarOpen = true">
                <span class="sr-only">Open sidebar</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>
            <div class="flex text-sm font-semibold leading-6 text-white">
                <img :src="logo" alt="Logout Icon" class="w-10" aria-hidden="true" />
                <h1 class="pl-3 font-extrabold text-2xl text-white">FurrySafe</h1>
            </div>
        </div>
        <main class="py-10 lg:pl-72">
            <div class="px-4 sm:px-6 lg:px-8">
                <RouterView /> <!-- main content page -->
                <popupNewpost v-if="showModalCreatePost" @close="toggleModal({ name: 'New Post' })" />
                <popupNewEvent v-if="showModalCreateEvent" @close="toggleModal({ name: 'New Event' })" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
// components open source
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
// icons open source
import { Bars3Icon, XMarkIcon, IdentificationIcon, HomeModernIcon, ChatBubbleLeftRightIcon, RectangleGroupIcon, DocumentPlusIcon, SparklesIcon } from '@heroicons/vue/24/outline'
import { PuzzlePieceIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/20/solid'

//my components for popup modals
import popupNewpost from '@/components/shelter_NewPost.vue'
import popupNewEvent from '@/components/shelter_EventPost.vue'

import logo from '@/assets/images/frrysfLOGO.png' // FurrySafe Logo
import shelterICON from '@/assets/images/Footprint.png' // icon

const route = useRoute()

const navigation = [
    { name: 'Dashboard', to: { name: 'dashboardContent' }, icon: RectangleGroupIcon, current: false },
    { name: 'My Shelter', to: { name: 'shelterprofile' }, icon: HomeModernIcon, current: false },
    { name: 'Animal Profile', to: { name: 'animalprofile' }, icon: IdentificationIcon, current: false },
    { name: 'Rescue Operation', to: { name: 'rescueoperation' }, icon: ChatBubbleLeftRightIcon, current: false },
]
const currentNavigationItem = computed(() => { // to style the currently selected
    return navigation.find((item) => item.to.name === route.name)
})

const shorcutpopups = [
    { name: 'New Post', icon: DocumentPlusIcon, current: false },
    { name: 'New Event', icon: SparklesIcon, current: false },
]

// popup function
const showModalCreatePost = ref(false)
const showModalCreateEvent = ref(false)

function toggleModal(activity) {
    if (activity.name === 'New Post') {
        showModalCreatePost.value = !showModalCreatePost.value
    } else if (activity.name === 'New Event') {
        showModalCreateEvent.value = !showModalCreateEvent.value
    }
}

const sidebarOpen = ref(false)
</script>