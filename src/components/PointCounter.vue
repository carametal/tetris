<template>
  <div id="point-counter">
    <h3>Point</h3>
    <span>{{ value }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Number,
      required: true,
    }
  }
})
</script>
