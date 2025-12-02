<script setup>
import { TrashIcon, Bars3Icon, MapPinIcon } from "@heroicons/vue/24/outline";


defineProps({
  element: Object,
  store: Object
})

</script>

<template>
  <li class="list-group-item flex flew-row items-center gap-2 w-full h-8 mb-1 border border-gray-50">
    <Bars3Icon class="h-6 w-6 text-gray-500 handle cursor-move" />
    <div class="grow">
      {{ element.name }}
    </div>
    <TrashIcon v-if="!element.default" class="h-6 w-6 text-gray-500 cursor-pointer"
      @click="store.removeCity(element.id)" />
    <MapPinIcon v-if="element.default" class="h-6 w-6 text-gray-500 " />

  </li>
</template>

<style scoped></style>
