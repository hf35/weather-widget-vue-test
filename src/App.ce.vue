<script setup lang="ts">
import { ref } from 'vue'

import WeatherPage from './pages/WeatherView.vue'
import SettingsPage from './pages/Settings.vue'
import { Page, Pages } from './types'
const page = ref<Page>(Pages.Weather)

</script>

<template>
  <div class="px-2 pb-2">
    <WeatherPage v-if="page === Pages.Weather" @go-settings="page = Pages.Settings" />
    <SettingsPage v-if="page === Pages.Settings" @go-weather="page = Pages.Weather" />
  </div>
</template>



<style src="./style.css"></style>
<style>
:host {
  display: block;
  width: 300px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

}
</style>
