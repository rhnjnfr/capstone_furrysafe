<script>
import requestdocu from '@/components/admin_requestDocuments.vue'

export default {
    components: {
        requestdocu
    },
    data() {
        return {
            showDetails: false
        }
    },
};
</script>
<template>
    <div id="marginright" class="lg:mx-[5rem] sm:mx-[1rem]">
        <div>
            <RouterLink to="/registration" class="flex items-center w-fit">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="text-[14px] hover:font-medium text-gray-800">Back</span>
            </RouterLink>
        </div>
        <div class="mt-[2rem]">
            <requestdocu />
        </div>
        <div class="mt-[1rem] border-t py-[2rem] flex justify-end gap-5 text-sm font-medium px-[1rem] text-white">
            <button type="button" class=" border-gray-800 bg-gray-600 hover:bg-gray-500 py-2 px-[4rem] rounded-md shadow-md">
                Approve
            </button>
            <button type="button" class="border-gray-800 bg-gray-800 hover:bg-gray-700 py-2 px-[4rem] rounded-md shadow-md">
                Reject
            </button>
        </div>
    </div>
</template>