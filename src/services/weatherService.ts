import { fetchWeatherApi } from "openmeteo";

export async function getWeatherForCoords(coors: any, force: boolean) {
    const url = "https://api.open-meteo.com/v1/forecast";

    const params = {
        latitude: coors.lats,
        longitude: coors.longs,
        current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "wind_speed_10m", "wind_direction_10m", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "pressure_msl"],
        forecast_days: 1,
    };


    const TTL = 1 * 60 * 1000
    const STORAGE_KEY = 'weather-cache'
    let data = {}
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached && !force) {
        const parsed = JSON.parse(cached)
        const isExpired = Date.now() - parsed.timestamp > TTL
        if (!isExpired) {
            data = parsed.data
            return data
        }
    }

    try {
        const responses = await fetchWeatherApi(url, params);
        let k = 0
        for (const [index, response] of responses.entries()) {
            const utcOffsetSeconds = response.utcOffsetSeconds();
            const current = response.current()!;

            const weatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature_2m: current.variables(0)!.value(),
                    relative_humidity_2m: current.variables(1)!.value(),
                    apparent_temperature: current.variables(2)!.value(),
                    is_day: current.variables(3)!.value(),
                    wind_speed_10m: current.variables(4)!.value(),
                    wind_direction_10m: current.variables(5)!.value(),
                    precipitation: current.variables(6)!.value(),
                    rain: current.variables(7)!.value(),
                    showers: current.variables(8)!.value(),
                    snowfall: current.variables(9)!.value(),
                    weather_code: current.variables(10)!.value(),
                    cloud_cover: current.variables(11)!.value(),
                    pressure_msl: current.variables(12)!.value(),
                },
            };
            //@ts-ignore
            data[`${coors.lats[index]}-${coors.longs[index]}`] = weatherData.current

        }
        if (Object.values(data).length > 0) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    data,
                    timestamp: Date.now()
                })
            )
        }
        return data
    } catch (e) {
        return null
    }
}



