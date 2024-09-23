<template>
    <div>
        <div class="">
            <div class="grid grid-cols-1 gap-2 bg-white/5 sm:grid-cols-1 lg:grid-cols-3">
                <div v-for="stat in stats" :key="stat.name" class="bg-gray-800 rounded-lg px-4 py-6 sm:px-6 lg:px-8">
                    <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.name }}</p>
                    <p class="mt-2 flex items-baseline gap-x-2">
                        <span class="text-4xl font-semibold tracking-tight text-white">{{ stat.value }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const stats = [
    { name: 'Pending Request', value: '2'},
    { name: 'Approved', value: '2' },
    { name: 'Rejected', value: '2' },
]
</script>