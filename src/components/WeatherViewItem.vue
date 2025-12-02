<script setup>
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

defineProps({
  enrichedCities: Array,
})

</script>
<template>
    <template v-if="enrichedCities">
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
    </template>
</template>