<script>
import contents from '@/components/message-content.vue'
import calendarCard from '@/components/calendar.vue'

export default {
  components: {
    contents,
    calendarCard
  },
  data() {
    return {
    //icons
      pending: require('@/assets/images/Data Pending.png'),
      users: require('@/assets/images/People.png'),
      complaints: require('@/assets/images/Strike.png'),
      calendarICON: require('@/assets/images/Calendar.png'),
    }
  },
}
</script>

<template>
    <div class="flex justify-between items-center">
        <div class="graycolor">
            <contents msg="Animal Profile"/>
        </div>
        <div>
            <calendarCard />
        </div>
    </div>
</template>