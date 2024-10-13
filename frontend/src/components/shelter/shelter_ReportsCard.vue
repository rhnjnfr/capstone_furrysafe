<script>
import statusbuttons from '@/components/shelter/shelter_ReportStatusButtons.vue'

export default {
    components: {
        statusbuttons
    },
    data() {
        return {
            showRescueCancelButtons: false,
            showSuccessMessage: false,
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
    <div>
        <div v-for="(report, index) in reports" :key="index" class="bg-white shadow-md rounded-lg mb-4">
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
            <div>
                <statusbuttons />
            </div>
        </div>
    </div>
</template>