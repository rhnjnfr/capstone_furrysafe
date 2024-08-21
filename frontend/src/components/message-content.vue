<script>
export default {
  name: 'message-content',
  props: {
    msg: String
  }
}
</script>

<template>
  <div class="font-semibold sm:text-[14px]">
    <h1>{{ msg }}</h1>
  </div>
</template>