export interface GeoResult {
    lat: string
    lon: string
    display_name: string
}

const API_URL = "https://geocode.maps.co/"
const API_KEY = "692e03b734fa2835968672wqxdaaf18"

export async function searchCity(city: string): Promise<GeoResult | null> {
    const url = `${API_URL}search?city=${encodeURIComponent(city)}&api_key=${API_KEY}`

    try {
        const res = await fetch(url)
        if (!res.ok) return null

        const data = await res.json()

        if (!Array.isArray(data) || data.length === 0) return null

        return data[0] as GeoResult
    } catch (e) {
        return null
    }
}

export async function searchCityByCoords(coords: { latitude: number, longitude: number }) {
    const url = `${API_URL}reverse?lat=${coords.latitude}&lon=${coords.longitude}&accept-language=en&api_key=${API_KEY}`

    try {
        const res = await fetch(url)
        if (!res.ok) return null

        const data = await res.json()

        return data
    } catch (e) {
        return null
    }
}

