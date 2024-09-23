<script setup>
const stats = [
    { name: 'Profile Visits', stat: '00', icon: 'https://img.icons8.com/stickers/100/user-location.png' },
    { name: 'Pets Re-homed', stat: '00', icon: 'https://img.icons8.com/stickers/100/user-location.png' },
    { name: 'Total Rescued', stat: '00', icon: 'https://img.icons8.com/stickers/100/user-location.png' },
]

const updateActivity = [
    { label: 'Profile Visits', color: 'green', value: '00', icon: 'https://img.icons8.com/stickers/100/user-location.png' },
    { label: 'Number of Pets', color: 'amber', value: '00', icon: 'https://img.icons8.com/stickers/100/cat-footprint.png' },
    { label: 'Reviews', color: 'red', value: '00', icon: 'https://img.icons8.com/stickers/100/talk-female.png' },
]
</script>
<template>
    <div>
        <dl class="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div v-for="item in stats" :key="item.name"
                class="overflow-hidden border rounded-lg drop-shadow-md bg-white px-4 py-5 sm:p-6">
                <div class="grid lg:grid-flow-col sm:justify-items-center lg:justify-between items-center lg:px-[2rem]">
                    <div class="grid justify-items-center">
                        <dt class="truncate sm:text-[12px] lg:text-[15px] font-medium text-gray-500">{{ item.name }}</dt>
                        <dd class="mt-1 text-[35px] font-semibold tracking-tight text-gray-900">{{ item.stat }}</dd>
                    </div>
                    <div>
                        <img :src="item.icon" alt="animalshelterdog"
                            :class="`sm:w-[3.2rem] sm:h-[3rem] lg:w-[4.2rem] lg:h-[4rem]`" />
                    </div>
                </div>
            </div>
        </dl>
    </div>
</template>