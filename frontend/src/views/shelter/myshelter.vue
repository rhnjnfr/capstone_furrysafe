<script>
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/dateCard.vue'
import profileCard from '@/components/shelter_ProfileCard.vue'
import detailCard from '@/components/shelter_DetailsCard.vue'
import linkfooter from '@/components/footerLink.vue'

// pop-up modals
import popupNewpost from '@/components/shelter_NewPost.vue'
import popupNewEvent from '@/components/shelter_EventPost.vue'

export default {
    components: {
        textvalue, datetoday, profileCard, detailCard, linkfooter, popupNewpost, popupNewEvent
    },
    methods: {
        toggleModalPost() {
            this.showModalCreatePost = !this.showModalCreatePost
        },
        toggleModalEvent() {
            this.showModalNewEvent = !this.showModalNewEvent
        }
    },
    data() {
        return {
            // pop up new event
            showModalNewEvent: false,
            // pop up new post
            showModalCreatePost: false,
            isOpen: false,
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
        }
    }
};
</script>
<template>
    <div class="h-screen flex flex-col">
        <div class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="My Shelter" />
            </div>
            <div class="flex gap-5">
                <datetoday />
            </div>
        </div>
        <div>
            <div class="mt-[1rem]">
                <profileCard />
            </div>
            <div id="minscreen"
                class="mt-[1rem] flex sm:flex-col md:flex-row lg:flex-row md:justify-between sm:w-full sm:gap-y-[1rem] md:gap-x-[1rem]">
                <div>
                    <detailCard />
                </div>
                <div class="drop-shadow-md rounded-lg bg-white w-full h-fit">
                    <div id="pxlg"
                        class="flex justify-between border-b-2 items-center p-[1rem] sm:px-[2rem] lg:px-[3rem]">
                        <span id="feed" class="sm:text-[14px]">Shelter's Feed</span>
                        <div id="sbuttons" class="flex gap-4">
                            <button type="button" @click="toggleModalEvent"
                                class="flex justify-center rounded-md bgorange px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bgdarkorange group">
                                <svg id="px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-5">
                                    <path fill-rule="evenodd"
                                        d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span id="px" class="sm:text-[12.5px] md:text-[14px] sm:px-[2px] md:px-[7px]">Post an
                                    Event</span>
                            </button>
                            <button type="button" @click="toggleModalPost"
                                class="flex justify-center rounded-md bgteal px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bgteal group">
                                <svg id="px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-5">
                                    <path fill-rule="evenodd"
                                        d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                                        clip-rule="evenodd" />
                                    <path
                                        d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                                </svg>
                                <span id="px" class="sm:text-[12.5px] md:text-[14px] sm:px-[2px] md:px-[7px]">Create New
                                    Post</span>
                            </button>
                        </div>
                        <popupNewpost v-if="showModalCreatePost" @close="toggleModalPost" />
                        <popupNewEvent v-if="showModalNewEvent" @close="toggleModalEvent" />
                    </div>
                    <div class="mx-[2rem] my-[1.5rem]">
                        <div v-for="(post, index) in shelterpost" :key="index"
                            class="border rounded-lg bg-white w-full h-fit mb-4 shadow-md">
                            <div class="px-[2rem] py-[10px] border-b-2 grid grid-flow-col items-center justify-between">
                                <span class="sr-only">header space</span>
                            </div>
                            <div class="w-full bg-slate-50">
                                <img class="mx-auto flex-shrink-0 w-[50rem]" :src="post.imageUrl" alt="image post" />
                            </div>
                            <div class="px-[2rem] py-[2rem]">
                                <div class="grid grid-flow-col justify-between">
                                    <h1 class="flex items-center gap-4">
                                        <img width="25" height="25"
                                            src="https://img.icons8.com/color/48/dog-paw-print.png"
                                            alt="dog-paw-print" />
                                        {{ post.who }}
                                    </h1>
                                    <div class="relative">
                                        <button @click="post.dropdownOpen = !post.dropdownOpen"
                                            class="flex items-center">
                                            <img width="12" height="12"
                                                src="https://img.icons8.com/ios-filled/50/4D4D4D/menu-2.png"
                                                alt="menu-2" />
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
            </div>
        </div>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>