<template>
  <div v-if="marked_address">
    <p>Current Address: {{ marked_address }}</p>
  </div>
  <div
    class="map-container"
    :style="{ height: containerHeight, width: containerWidth }"
    :id="mapId"
  ></div>
</template>

<script>
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import "leaflet-fullscreen";
  import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
  import paw from "@/assets/images/pawcator-icon-beta.png";
  import "leaflet-control-geocoder";

  export default {
    name: "MapComponent",
    props: {
      containerHeight: {
        type: String,
        default: "70vh",
      },
      containerWidth: {
        type: String,
        default: "100%",
      },
    },
    emits: ['marker-added'], // Declare the event
    data() {
      return {
        map: null,
        marker: null,
        paw: null,
        user_lat: 10.3157,
        user_long: 123.8854,
        zoomLevel: 17,
        marked_address: "",
        mapId: `map-${Math.random().toString(36).substr(2, 9)}`,
      };
    },
    mounted() {
      this.getLocation();
    },
    unmounted() {
      if (this.map) {
        this.map.off();
        this.map.remove();
        this.map = null;
      }
    },
    methods: {
      initializeMap(lat, lng) {
        if (this.map) {
          this.map.setView([lat, lng], this.zoomLevel);
          return;
        }

        this.map = L.map(this.mapId).setView([lat, lng], this.zoomLevel);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }).addTo(this.map);

        this.paw = L.icon({
          iconUrl: paw,
          iconSize: [100, 100],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        });

        this.map.addControl(new L.Control.Fullscreen());
        this.map.on("click", this.addMarker);
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

        this.$emit('location-changed', {
          address: this.marked_address,
          lat: this.user_lat,
          lng: this.user_long
        });
      },
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.user_lat = position.coords.latitude;
              this.user_long = position.coords.longitude;
              this.initializeMap(this.user_lat, this.user_long);
              this.addMarker({
                latlng: { lat: this.user_lat, lng: this.user_long },
              });
            },
            () => {
              console.warn(
                "Geolocation access denied or failed. Using default location."
              );
              this.initializeMap(this.user_lat, this.user_long);
            }
          );
        } else {
          console.warn(
            "Geolocation is not supported by this browser. Using default location."
          );
          this.initializeMap(this.user_lat, this.user_long);
        }
      },
      async getAddress(lat, lon) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "Furry-Safe/1.0 (jinnkin21@gmail.com)",
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          this.marked_address = data.display_name;
          return data.display_name;
        } catch (error) {
          console.error("Error fetching address:", error);
          return null;
        }
      },

    },
  };
  </script>

  <style scoped>
  .map-container {
    height: 70vh;
    width: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .modal-wrapper {
    z-index: 1050;
    position: relative;
  }

  address-display {
    z-index: 1051;
    margin-bottom: 10px;
  }
</style>

