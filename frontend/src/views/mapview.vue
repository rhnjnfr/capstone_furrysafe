<template>
    <div>
      <h1>Map</h1>
      
      <!-- Map Component -->
      <MapWithPin/>
    </div>
  </template>
  
  <script>
  import MapWithPin from '@/components/map.vue';
  
  export default {
    components: {
      MapWithPin
    }
  };
  </script>
  
  <style scoped>
  </style>
  