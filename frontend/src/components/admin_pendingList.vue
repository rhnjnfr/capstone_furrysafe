<script>
export default {
    data() {
        return {
            requests: [
                {
                    id: 1,
                    name: 'Dolends Animal Shelter',
                    createdAt: 'Sept 30',
                    email: 'exampleShelter@gmail.com',
                    status: 'Pending',
                },
                {
                    id: 2,
                    name: 'Jeneh Animal Shelter',
                    createdAt: 'Sept 30',
                    email: 'exampleShelter@gmail.com',
                    status: 'Pending',
                },
                {
                    id: 3,
                    name: 'Monai Animal Shelter',
                    createdAt: 'Sept 30',
                    email: 'exampleShelter@gmail.com',
                    status: 'Approved',
                },
            ]
        }
    }
};
</script>
<template>
    <div>
        <RouterLink v-for="(list, index) in requests" :key="index"
            :to="{ name: 'request_preview', params: { id: list.id } }" custom v-slot="{ navigate }">
            <div @click="navigate"
                class="bg-white shadow-md rounded-b-xl rounded-l-xl mb-4 hover:shadow-xl cursor-pointer">
                <div class="px-[2rem] py-3 text-gray-700 grid gap-y-1">
                    <div class="my-[1rem]">
                        <div class="mb-[1rem]">
                            <span class="flex gap-3 text-[14px]">Shelter's Name:
                                <h1 class="font-bold text-gray-600 text-[14px] flex gap-3">{{ list.name }}</h1>
                            </span>
                            <span class="flex gap-5 text-[14px]">Email Address:
                                <p class="font-semibold text-[13px]">{{ list.email }}</p>
                            </span>
                        </div>
                        <div class="flex justify-between border-t pt-[10px]">
                            <span
                                class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset"
                                :class="{
                                    'bg-red-50 text-red-700 ring-red-800': list.status === 'Pending',
                                    'bg-gray-50 text-gray-700 ring-gray-500': list.status === 'Rejected',
                                    'bg-green-50 text-green-700 ring-green-800': list.status === 'Approved'
                                }">{{ list.status }}</span>
                            <span class="font-semibold text-gray-500 text-[12px]">{{ list.createdAt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<!-- <script setup>
    import axios from "axios"
    import { onMounted, ref} from 'vue';

        const requests = ref([])            
    
        async function displayRequests(){
            try{
                const response = await axios.post("http://localhost:5000/registration")
                const newRequests = response.data; // Modify this line if the data structure is different

                // Add new requests to the existing requests array
                requests.value.push(newRequests);       

                console.log("requests array", requests)
            }
            catch(err){
                console.log("error", err)
            }
        }

    onMounted(()=>{
        displayRequests()
    })
</script>
<template>
    <div>
        <RouterLink v-for="(list, index) in requests" :key="index"
            :to="{ name: 'request_preview', params: { id: list.id } }" custom v-slot="{ navigate }">
            <div @click="navigate"
                class="bg-white shadow-md rounded-b-xl rounded-l-xl mb-4 hover:shadow-xl cursor-pointer">
                <div class="px-[2rem] py-3 text-gray-700 grid gap-y-1">
                    <div class="my-[1rem]">
                        <div class="mb-[1rem]">
                            <span class="flex gap-3 text-[14px]">Shelter's Name:
                                <h1 class="font-bold text-gray-600 text-[14px] flex gap-3">{{ list.name }}</h1>
                            </span>
                            <span class="flex gap-5 text-[14px]">Email Address:
                                <p class="font-semibold text-[13px]">{{ list.email }}</p>
                            </span>
                        </div>
                        <div class="flex justify-between border-t pt-[10px]">
                            <span
                                class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset"
                                :class="{
                                    'bg-red-50 text-red-700 ring-red-800': list.status === 'Pending',
                                    'bg-gray-50 text-gray-700 ring-gray-500': list.status === 'Rejected',
                                    'bg-green-50 text-green-700 ring-green-800': list.status === 'Approved'
                                }">{{ list.status }}</span>
                            <span class="font-semibold text-gray-500 text-[12px]">{{ list.createdAt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>
</template> -->