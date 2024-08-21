<template>
    <div class="flex gap-x-3 items-center">
      <label for="AnimalProfiles" class="block text-sm font-medium leading-6 text-gray-700 w-[9rem]">Animal Profiles</label>
      <select id="AnimalProfiles" name="AnimalProfiles"
        class="mt-2 block w-full rounded-md border-0 py-2 pl-[1rem] pr-10 text-gray-800 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 leading-relaxed">
        <option value="" selected disabled hidden>Select Animal Profile</option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">
            {{ option.profile }}
        </option>
      </select>
    </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
            profile: 'Eric'
        },
        {
            profile: 'Chellsey'
        },
        { 
            profile: 'Jeneh'
        },
        { 
            profile: 'Cyril'
        },
      ]
    }
  },
//     mounted() {
//     axios.get('/api/options')
//       .then(response => {
//         this.options = response.data
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }
}
</script>