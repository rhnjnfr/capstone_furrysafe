<template>
    <div class="overflow-hidden bg-white drop-shadow-md sm:rounded-md text-gray-400 text-[13px] p-[1rem] sm:px-[4rem] md:px-[2rem] md:w-fit h-fit sm:w-full py-[2rem]">
      <div class="container max-w-[20rem]">
        <div class="mb-[1rem]">
          <span class="text-gray-600 font-semibold text-[14px]">About Shelter</span>
          <ul v-for="item in sentence" :key="item.id">
            <span>{{ item.info }}</span>
          </ul>
        </div>
        <span class="text-gray-600 font-semibold text-[14px]">More Details</span>
        <ul role="list">
          <li v-for="item in items" :key="item.id" class="py-1 flex">
            <img :src="item.icon" alt="" class="w-6 h-6 mr-2">
            <span>{{ item.label }}</span>
            <a href="" class="cursor-pointer">{{ item.link }}</a>
          </li>
        </ul>
      </div> 
    </div>
</template>
  
<script setup>
const sentence = [
  {
    info: 'dsadhsiudosdhcxzxzcxcxcxc xzcxzcxzcxcxzsdsadsa sgiudhsudagdsd, hdusidgsaiodhisdhsaidsdgshs ushdiashdusdiushdsa dsahdsadsja'
  },
]

const items = [
  {
    icon: require('@/assets/images/Location.png'),
    label: '#506 Lim Building J.P. Laurel Avenue, Corner Acacia, Davao City, Philippines',
  },
  {
    icon: require('@/assets/images/PhoneNum.png'),
    label: '091234567891',
  },
  {
    icon: require('@/assets/images/Envelope.png'),
    label: 'dolendshelter@idkwhatisthis.com',
  },
  {
    icon: require('@/assets/images/link.png'),
    link: 'http://dolendshelter@idkwhatisthis.com',
  },
]
</script>