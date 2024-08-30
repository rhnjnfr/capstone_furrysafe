<template>
    <div>
        <form>
            <div id="margin" class="space-y-12 sm:mx-[3rem] md:mx-[2rem] lg:mx-[10rem] my-[2.5rem]">
                <div class="border-b border-gray-900/10 pb-7">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Animal Profile</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">Create a comprehensive profile for this animal,
                        including its breed, age, size, behavior, and medical history.</p>
                    <div class="mt-10 border-t pt-[2rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="idNum" class="block text-sm font-medium leading-6 text-gray-900">
                                ID Number</label>
                            <div class="mt-2">
                                <input type="text" v-model="idNum" name="idNum" id="idNum"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    readonly />
                            </div>
                        </div>
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="profile-photo" class="block text-sm font-medium leading-6 text-gray-900">
                                Profile photo</label>
                            <div :class="{ 'py-5': !selectedImage, 'py-2': selectedImage }"
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                <div class="text-center" v-if="!selectedImage">
                                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div class="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label for="file-upload"
                                            class="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" ref="fileInput" name="file-upload" type="file"
                                                class="sr-only" @change="handleFileChange" />
                                        </label>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <div v-else class="flex justify-center items-center h-full w-full relative">
                                    <img :src="selectedImage" class="max-w-[15rem] max-h-[15rem] rounded-md" />
                                    <button @click="clearImage"
                                        class="absolute top-2 sm:right-[1rem] lg:right-[8.1rem] text-gray-600 hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-[1rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="given-name"
                                class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div class="mt-2">
                                <input type="text" name="given-name" id="given-name" autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="md:col-span-3 sm:col-span-full">
                            <label for="alias"
                                class="block text-sm font-medium leading-6 text-gray-900">Nickname</label>
                            <div class="mt-2">
                                <input type="text" name="alias" id="alias" autocomplete=""
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="rehomed" class="lg:col-span-1 sm:col-span-full">
                            <label for="rehome" class="block text-sm font-medium leading-6 text-gray-900">
                                Date Re-homed</label>
                            <div class="mt-2">
                                <input type="date" name="rehome" id="rehome"
                                    class="border p-1 rounded-lg px-[1rem] w-full">
                            </div>
                        </div>
                        <div id="anitype" class="lg:col-span-2 sm:col-span-full">
                            <label for="animaltype" class="block text-sm font-medium leading-6 text-gray-900">
                                Animal Type</label>
                            <div class="mt-2">
                                <select v-if="selectedAnimalType !== 'Other type of animal'" id="animaltype"
                                    name="animaltype" v-model="selectedAnimalType"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Animal Type</option>
                                    <option>Domestic Dog</option>
                                    <option>Domestic Cat</option>
                                    <option>Other type of animal</option>
                                </select>

                                <div v-else class="flex gap-2 items-center">
                                    <input type="text" v-model="animaltype" name="animaltype" id="animaltype"
                                        placeholder="Type of Furry Animal"
                                        class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <button @click="clearAnimalTypeInput" class="w-4 h-4 lg:mr-[1rem]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="breed" class="lg:col-span-2 sm:col-span-full">
                            <label for="animalbreed" class="block text-sm font-medium leading-6 text-gray-900">
                                Breed / Mix</label>
                            <div class="mt-2">
                                <select
                                    v-if="selectedAnimalType === 'Domestic Dog' && selectedAnimalBreed !== 'Mixed breed'"
                                    id="animalbreed" name="animalbreed" v-model="selectedAnimalBreed"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Dog Breed/Mix</option>
                                    <option v-for="(breed, index) in dogBreeds" :key="index" :value="breed">{{ breed }}
                                    </option>
                                </select>

                                <select
                                    v-else-if="selectedAnimalType === 'Domestic Cat' && selectedAnimalBreed !== 'Mixed breed'"
                                    id="animalbreed" name="animalbreed" v-model="selectedAnimalBreed"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Cat Breed/Mix</option>
                                    <option v-for="(breed, index) in catBreeds" :key="index" :value="breed">{{ breed }}
                                    </option>
                                </select>

                                <div v-else class="flex gap-2 items-center">
                                    <input type="text" v-model="animalbreed" name="animalbreed" id="animalbreed"
                                        :placeholder="selectedAnimalType === 'Domestic Dog' ? 'Type of Mixed Dog Breed' : selectedAnimalType === 'Domestic Cat' ? 'Type of Mixed Cat Breed' : 'Type of Furry Animal Breed/Mix'"
                                        class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <button
                                        v-if="(selectedAnimalType === 'Domestic Dog' || selectedAnimalType === 'Domestic Cat') && selectedAnimalBreed === 'Mixed breed'"
                                        @click.prevent="clearAnimalTypeBreed" class="w-4 h-4 lg:mr-[1rem]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div id="gender" class="lg:col-span-1 sm:col-span-full">
                            <label for="energylvl"
                                class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                            <div class="mt-2">
                                <select id="energylvl" name="energylvl" placeholder="Select"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                        <div id="fur" class="md:col-span-4 sm:col-span-full">
                            <label for="city" class="block text-sm font-medium leading-6 text-gray-900">
                                Coat / Fur</label>
                            <div class="mt-2">
                                <input type="text" name="city" id="city" autocomplete="address-level2"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="age" class="md:col-span-2 sm:col-span-full">
                            <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
                            <div class="mt-2">
                                <input type="text" name="region" id="region" autocomplete="address-level1"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="size" class="md:col-span-4 sm:col-span-full">
                            <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Size</label>
                            <div class="mt-2">
                                <input type="text" name="city" id="city" autocomplete="address-level2"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div id="lvl" class="md:col-span-2 sm:col-span-full">
                            <label for="energylvl" class="block text-sm font-medium leading-6 text-gray-900">Energy
                                Level</label>
                            <div class="mt-2">
                                <select id="energylvl" name="energylvl"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option value="" selected disabled hidden>Select Energy Level Status</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>Medium-High</option>
                                    <option>High</option>
                                    <option>Very High</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-span-full border-t border-gray-900/10">
                            <div class="border-b border-gray-900/10 py-5">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Health and Medical</h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">Provide details about the animal's
                                    current health, including vaccinations, medical conditions, and treatment history.
                                </p>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="vaccinestatus" class="block text-sm font-medium leading-6 text-gray-900">
                                Vaccinations Status
                            </label>
                            <div class="mt-2 flex gap-x-3">
                                <!-- <textarea type="text" v-model="vaccinestatus" name="vaccinestatus" id="vaccinestatus"
                                    autocomplete=""
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
                                <input type="checkbox" id="checkbox1" v-model="checkboxValues" value="Option 1">
                                <label for="checkbox1">Option 1</label>
                                <br>
                                <input type="checkbox" id="checkbox2" v-model="checkboxValues" value="Option 2">
                                <label for="checkbox2">Option 2</label>
                                <br>
                                <input type="checkbox" id="checkbox3" v-model="checkboxValues" value="Option 3">
                                <label for="checkbox3">Option 3</label>
                                <br>
                                <input type="checkbox" id="checkbox4" v-model="checkboxValues" value="Option 4">
                                <label for="checkbox4">Option 4</label>
                                <br>
                                <input type="checkbox" id="checkbox5" v-model="checkboxValues" value="Option 5">
                                <label for="checkbox5">Option 5</label>
                                <br>
                                <input type="checkbox" id="checkbox6" v-model="checkboxValues" value="Option 6">
                                <label for="checkbox6">Option 6</label>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="Medconditions" class="block text-sm font-medium leading-6 text-gray-900">
                                Medical Conditions
                            </label>
                            <div class="mt-2 flex gap-x-3">
                                <textarea type="text" v-model="Medconditions" name="Medconditions" id="Medconditions"
                                    autocomplete=""
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-full">
                            <label for="specialneeds" class="block text-sm font-medium leading-6 text-gray-900">
                                Special Needs
                            </label>
                            <div class="mt-2 flex gap-x-3">
                                <textarea type="text" v-model="specialneeds" name="specialneeds" id="specialneeds"
                                    autocomplete=""
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-full">
                            <label class="font-medium text-gray-900">
                                Has this animal been spayed/neutered?
                            </label>
                            <div class="mt-2 ml-[2rem] gap-x-5">
                                <div class="mt-4 space-y-2">
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="spayed" name="spayNeuterStatus" type="radio" value="Spayed"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="lg:flex text-sm leading-6">
                                            <label for="spayed" class="font-medium text-gray-700 pr-[1rem]">
                                                Yes -Spayed</label>
                                            <p class="text-gray-600">This animal is a female that has been spayed.</p>
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="neutered" name="spayNeuterStatus" type="radio" value="Neutered"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="lg:flex text-sm leading-6">
                                            <label for="neutered" class="font-medium text-gray-700 pr-[1rem]">Yes -
                                                Neutered</label>
                                            <p class="text-gray-600">This animal is a male that has been neutered.</p>
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="intact" name="spayNeuterStatus" type="radio" value="Intact"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="lg:flex text-sm leading-6">
                                            <label for="intact" class="font-medium text-gray-700 pr-[1rem]">No -
                                                Intact</label>
                                            <p class="text-gray-600">This animal has not been spayed or neutered.</p>
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="notApplicable" name="spayNeuterStatus" type="radio"
                                                value="Not Applicable"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="lg:flex text-sm leading-6">
                                            <label for="notApplicable" class="font-medium text-gray-700 pr-[1rem]">Not
                                                Applicable</label>
                                            <p class="text-gray-600">This animal is too young or not eligible for
                                                spaying/neutering.</p>
                                        </div>
                                    </div>
                                    <div class="relative flex gap-x-3">
                                        <div class="flex h-6 items-center">
                                            <input id="unknown" name="spayNeuterStatus" type="radio" value="Unknown"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="lg:flex text-sm leading-6">
                                            <label for="unknown"
                                                class="font-medium text-gray-700 pr-[1rem] ">Unknown</label>
                                            <p class="text-gray-600">This animal's spay/neuter status is unknown.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-full border-t border-gray-900/10">
                            <div class="border-b border-gray-900/10 py-5">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">Other Information</h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600">Share other important information
                                    related to this furry animal. This information you've provided for this animal can
                                    help potential adopters to learn more about its background, personality, and needs.
                                </p>
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Tell me more
                                about this Furry Animal</label>
                            <div class="mt-2">
                                <textarea v-model="about" id="about" name="about" rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 px-[1rem] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div class="col-span-full">
                            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Photos</label>
                            <div class="px-[1rem] py-[1rem]">
                                <div class="px-4 sm:col-span-2 sm:px-0">
                                    <ul role="list"
                                        class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                        <li v-for="(file, index) in files" :key="file.source" class="relative">
                                            <div
                                                class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                                <img :src="file.url" alt="" class="pointer-events-none object-cover" />
                                                <button @click="removeImage(index)"
                                                    class="absolute top-0 right-0 p-1 text-gray-600 hover:text-red-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" stroke-width="2"
                                                        class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mt-3">
                                    <label for="file-input" class="cursor-pointer flex items-center gap-x-2">
                                        <input type="file" multiple @change="handleMultipleFileChange" id="file-input"
                                            ref="fileInputs" class="hidden" />
                                        <img width="24" height="24"
                                            src="https://img.icons8.com/fluency/48/stack-of-photos.png"
                                            alt="stack-of-photos" />
                                        <span class="font-medium text-gray-700 text-[14px]">Add more photos</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-end gap-x-6">
                    <RouterLink to="/animalprofile" class="text-sm font-semibold leading-6 text-gray-900">Cancel
                    </RouterLink>
                    <button type="submit"
                        class="rounded-md bgteal px-[2rem] py-2 text-sm font-semibold text-white shadow-sm hover:bg-bgteal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
                        Profile</button>
                </div>
            </div>
        </form>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { PhotoIcon } from '@heroicons/vue/24/solid'
import linkfooter from '@/components/footerLink.vue'

// const selectedAnimalType = ref('');
// const selectedAnimalBreed = ref('');
// const animaltype = ref('');
// const animalbreed = ref('');

// const dogBreeds = ['Labrador Retriever', 'Golden Retriever', 'Bulldog', 'German Shepherd', 'Pit bull', 'Beagle', 'Rottweiler', 'Boxer', 'Dachshund', 'Yorkshire Terrier', 'Maltese', 'Chihuahua', 'Poodle', 'German Shepherd', 'Shih Tzu', 'Mixed breed'];
// const catBreeds = ['Siamese', 'Persian', 'Maine Coon', 'British Shorthair', 'Domestic Shorthair', 'American Shorthair', 'Domestic Longhair', 'Domestic Medium Hair', 'Bengal', 'Ragdoll', 'Mixed breed'];

// const clearAnimalTypeInput = () => {
//     animaltype.value = '';
//     selectedAnimalType.value = ''; // reset the selected animal type
// };

// const clearAnimalTypeBreed = () => {
//     if (selectedAnimalBreed.value === 'Mixed breed') {
//         animalbreed.value = '';
//     } else {
//         selectedAnimalBreed.value = '';
//     }
// };

const clearAnimalTypeBreed = () => {
    animalbreed.value = '';
    selectedAnimalBreed.value = ''; // reset the selected animal breed
};


const selectedAnimalType = ref('');
const selectedAnimalBreed = ref('');
const animaltype = ref('');
const animalbreed = ref('');

const dogBreeds = ['Labrador Retriever', 'Golden Retriever', 'Bulldog', 'German Shepherd', 'Pit bull', 'Beagle', 'Rottweiler', 'Boxer', 'Dachshund', 'Yorkshire Terrier', 'Maltese', 'Chihuahua', 'Poodle', 'German Shepherd', 'Shih Tzu', 'Mixed breed'];
const catBreeds = ['Siamese', 'Persian', 'Maine Coon', 'British Shorthair', 'Domestic Shorthair', 'American Shorthair', 'Domestic Longhair', 'Domestic Medium Hair', 'Bengal', 'Ragdoll', 'Mixed breed'];

const clearAnimalTypeInput = () => {
    animaltype.value = '';
    selectedAnimalType.value = ''; // reset the selected animal type
};

watch(selectedAnimalType, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        selectedAnimalBreed.value = ''; // reset selectedAnimalBreed when selectedAnimalType changes
    }
});
// const selectedAnimalType = ref('');
// const selectedAnimalBreed = ref('');
// const animaltype = ref('');
// const animalbreed = ref('');

// const dogBreeds = ['Labrador Retriever', 'Golden Retriever', 'Bulldog', 'German Shepherd', 'Pit bull', 'Beagle', 'Rottweiler', 'Boxer', 'Dachshund', 'Yorkshire Terrier', 'Maltese', 'Chihuahua', 'Poodle', 'German Shepherd', 'Shih Tzu', 'Mixed breed'];
// const catBreeds = ['Siamese', 'Persian', 'Maine Coon', 'British Shorthair', 'Domestic Shorthair', 'American Shorthair', 'Domestic Longhair', 'Domestic Medium Hair', 'Bengal', 'Ragdoll', 'Mixed breed'];

// const clearAnimalTypeInput = () => {
//     animaltype.value = '';
//     selectedAnimalType.value = ''; // reset the selected animal type
// };

const idNum = ref('') //idnumber

const fileInput = ref(null); // Initialized with a value of null, but it will eventually hold a reference to the file input element. (profile photo)
const selectedImage = ref(null); // Initialized with a value of null, but it will eventually hold the selected image data (e.g., a URL string or a blob)

function handleFileChange(event) {
    const file = event.target.files[0]; // gets the first file selected by the user 
    const reader = new FileReader(); // creates a new FileReader object, which is used to read the contents of the file
    reader.onload = (event) => { // sets up an event listener for when the file reading is complete.
        // When the file reading is complete, the onload event is triggered, and the callback function is executed:
        selectedImage.value = event.target.result; // sets the selectedImage reference to the result of the file reading (the data URL string)
    };
    reader.readAsDataURL(file); // starts reading the file as a data URL (a string representation of the file contents)
}

function clearImage() {
    selectedImage.value = null; // sets the selectedImage reference to null, effectively removing the image
    if (fileInput.value) { // if the file input element exists, sets its value to an empty string, effectively clearing the file selection
        fileInput.value.value = '';
    }
}

// multiple images
const files = ref([])
const fileInputs = ref(null)

const handleMultipleFileChange = (event) => {
    const filesArray = event.target.files
    for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i]
        const reader = new FileReader()
        reader.onload = (event) => {
            files.value.push({ source: file.name, url: event.target.result })
        }
        reader.readAsDataURL(file)
    }
}

const removeImage = (index) => {
    files.value.splice(index, 1)
}
</script>