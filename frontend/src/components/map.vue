<template>
    <!-- JENE MAP TESTING :D -->
    <div id="map"  class="h-[33.9rem] md:w-[15rem] object-cover"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import the custom pin image
//import customPin from '@/assets/custom-pin.png';

export default {
  name: 'map.vue',
  data() {
    return {
      map: null,
      marker: null,
      customIcon: null,
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      // Initialize the map and set its view
      this.map = L.map('map').setView([7.0736, 125.6110], 13); // Cebu City coordinates

      // Add the tile layer (the map itself)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      // Set up the custom icon
      // this.customIcon = L.icon({
      //   iconUrl: customPin, // Custom pin image
      //   iconSize: [38, 38], // Size of the icon
      //   iconAnchor: [19, 38], // Anchor point of the icon
      //   popupAnchor: [0, -38], // Position of the popup relative to the icon
      // });

      // Add a click event to place a marker
      this.map.on('click', this.addMarker);
    },
    addMarker(e) {
      // If there's an existing marker, it will remove it
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      // Add a new marker with the custom icon
      //this.marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.customIcon }).addTo(this.map);

      // Optionally, show the coordinates in a popup
      //this.marker.bindPopup(`Coordinates: ${e.latlng.lat}, ${e.latlng.lng}`).openPopup();
    }
  }
};
</script>

<!-- <style scoped>
#map {
  height: 100%;
  width: 100%;
}

.leaflet-container {
  height: 100%;
  width: 100%;
}
</style> -->