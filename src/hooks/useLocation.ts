import { useCallback, useEffect, useState } from 'react'

interface State {
  status: boolean
  geoPosition?: GeolocationPosition
}

export function useLocation(): [State] {
  const [location, setLocation] = useState<State>({
    status: false,
    geoPosition: undefined,
  })

  const onLocationChange = useCallback((pos: GeolocationPosition) => {
    setLocation({ status: true, geoPosition: pos })
  }, [])

  const getLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(onLocationChange)
  }, [onLocationChange])

  const handleGeoLocation = useCallback(
    (permissions: PermissionStatus) => {
      switch (permissions.state) {
        case 'denied':
          setLocation({ status: false, geoPosition: undefined })
          break
        case 'granted':
          getLocation()
          break
        default:
          getLocation()
      }
    },
    [getLocation]
  )

  useEffect(() => {
    const callback = async () => {
      const geolocation = await navigator.permissions.query({
        name: 'geolocation',
      })
      handleGeoLocation(geolocation)
      geolocation.onchange = (e) => {
        const permissionStatus = e.currentTarget as PermissionStatus
        handleGeoLocation(permissionStatus)
      }
    }
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [location]
}
