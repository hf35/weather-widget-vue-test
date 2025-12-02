<script setup>
import draggable from 'vuedraggable';
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

import { computed, ref } from "vue"
import { useWidgetStore } from "../stores/useWidgetStore"
import CityListItem from '../components/CityListItem.vue';
import { searchCity } from "../services/geoService"

const store = useWidgetStore()

const emit = defineEmits(['go-weather'])

const citiesList = computed({
    get: () => [...store.cities.value],  
    set: (val) => store.setOrder(val),  
})


const newCity = ref("")
const loading = ref(false)
const error = ref("")


async function add() {
    error.value = ""

    const city = newCity.value.trim()
    if (!city) return

    loading.value = true
    const geo = await searchCity(city)
    loading.value = false

    if (!geo) {
        error.value = "There isn't such city" 
        return
    }

    // сохраняем
    store.addCity({
        name: city,
        lat: geo.lat,
        lon: geo.lon,
    })

    newCity.value = ""
}
</script>

<template>
    <div class="settings-page">
        <div class="relative">
            <h2 class="text-center">Settings</h2>
            <ArrowUturnLeftIcon class="h-6 w-6 text-gray-500 absolute top-0 right-2 cursor-pointer"
                @click="$emit('go-weather')" />
        </div>


        <draggable class="list-group pl-0" tag="ul" v-model="citiesList" handle=".handle" v-bind="{
            animation: 200,
            group: 'description',
            disabled: false,
            ghostClass: 'ghost'
        }" item-key="id" @start="drag = true" @end="drag = false" :class="pl - 0">
            <!-- <template #item="{ element }">
                <li class="list-group-item flex flew-row gap-2">
                    <i class="flex fa fa-align-justify handle w-5 h-5 bg-red-300"></i>
                    {{ element.name }}
                </li>
            </template> -->
            <template #item="{ element }">
                <CityListItem :element="element" :store="store" />
            </template>
        </draggable>


        <div class="flex gap-2">
            <input v-model="newCity"
                class="border-1 border-solid border-b-pink-200 border-l-0 border-r-0 border-t-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition px-2 py-1 flex-1"
                placeholder="Add city..." />
            <button @click="add"
                class="px-2 py-1select-none rounded bg-pink-500 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                :disabled="loading">
                {{ loading ? "Find..." : "Add" }}
            </button>
        </div>
        <p v-if="error" class="text-red-300 text-sm">
            {{ error }}
        </p>


    </div>

</template>

<style>
.flip-list-move {
    transition: transform 0.5s;
}

.ghost {
    opacity: 0.2;
}
</style>
