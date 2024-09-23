<!-- <template>
    <div>
        <div>
            <ul class="mt-[1rem]">
                <li><span class="font-semibold text-gray-600 pr-2">Shelter's Name:</span>{{ requestDetails.name }}</li>
                <li><span class="font-semibold text-gray-600 pr-2">Email Address:</span>{{ requestDetails.email }}</li>
            </ul>
        </div>
        <div class="border-b py-[1rem]">
            <span>Proof Documents</span>
        </div>
        <div class="my-[1rem]">
            <previw :selected-item="selectedItem" />
        </div>
        <div>
            <div>
                <ul role="list"
                    class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-7 xl:gap-x-3">
                    <li v-for="imgs in imgDocuments" :key="imgs.imgUrl"
                        @click="selectItem({ type: 'image', imgUrl: imgs.imgUrl })">
                        <div
                            class="group aspect-h-7 aspect-w-10 block w-fit overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                            <img :src="imgs.imgUrl" alt=""
                                class="cursor-pointer w-[10rem] object-cover group-hover:opacity-75" />
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <ul role="list" class="mt-[1rem] gap-y-1 w-fit">
                    <li v-for="file in fileDocuments" :key="file.docu"
                        @click="selectItem({ type: 'document', filepath: file.filepath })">
                        <div class="cursor-pointer flex gap-2 items-center">
                            <DocumentIcon class="h-5 w-5 text-gray-500" />
                            <span class="text-gray-600 hover:text-gray-900">{{ file.docu }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import { DocumentIcon } from '@heroicons/vue/24/outline';

import previw from "../components/admin_documentPreview.vue";

export default {
    components: {
        previw, DocumentIcon
    },
    data() {
        return {
            requestDetails: {
                name: 'Dolends Animal Shelter',
                email: 'exampleShelter@gmail.com',
            },

            selectedItem: null,

            imgDocuments: [
                {
                    imgUrl: require('@/assets/images/animalshelterdog.png'),
                },
                {
                    imgUrl: require('@/assets/images/eric.png'),
                },

            ],

            fileDocuments: [
                {
                    docu: 'dsdsdsds.pdf',
                    // filepath: require('@/assets/images/sample.pdf') // problem sa size pero idk umiyak
                },
                {
                    docu: 'asdsdsdd.pdf',
                    // filepath: require('@/assets/images/sample.pdf')
                },
            ],
        }
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item
        }
    }
}
</script> -->
<template>
    <div>
        <div class="border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
                <div class="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Shelter's Name</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ requestDetails.name }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ requestDetails.email }}
                    </dd>
                </div>
                <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <div>
                            <ul role="list"
                                class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-7 xl:gap-x-3">
                                <li v-for="imgs in imgDocuments" :key="imgs.imgUrl"
                                    @click="selectItem({ type: 'image', imgUrl: imgs.imgUrl })">
                                    <div
                                        class="group aspect-h-7 aspect-w-10 block w-fit overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                        <img :src="imgs.imgUrl" alt=""
                                            class="cursor-pointer w-[7rem] h-[9rem] object-cover group-hover:opacity-75" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="mt-[1rem]">
                            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <li v-for="file in fileDocuments" :key="file.docu"
                                    class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div class="flex w-0 flex-1 items-center">
                                        <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span class="truncate font-medium">{{ file.docu }}</span>
                                        </div>
                                    </div>
                                    <div class="ml-4 flex-shrink-0">
                                        <button type="button"
                                            @click="selectItem({ type: 'document', filepath: file.filepath })"
                                            class="font-medium text-gray-600 hover:text-gray-500">View</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </div>
            </dl>
        </div>
        <div>
            <div class="border-t w-full py-6">
                <span class="text-sm font-medium leading-6 text-gray-900">Douments Preview</span>
            </div>
            <previw :selected-item="selectedItem" />
        </div>
    </div>
</template>

<script>
import { PaperClipIcon } from '@heroicons/vue/20/solid'

import previw from "../components/admin_documentPreview.vue";
export default {
    components: {
        previw, PaperClipIcon
    },
    data() {
        return {
            requestDetails: {
                name: 'Dolends Animal Shelter',
                email: 'exampleShelter@gmail.com',
            },

            selectedItem: null,

            imgDocuments: [
                {
                    imgUrl: require('@/assets/images/animalshelterdog.png'),
                },
                {
                    imgUrl: require('@/assets/images/eric.png'),
                },

            ],

            fileDocuments: [
                {
                    docu: 'dsdsdsds.pdf',
                    // filepath: require('@/assets/images/sample.pdf') // problem sa size pero idk umiyak
                },
                {
                    docu: 'asdsdsdd.pdf',
                    // filepath: require('@/assets/images/sample.pdf')
                },
            ],
        }
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item
        }
    }
}
</script>