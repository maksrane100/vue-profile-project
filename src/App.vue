<template>
  <div id="app">
	<profiles></profiles>
  </div>
</template>

<script>
import profiles from "./components/profiles.vue";

export default {
  components: {
	"profiles": profiles
  },
  name: "app",
  data() {
    return {};
  }
};
</script>

<style>
  @import './assets/styles/mystyles.css';
</style>
