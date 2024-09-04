<script>
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/dateCard.vue'
import linkfooter from '@/components/footerLink.vue'
import { RouterLink } from 'vue-router';

export default {
    components: {
        textvalue, datetoday, linkfooter
    },
    data() {
        return {
            isOpen: false, // dropdown
            shelterpost: [
                {
                    caption: 'You can’t buy love, but you can rescue it.',
                    who: 'Eric',
                    imageUrl: require('@/assets/images/rescue.png'),
                    dropdownOpen: false
                },
                // more post details
                {
                    caption: 'Saving on dog will not change the world, but surely for that one dog, the world will change forever.” - Karen Davison',
                    who: 'Jeneh',
                    imageUrl: require('@/assets/images/animalshelterdog.png'),
                    dropdownOpen: false
                },
                {
                    caption: 'Do you believe in love at first sight, or should I wag my tail again?',
                    who: 'Cyril',
                    imageUrl: require('@/assets/images/homepage.png'),
                    dropdownOpen: false
                },
            ],
            reports: [
                {
                    caption: '',
                    location: '',
                    animalstatus: '',
                    imagesUrl: '',
                }
            ]
        }
    }
};
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Rescue Operation" />
            </div>
            <div class="flex gap-5">
                <datetoday />
            </div>
        </div>
        <!-- <div id="rescue" class="my-[1rem] lg:flex lg:gap-7">
            <div id="notif" class=" md:w-full lg:w-1/2 h-screen border rounded-lg overflow-hidden">
                <div class="bg-white p-[1rem] border-b-2 rounded-t-lg">
                    post
                </div>
                <div class="py-[1.5rem] px-[1.5rem] max-h-full overflow-y-auto">
                    <div v-for="(post, index) in shelterpost" :key="index"
                        class="border rounded-lg bg-white w-full  mb-4 shadow-md">
                        <div class="px-[2rem] py-[10px] border-b-2 grid grid-flow-col items-center justify-between">
                            <span class="sr-only">header space</span>
                        </div>
                        <div class="w-full bg-slate-50">
                            <img class="mx-auto flex-shrink-0" :src="post.imageUrl" alt="image post" />
                        </div>
                        <div class="px-[2rem] py-[2rem]">
                            <div class="grid grid-flow-col justify-between">
                                <h1 class="flex items-center gap-4">
                                    <img width="25" height="25" src="https://img.icons8.com/color/48/dog-paw-print.png"
                                        alt="dog-paw-print" />
                                    {{ post.who }}
                                </h1>
                                <div class="relative">
                                    <button @click="post.dropdownOpen = !post.dropdownOpen" class="flex items-center">
                                        <img width="12" height="12"
                                            src="https://img.icons8.com/ios-filled/50/4D4D4D/menu-2.png" alt="menu-2" />
                                    </button>
                                    <div v-if="post.dropdownOpen"
                                        class="absolute right-0 mt-2 w-[8rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div class="py-1" role="menu" aria-orientation="vertical"
                                            aria-labelledby="options-menu">
                                            <RouterLink to=""
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem">View post</RouterLink>
                                            <RouterLink to=""
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem">Edit post</RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm font-medium text-gray-900 pt-[1rem]">{{ post.caption }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="chat"
                class="bg-teal-100 md:w-full lg:w-1/2 h-screen border rounded-lg p-[2rem] sm:mt-[2rem] lg:mt-0">
                chat system
            </div>
        </div> -->
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>