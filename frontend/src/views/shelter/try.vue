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
            reports: [
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/eric.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bals.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/charles.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bert.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/eric.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bals.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/charles.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bert.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/eric.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bals.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/charles.png'),
                    badge: 'rescuer',
                },
                {
                    type: 'Missing Dog',
                    caption: 'Found this dog at abandoned lot near STI College Davao',
                    location: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
                    animalstatus: 'Severe',
                    imageUrl: require('@/assets/images/bert.png'),
                    badge: 'rescuer',
                },
            ]
        }
    }
};
</script>
<template>
    <div class="h-screen flex flex-col">
        <header class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Rescue Operation" />
            </div>
            <div class="flex gap-5">
                <datetoday />
            </div>
        </header>
        <main class="mt-[1rem]">
            <div class="flex gap-6 h-full">
                <div class="border rounded-lg w-2/5 bg-slate-50">
                    <div class="flex items-center gap-3 px-[1.5rem] py-[1rem] bg-white border-b-2 rounded-t-lg">
                        <img width="35" height="35"
                            src="https://img.icons8.com/glyph-neue/64/4D4D4D/push-notifications.png"
                            alt="push-notifications" />
                        <span class="graycolor font-semibold">Reports Feed</span>
                    </div>
                    <div class="overflow-y-scroll h-[50rem] p-[1rem]">
                        <div v-for="(report, index) in reports" :key="index"
                            class="bg-white shadow-md rounded-lg mb-4">
                            <div class="h-[2rem] bg-white border-b-2 rounded-t-lg" />
                            <div class="w-full bg-gray-50 border-b-2">
                                <img class="mx-auto flex-shrink-0 w-[20rem]" :src="report.imageUrl" alt="image post" />
                            </div>
                            <div class="px-[2rem] py-3 text-gray-700 grid gap-y-1">
                                <p class=" border-b-2 py-4 font-semibold text-[15px]">{{ report.caption }}</p>
                                <div class="my-[1rem]">
                                    <span class="flex gap-5 text-[14px]">Report Type:
                                        <h1 class="font-bold text-[15px] flex gap-3">{{ report.type }}</h1>
                                    </span>
                                    <span class="flex text-[14px] gap-3">Animal Status:
                                        <span class="font-semibold text-[15px]">{{ report.animalstatus }}</span>
                                    </span>
                                    <span class="flex gap-10 text-[14px]">Location:
                                        <p class="font-semibold text-[15px]">{{ report.location }}</p>
                                    </span>
                                </div>
                            </div>
                            <div class="flex justify-center py-4 font-semibold text-red-600 bg-slate-50 hover:bg-red-500 hover:text-white rounded-b-lg">
                                <button type="button">
                                    Take Action
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="border rounded-lg w-3/5 h-full bg-teal-50">
                    chat
                </div>
            </div>
        </main>
        <footer class="mt-auto">
            <linkfooter />
        </footer>
    </div>
</template>