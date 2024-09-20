<script>
import MapWithPin from '@/components/showMap.vue';

export default {
    components: {
        MapWithPin,
    },
    data() {
        return {
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
                <MapWithPin/>
            </div>
        </div>
    </div>
</template>