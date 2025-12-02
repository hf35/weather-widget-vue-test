

export const getDefaultLocation = async () => {
    try {
        const pos: { coords: any } = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return { ok: true, coords: pos.coords }
    } catch (err: any) {
        let errorMsg
        if (err.code === err.PERMISSION_DENIED) {
            errorMsg = "User denied access to geolocation"
        } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMsg = "Geolocation is unavailible"
        } else if (err.code === err.TIMEOUT) {
            errorMsg = "Timeout error"
        } else {
            errorMsg = ""
        }
        return { ok: false, errorMsg }
    }
}