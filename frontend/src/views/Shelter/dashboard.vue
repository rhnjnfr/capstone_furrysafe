<script>
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/dateCard.vue'
import linkfooter from '@/components/footerLink.vue'
import updatescard from '@/components/dashboard_Activities.vue';
import displaymap from '@/components/Map.vue';
import mapoverlay from '@/components/pin_MapModal.vue'

export default {
    beforeMount() {
        // this.address_exists = localStorage.getItem("address_exists")
        const address_exist = localStorage.getItem('address_exists')

        if(address_exist.startsWith(false)){
            this.toggleModal()
        }

        this.open = true; // Set the open ref value to true
    },
    components: {
        textvalue, datetoday, linkfooter, updatescard, displaymap, mapoverlay
    },
    data() {
        return {
            modalVisible: false,
        }
    },
    methods: {
    toggleModal() {
        console.log("Toggling modal");
        this.modalVisible = true; // Show the modal
        },
  },
};

    // function toggleModal() {
    //     console.log("D:")
    // }
</script>
<template>
    <div class="h-screen flex flex-col">
        <mapoverlay v-if="modalVisible" @close="modalVisible = false" />
        <header class="flex justify-between items-center">
            <div class="graycolor">
                <textvalue msg="Dashboard" />
            </div>
            <div class="flex gap-5">
                <datetoday />
            </div>
        </header>
        <main class="mt-[1rem] flex gap-x-6">
            <div class="w-[70%]">
                <div class="">
                    <div class="grid border">
                        <div class="font-medium graycolor py-[1rem] px-[2rem] border-b-2">Shelters Location</div>
                        <div class="flex bg-white">
                            <displaymap class="h-[40vh]" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[30%] border rounded-xl">
                <div class="py-[1rem] px-[2rem] border-b-2">
                    <span class="font-medium graycolor">Activity</span>
                </div>
                <div class="py-[2rem] px-[4rem] flex bg-slate-50">
                    <updatescard />
                </div>
            </div>
        </main>
        <footer class="mt-auto">
            <div>
                <linkfooter />
            </div>
        </footer>
    </div>
</template>