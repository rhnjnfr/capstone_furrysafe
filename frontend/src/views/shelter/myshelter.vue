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
            //event
            events: [
                {
                    title: 'Example Title 1',
                    dateStarted: '2022-01-01',
                    dateEnded: '2022-01-31',
                    caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa dsadsguisad dgsuiadgsakdksua dugsaudgsaud gsuagdusg dusagduosagdus gduisgadiug duisaguidgs',
                    imageUrl: require('@/assets/images/eric.png'),
                },
                {
                    title: 'Example Title 2',
                    dateStarted: '2022-02-01',
                    dateEnded: '2022-02-28',
                    caption: 'Another event caption',
                    imageUrl: require('@/assets/images/bals.png'),
                },
                {
                    title: 'Example Title 1',
                    dateStarted: '2022-01-01',
                    dateEnded: '2022-01-31',
                    caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
                    imageUrl: require('@/assets/images/charles.png'),
                },
                {
                    title: 'Example Title 1',
                    dateStarted: '2022-01-01',
                    dateEnded: '2022-01-31',
                    caption: 'Upcomming event dbsjdlhskhdslk dhslakdhl sdasdsd sdasddas sdasdasdsa',
                    imageUrl: require('@/assets/images/homepage.png'),
                },
                // Add more events here
            ],
            // to show hidden events
            showEventInfo: false,

            // newsfeed
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
    },
    methods: {
        eventDisplay() {
            this.showEventInfo = !this.showEventInfo;
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
                <div id="leftside" class="lg:w-[25%]">
                    <detailCard class="border rounded-md" />
                </div>
                <div id="rightside" class="lg:w-[75%] h-fit">
                    <div class="mb-[1rem]">
                        <div
                            class="flex justify-between items-center bg-amber-50 rounded-lg py-2 sm:px-[2rem] lg:px-[3rem]">
                            <div><span class="sm:text-[14px]">Event Posts</span></div>
                            <div>
                                <button @click="eventDisplay">
                                    <img width="13" height="13"
                                        :src="showEventInfo ? 'https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/4D4D4D/external-Up-arrows-tanah-basah-glyph-tanah-basah-6.png' : 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/4D4D4D/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png'"
                                        alt="external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4" />
                                </button>
                            </div>
                        </div>
                        <div v-if="showEventInfo" class="mt-[1rem] py-2 w-full overflow-x-auto">
                            <div class="flex">
                                <div v-for="(event, index) in events" :key="index"
                                    class="border bg-white rounded-lg sm:w-[20rem] lg:w-[30rem] mx-2 flex-shrink-0">
                                    <div class="px-[1rem] py-2 border-b">
                                        <span class="font-semibold text-lg">{{ event.title }}</span>
                                    </div>
                                    <div class="flex flex-col px-[1rem] py-3 gap-1 sm:text-[11px] lg:text-[14px]">
                                        <span>Event Starts: <b class="font-medium sm:text-[11px] lg:text-[14px] pl-2">{{ event.dateStarted
                                                }}</b></span>
                                        <span>Event Ends: <b class="font-medium sm:text-[11px] lg:text-[14px] pl-2.5">{{ event.dateEnded
                                                }}</b></span>
                                        <p class="font-medium lg:text-[14px] mb-2">{{ event.caption }}</p>
                                        <div class="flex justify-center items-center border-t-2 mt-2">
                                            <img :src="event.imageUrl" alt="event image" id="imgsize" class="lg:w-[23rem] lg:h-[20rem] mt-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="pxlg"
                            class="flex justify-between border-b-2 border-t items-center p-[1rem] sm:px-[2rem] lg:px-[3rem] bg-white">
                            <span id="feed" class="sm:text-[14px]">Shelter's Feed</span>
                            <div id="sbuttons" class="flex gap-4">
                                <button type="button" @click="toggleModalEvent"
                                    class="flex justify-center rounded-md bgorange px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bgdarkorange group">
                                    <svg id="px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="size-5">
                                        <path fill-rule="evenodd"
                                            d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <span id="px" class="sm:text-[12.5px] md:text-[14px] sm:px-[2px] md:px-[7px]">
                                        Post an Event</span>
                                </button>
                                <button type="button" @click="toggleModalPost"
                                    class="flex justify-center rounded-md bgteal px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bgteal group">
                                    <svg id="px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        fill="currentColor" class="size-5">
                                        <path fill-rule="evenodd"
                                            d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                                            clip-rule="evenodd" />
                                        <path
                                            d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                                    </svg>
                                    <span id="px" class="sm:text-[12.5px] md:text-[14px] sm:px-[2px] md:px-[7px]">
                                        Create New Post</span>
                                </button>
                            </div>
                            <popupNewpost v-if="showModalCreatePost" @close="toggleModalPost" />
                            <popupNewEvent v-if="showModalNewEvent" @close="toggleModalEvent" />
                        </div>

                        <div class="my-[1rem]">
                            <div v-for="(post, index) in shelterpost" :key="index"
                                class="border rounded-lg bg-white w-full h-fit mb-4">
                                <div
                                    class="px-[2rem] py-[10px] border-b-2 grid grid-flow-col items-center justify-between">
                                    <span class="sr-only">header space</span>
                                </div>
                                <div class="w-full bg-slate-50">
                                    <img class="mx-auto flex-shrink-0 w-[50rem]" :src="post.imageUrl"
                                        alt="image post" />
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
        </div>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>