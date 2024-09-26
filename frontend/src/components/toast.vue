<template>
    <div
      v-if="visible"
      class="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity"
      :class="{'opacity-100': visible, 'opacity-0': !visible}"
      role="alert"
      @click="hideToast"
    >
        {{ message }}
    </div>
</template>

<script setup>
    import { ref, defineExpose } from 'vue';

    const visible = ref(false);
    const message = ref('');

    function showToast(msg) {
        message.value = msg;
        visible.value = true;
        setTimeout(() => {
            hideToast();
        }, 3000);
    }

    function hideToast() {
        visible.value = false;
    }

    // Expose the showToast function to the parent component
    defineExpose({ showToast });
</script>
