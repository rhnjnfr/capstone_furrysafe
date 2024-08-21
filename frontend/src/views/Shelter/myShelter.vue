<script>
import contents from '@/components/message-content.vue'
import calendarCard from '@/components/calendar.vue'
import profileCard from '@/components/prolifeCard.vue'
import detailCard from '@/components/detailsCard.vue'
import linkfooter from '@/components/linksFooter.vue'

import profile_Card from '@/components/profileCard2.vue'
import popupNewpost from '@/components/newpostForm.vue'

export default {
  components: {
    contents,
    calendarCard,
    profileCard,
    detailCard,
    linkfooter,
    profile_Card,
    popupNewpost,
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    }
  },
  data() {
    return {
      // pop up new post
      showModal: false,
      //icons
      pending: require('@/assets/images/Data Pending.png'),
      users: require('@/assets/images/People.png'),
      complaints: require('@/assets/images/Strike.png'),
      calendarICON: require('@/assets/images/Calendar.png'),
      profileICON: require('@/assets/images/Profile.png'),
      ratingICON: require('@/assets/images/Ratings.png'),
      animalICON: require('@/assets/images/Animal.png'),
      writelICON: require('@/assets/images/write.png'),
      //image
      pet: require('@/assets/images/rescue.png'),
    }
  },
}
</script>

<template>
    <div>
        <div class="flex justify-between items-center">
            <div class="graycolor">
                <contents msg="My Shelter"/>
            </div>
            <div>
                <calendarCard />
            </div>
        </div>
        <div class="mt-[1rem]">
          <!-- <profileCard /> -->
           <profile_Card/>
        </div>
        <div class="mt-[1rem] flex sm:flex-col md:flex-row lg:flex-row md:justify-between sm:w-full sm:gap-y-[1rem] md:gap-x-[1rem] ">
          <div><detailCard /></div>
          <div class="drop-shadow-md rounded-lg bg-white w-full h-screen">
            <div class="">
              <div class="flex justify-between border-b-2 items-center p-[1rem] sm:px-[2rem] lg:px-[3rem]">
                <span class="">Shelter's Feed</span>
                <!-- <router-link to=""> -->
                  <button type="button" @click="toggleModal" 
                    class="inline-flex justify-center rounded-md bgteal px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-bgteal">
                    <span class="sm:text-[12.5px] md:text-[14px] px-[7px]">Create New Post</span>
                  </button>
                  <popupNewpost v-if="showModal" @close="toggleModal"/>
                <!-- </router-link> -->
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div>
            <linkfooter/>
          </div>
        </footer>
    </div>
</template>