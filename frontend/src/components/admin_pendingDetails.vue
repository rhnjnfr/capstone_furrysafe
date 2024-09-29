<script>
export default {
    data() {
        return {
            toApproved: [  ]
        }
    }
};
</script>
<template>
    <div v-for="(list, index) in toApproved" :key="index" class="bg-white shadow-md rounded-b-xl rounded-l-xl mb-4 hover:shadow-xl cursor-pointer">
        <div class="px-[2rem] py-3 text-gray-700 grid gap-y-1" @click="$emit('click', list.id)">
            <div class="my-[1rem]">
                <div class="mb-[1rem]">
                    <span class="flex gap-3 text-[14px]">Shelter's Name:
                        <h1 class="font-bold text-gray-600 text-[14px] flex gap-3">{{ list.name }}</h1>
                    </span>
                    <span class="flex gap-5 text-[14px]">Email Address:
                        <p class="font-semibold text-[13px]">{{ list.email }}</p>
                    </span>
                </div>
                <div class="flex justify-end border-t pt-[10px]">
                    <span class="font-semibold text-gray-500 text-[12px]">{{ list.createdAt }}</span>
                </div>
            </div>
        </div>
    </div>
</template>