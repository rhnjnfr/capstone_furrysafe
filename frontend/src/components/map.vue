<template>
  <div id="map" class="map-container"></div>
</template>

<script>
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import paw from "@/assets/images/pawcator-icon-beta.png"
import 'leaflet-control-geocoder';

export default {
  name: 'map.vue',
  data() {
    return {
      map: null,
      marker: null,
      paw: null,
      user_lat: '',
      user_long: '',
      zoomLevel: 17
    };
  },
  mounted() {
    this.initializeMap();
    this.getLocation();
  },
  methods: {
    initializeMap() {
      this.map = L.map('map').setView([this.user_lat, this.user_long], this.zoomLevel); // Cebu City coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      // Custom icon (paw)
      this.paw = L.icon({
        iconUrl: paw,
        iconSize: [100, 100],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      });

      // Add geocoder control and attach to the map
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false // Disable default marker placement
      }).addTo(this.map);

      // Handle search result
      geocoder.on('markgeocode', (e) => {
        const latlng = e.geocode.center;
        L.marker(latlng).addTo(this.map) // Add a marker at the found location
          .bindPopup(e.geocode.name)
          .openPopup();

        this.map.setView(latlng, 13); // Zoom to the found location
      });

      // Add fullscreen control
      this.map.addControl(new L.Control.Fullscreen());

      // Add event listener for map click
      this.map.on('click', this.addMarker);
    },
    async addMarker(e) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      const lat = e?.latlng ? e.latlng.lat : this.user_lat;
      const lng = e?.latlng ? e.latlng.lng : this.user_long;

      this.user_lat = lat;
      this.user_long = lng;

      this.marker = L.marker([lat, lng], { icon: this.paw }).addTo(this.map);

      const address = await this.getAddress(lat, lng);
      if (address) {
        this.marker.bindPopup(`Address: ${address}`).openPopup();
      } else {
        this.marker.bindPopup(`Coordinates: ${lat}, ${lng}`).openPopup();
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.user_lat = position.coords.latitude;
            this.user_long = position.coords.longitude;

            this.map.setView([this.user_lat, this.user_long], this.zoomLevel);
            this.addMarker({ latlng: { lat: this.user_lat, lng: this.user_long } });
          },
          (error) => {
            console.warn("Geolocation access denied or failed. Using default location.");
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser. Using default location.");
      }
    },
    async getAddress(lat, lon) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Furry-Safe/1.0 (jinnkin21@gmail.com)', // Required by Nominatim
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.display_name;
      } catch (error) {
        console.error('Error fetching address:', error);
        return null;
      }
    }
  }
}
</script>

<style scoped>
.map-container {
  height: 70vh;
  width: 167vh;
}
</style>
