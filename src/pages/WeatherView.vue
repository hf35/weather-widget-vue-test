<script setup>
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted, watch, computed } from "vue"
import { useWidgetStore } from "../stores/useWidgetStore"
import { getWeatherForCoords } from "../services/weatherService"
import { getDefaultLocation } from "../services/getDefaultLocation";
import { searchCityByCoords } from "../services/geoService"
import WeatherViewItem from "../components/WeatherViewItem.vue"

const store = useWidgetStore()

const emit = defineEmits(['go-weather'])
const weatherData = ref()
const errorDefLocation = ref("")
const loading = ref(true)

async function fetchData(force) {
  try {
    const citiesList = [...store.cities.value]
    if (citiesList.length === 0) { return }
    loading.value = true
    weatherData.value = await getWeatherForCoords({
      lats: citiesList.map(c => c.lat),
      longs: citiesList.map(c => c.lon),
    }, force)
  } finally {
    loading.value = false
  }
}

const enrichedCities = computed(() =>
  weatherData.value && [...store.cities.value].map(city => {
    return ({
      ...city,
      weather: weatherData.value[`${city.lat}-${city.lon}`]
    })
  })

)

watch([() => store.cities.value, () => weatherData.value],
  ([cities, weatherLocalData]) => {
    if (!store.cities) { return }
    const isInvaladatedCache = (cities.length > 0 && !weatherLocalData) ||
      cities.length !== Object.values(weatherLocalData).length ||
      cities.filter(city => !weatherLocalData[`${city.lat}-${city.lon}`]).length !== 0


    if (isInvaladatedCache) {
      fetchData(true)
    }
  }, { deep: true })

onMounted(() => {
  const setDefaultLocation = async () => {
    if (store?.cities?.value?.length === 0) {
      errorDefLocation.value = ""
      const res = await getDefaultLocation()

      if (res.ok) {
        const cityData = await searchCityByCoords(res.coords)
        store.addCity({
          name: cityData.address.city,
          lat: res.coords.latitude,
          lon: res.coords.longitude,
          default: true
        })
      } else {
        errorDefLocation.value = res.errorMsg
      }

    }

  }
  setDefaultLocation()

  fetchData()
})


</script>

<template>
  <div class="weather-page">
    <div class="relative">
      <h2 class="text-center">Weather</h2>
      <AdjustmentsHorizontalIcon class="h-6 w-6 text-gray-500 absolute top-0 right-2 cursor-pointer"
        @click="$emit('go-settings')" />
    </div>
    <div v-if="loading" class=" text-center">
      {{ "Loading..." }}
    </div>
    <div v-if="errorDefLocation" class=" text-center">
      {{ errorDefLocation }}
    </div>
    <!-- <template v-if="enrichedCities">
      <template v-for="city in enrichedCities">
        <div v-if="city.weather" class="border-solid border-gray-100 mb-2 px-2 rounded-md">
          <h3 class="relative text-lg font-bold "> {{ city.name }}
            <SunIcon v-if="city.weather.is_day" class="h-6 w-6 text-gray-500 absolute top-0 right-2 " />
            <MoonIcon v-else class="h-6 w-6 text-gray-500 absolute top-0 right-2 " />
          </h3>
          <p>Temp. {{ city.weather.temperature_2m.toFixed(0) }} °C</p>
          <p>Cloud cover {{ city.weather.cloud_cover }} %</p>
          <p>Rel. humidity {{ city.weather.relative_humidity_2m }} %</p>

        </div>
      </template>
    </template> -->
    <WeatherViewItem :enrichedCities="enrichedCities" />
  </div>
</template>

<style lang="scss"></style>
