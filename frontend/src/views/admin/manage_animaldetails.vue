<template>
    <div>
        <div class="hidden sm:block">
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <button v-for="tab in tabs" :key="tab.name"
                        :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'w-1/3 border-b-2 py-4 px-1 text-center text-sm font-medium']"
                        :aria-current="tab.current ? 'page' : undefined" @click="updateCurrentTab(tab.name)">{{ tab.name
                        }}
                    </button>
                </nav>
            </div>
        </div>
        <div v-show="currentTab === 'Pet Breed / Mix'">
            <form>
                <div class="mx-auto my-[5%] border border-gray-300 bg-white rounded-xl sm:w-full lg:w-1/2 h-fit p-[3rem] text-sm">
                    <div class="flex justify-end">
                        <select class="block w-fit text-sm border rounded-md p-1 pr-[3rem] pl-4 text-gray-700">
                            <option value="" selected disabled hidden>Select Pet Type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>
                    </div>
                    <div>
                        <label for="animalBreed" class="font-semibold">Breed / Mix</label>
                        <input type="text" name="animalBreed" id="animalBreed" placeholder="Enter Pet Breed / Mix"
                            class="mt-3 border py-2 px-4 rounded-md w-full">
                    </div>
                    <div class="mt-[1.5rem] flex justify-end">
                        <button type="button"
                            class="bg-gray-800 hover:bg-gray-700 text-white py-2 px-[5rem] rounded-md">Add</button>
                    </div>
                </div>
            </form>
        </div>
        <div v-show="currentTab === 'Pet Type'">
            <form>
                <div class="mx-auto my-[5%] border border-gray-300 bg-white rounded-xl sm:w-full lg:w-1/2 h-fit p-[3rem] text-sm">
                    <div>
                        <label for="animalType" class="font-semibold">Pet Type</label>
                        <input type="text" name="animalType" id="animalType" placeholder="Enter Pet Type"
                            class="mt-3 border py-2 px-4 rounded-md w-full">
                    </div>
                    <div class="mt-[1.5rem] flex justify-end">
                        <button type="button"
                            class="bg-gray-800 hover:bg-gray-700 text-white py-2 px-[5rem] rounded-md">Add</button>
                    </div>
                </div>
            </form>
        </div>
        <div v-show="currentTab === 'Vaccines'">
            <form>
                <div class="mx-auto my-[5%] border border-gray-300 bg-white rounded-xl sm:w-full lg:w-1/2 h-fit p-[3rem] text-sm">
                    <div class="flex justify-end">
                        <select class="block w-fit text-sm border rounded-md p-1 pr-[3rem] pl-4 text-gray-700">
                            <option value="" selected disabled hidden>Select Pet Type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>
                    </div>
                    <div>
                        <label for="animalvaccine" class="font-semibold">Vaccine</label>
                        <input type="text" name="animalvaccine" id="animalvaccine" placeholder="Enter Pet Vaccine"
                            class="mt-3 border py-2 px-4 rounded-md w-full">
                    </div>
                    <div class="mt-[1.5rem] flex justify-end">
                        <button type="button"
                            class="bg-gray-800 hover:bg-gray-700 text-white py-2 px-[5rem] rounded-md">Add</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = [
    { name: 'Pet Breed / Mix', current: true },
    { name: 'Pet Type', current: false },
    { name: 'Vaccines', current: false },
]

let currentTab = ref(tabs[0].name)

function updateCurrentTab(tabName) {
    currentTab.value = tabName
    tabs.forEach((tab) => tab.current = tab.name === tabName) // changing the current: true if it is equal to the currenttab name selected and the rest change to false
}
</script>