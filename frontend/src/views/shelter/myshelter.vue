<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import textvalue from '@/components/textString.vue';
import datetoday from '@/components/dateCard.vue';
import profileCard from '@/components/shelter_ProfileCard.vue';
import detailCard from '@/components/shelter_DetailsCard.vue';
import linkfooter from '@/components/footerLink.vue';
import Toast from '@/components/toast.vue';  // Ensure correct case for the file name
import popupNewpost from '@/components/shelter_NewPostModal.vue';
import popupNewEvent from '@/components/shelter_EventPostModal.vue';
import eventsCard from '@/components/shelter_EventFeaturedCard.vue';

const route = useRoute();

// State variables
const showModalNewEvent = ref(false);
const showModalCreatePost = ref(false);
const isOpen = ref(false);
const showEventInfo = ref(false);
const toastRef = ref(null);  // Ref for the Toast component

// Methods
const toggleModalPost = () => {
  showModalCreatePost.value = !showModalCreatePost.value;
};

const toggleModalEvent = () => {
  showModalNewEvent.value = !showModalNewEvent.value;
};

onMounted(() => {
    if (route.query.showToast) {
        const message = route.query.message || 'Success!';
        if (toastRef.value) {
            toastRef.value.showToast(message);
        }
    }
});
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
                                <button @click="$nextTick(() => {
                                    this.showEventInfo = !this.showEventInfo;
                                    this.$refs.eventCard.toggleEventInfo()
                                })">
                                    <img width="13" height="13"
                                        :src="showEventInfo ? 'https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/4D4D4D/external-Up-arrows-tanah-basah-glyph-tanah-basah-6.png' : 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/4D4D4D/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png'"
                                        alt="external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <eventsCard ref="eventCard" />
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
                            <RouterView />
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
        <Toast ref="toastRef"  @closed="refreshRoute($router)" />
    </div>
</template>