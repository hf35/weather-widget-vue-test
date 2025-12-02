import { useLocalStorage } from '@vueuse/core'


export interface City {
    id: number
    name: string
    lat: string
    lon: string
    default?: boolean;
}



export function useWidgetStore() {
    const cities = useLocalStorage<City[]>('weather-widget-items', [])

    function addCity(item: Omit<City, "id">) {
        const id = Date.now()
        cities.value.push({ id, ...item })
    }

    function removeCity(id: number) {
        cities.value = cities.value.filter(i => i.id !== id)
    }

    function setOrder(newList: City[]) {
        cities.value = newList
    }

    return {
        cities,
        addCity,
        removeCity,
        setOrder,
    }
}
