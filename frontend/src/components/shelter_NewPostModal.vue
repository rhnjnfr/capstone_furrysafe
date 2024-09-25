<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-30" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div class="flex justify-end">
                    <button @click="open = false" ref="cancelButtonRef">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <DialogTitle as="h3"
                    class="mb-[1.5rem] text-[1.3rem] font-semibold leading-6 text-gray-700 flex justify-center">
                    Create New Post
                  </DialogTitle>
                  <div>
                    <PetList />
                  </div>
                  <div class="text-sm mt-1.5">
                    <div class="flex flex-col">
                      <label for="petName" class="font-medium leading-6 text-gray-700">
                        Name</label>
                      <input type="text" name="petName" id="petName" placeholder="petname"
                        class="mt-1.5 border rounded-md p-1.5 px-6" readonly>
                    </div>
                    <div class="flex flex-col mt-1.5">
                      <label for="rehomed" class="font-medium leading-6 text-gray-700">
                        Date Re-homed</label>
                      <input type="text" name="rehomed" id="rehomed" placeholder="rehomed"
                        class="mt-1.5 border rounded-md p-1.5 px-6" readonly>
                    </div>
                    <div class="flex flex-col mt-1.5">
                      <label for="petBreed" class="font-medium leading-6 text-gray-700">
                        Breed / Mix</label>
                      <input type="text" name="petName" id="petName" placeholder="petbreed"
                        class="mt-1.5 border rounded-md p-1.5 px-6" readonly>
                    </div>
                  </div>
                  <div class="mt-2">
                    <textarea v-model="newpost" placeholder="Write a caption or description of this post..."
                      class="border rounded-lg py-[1rem] px-6 w-[27rem] h-[8rem]" />
                  </div>
                  <div class="px-[2rem] py-[1rem]">
                    <div class="flex justify-between mb-3">
                      <span class="text-gray-400 text-[14px]">Add to your post</span>
                      <label for="file-input" class="cursor-pointer flex gap-3 items-center">
                        <input type="file" multiple @change="handleFileChange" id="file-input" ref="fileInput"
                          class="hidden" />
                        <img :src="images" alt="Images Icon" class="h-[2rem] w-[2rem]" />
                      </label>
                    </div>
                    <div v-if="imageUrls.length > 0" class="grid grid-cols-4 gap-2">
                      <div v-for="(imageUrl, index) in imageUrls" :key="index" class="relative">
                        <img :src="imageUrl" alt="Uploaded Image"
                          class="max-w-[100px] max-h-[100px] object-contain border" />
                        <button @click="removeImage(index)"
                          class="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bgteal px-[12.2rem] py-2 text-sm font-semibold text-white shadow-sm hover:bg-bgteal sm:ml-3 sm:w-auto">
                  Post</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>
import { ref } from 'vue'
import PetList from '@/components/dropdown_PetList.vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
  components: { PetList, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, },
  data() {
    return {
      open: true,
      fileInput: null,
      imageUrls: [],
      images: 'https://img.icons8.com/fluency/48/stack-of-photos.png',
    }
  },
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageUrls.push(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage(index) {
      this.imageUrls.splice(index, 1);
    },
  }
}
</script>