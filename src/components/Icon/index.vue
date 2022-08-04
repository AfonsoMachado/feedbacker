<template>
  <!-- Passa as props pra baixo -->
  <component :is="name" v-bind="$props"></component>
</template>

<script>
import Loading from './Loading.vue'

export default {
  components: {
    Loading,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
