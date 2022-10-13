import { useEffect, useState } from "react"
import type { Location } from 'types/hooks.type'

const useLocation = () => {
  const [location, setLocation] = useState<Location | string>('')

  const onSuccess = ({ coords }: GeolocationPosition) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  const onError = ({ message }: GeolocationPositionError) => {
    setLocation(message)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess,onError)
  }, [])

  return location
}

export default useLocation
