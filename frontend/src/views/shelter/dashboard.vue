<script>
import textvalue from '@/components/textString.vue'
import datetoday from '@/components/dateCard.vue'
import linkfooter from '@/components/footerLink.vue'
import updatescard from '@/components/dashboard_Activities.vue';
import displaymap from '@/components/showMap.vue';

export default {
    components: {
        textvalue, datetoday, linkfooter, updatescard, displaymap
    },
    data() {
        return {

        }
    }
};
</script>
<template>
    <div class="h-screen flex flex-col">
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