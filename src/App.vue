<template>
  <div id="app">
    <h1>Tetris</h1>
    <field
      :height="20"
      :width="10"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Field from './components/Field.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Field
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
