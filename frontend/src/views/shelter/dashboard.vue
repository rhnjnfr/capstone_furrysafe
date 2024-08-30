<script>
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/dateCard.vue'
import linkfooter from '@/components/footerLink.vue'

export default {
    components: {
        textvalue, datetoday, linkfooter,
    },
    data() {
        return {
            pet: require('@/assets/images/rescue.png'),
            map: require('@/assets/images/mapExample.png'),
            // loop squares
            updateActivity: [
                { label: 'Profile Visits', color: 'green', value: '00', icon: 'https://img.icons8.com/stickers/100/user-location.png' },
                { label: 'Number of Pets', color: 'amber', value: '00', icon: 'https://img.icons8.com/stickers/100/cat-footprint.png' },
                { label: 'Reviews', color: 'red', value: '00', icon: 'https://img.icons8.com/stickers/100/talk-female.png' },
            ],
            // loop details of recent activitty
            recentActivities: [
                {
                    datetime: "2023-03-01 14:30:00",
                    location: "Acacia",
                    status: "Successful Dog Rescue"
                },
                {
                    datetime: "2023-03-01 13:15:00",
                    location: "Panacan",
                    status: "Rescued Abandon Cat"
                },
                {
                    datetime: "2023-02-28 10:00:00",
                    location: "New Ecoland",
                    status: "Reported"
                },
                {
                    datetime: "2023-02-27 16:45:00",
                    location: "Mintal",
                    status: "Unknown Report"
                },
                {
                    datetime: "2023-02-26 12:30:00",
                    location: "Toril",
                    status: "Report Responded"
                },
                {
                    datetime: "2023-02-25 09:15:00",
                    location: "Talomo",
                    status: "Reported"
                }
            ],
        }
    }
};
</script>
<template>
    <div class="h-screen flex flex-col">
        <header class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Dashboard" />
            </div>
            <div class="flex gap-5">
                <datetoday />
            </div>
        </header>
        <main id="to-row" class="mt-[2.5rem] lg:flex lg:gap-7">
            <div id="updates">
                <div>
                    <img id="dogIMG" :src="pet" alt="animalshelterdog" class="w-screen" />
                </div>
                <div
                    class="grid fl grid-flow-col sm:space-x-4 md:space-x-6 place-content-center justify-items-center sm:mt-[2rem]">
                    <div id="w-squares" v-for="(item, index) in updateActivity" :key="index"
                        class="border rounded-lg bg-white drop-shadow-md p-[1rem] sm:w-[9rem] md:w-[13rem] grid place-content-center justify-items-center">
                        <span class="font-semibold sm:text-[14px] lg:text-[17px]">{{ item.label }}</span>
                        <span :class="`text-${item.color}-500 font-bold lg:text-[30px]`">{{ item.value }}</span>
                        <img :src="item.icon" alt="animalshelterdog"
                            :class="`sm:w-[3.2rem] sm:h-[3rem] lg:w-[4.2rem] lg:h-[4rem]`" />
                    </div>
                </div>
            </div>
            <div id="history"
                class="border rounded-lg bg-white drop-shadow-md h-[38rem] sm:mt-[1rem] lg:mt-0 lg:w-[66rem] mx-auto">
                <div class="border rounded-t-md bg-white h-[4rem] flex items-center px-7 gap-x-2">
                    <img :src="heartPaw" alt="" class="sm:h-[1.5rem] lg:h-[2rem]" />
                    <span class="graycolor font-medium sm:text-[13px] lg:text-[1rem]">Recent Activity</span>
                </div>
                <div class="grid grid-flow-col justify-between h-[31rem] items-center">
                    <div class="px-14 py-4 space-y-4 text-[13.5px] overflow-y-auto">
                        <div v-for="(item, index) in recentActivities" :key="index" class="grid grid-flow-row">
                            <span>{{ item.datetime }}</span>
                            <span>{{ item.location }}</span>
                            <span>{{ item.status }}</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <img id="mapIMG" :src="map" alt="" class="h-[33.9rem] md:w-[20rem] object-cover" />
                    </div>
                </div>
            </div>
        </main>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>