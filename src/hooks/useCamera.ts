import { useCallback, useEffect, useState } from 'react'

export function useCamera() {
  const [camera, setCamera] = useState(false)

  const getCamera = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
    } catch (err) {
      setCamera(false)
    }
  }, [])

  const handleCamera = useCallback(
    (permission: PermissionStatus) => {
      switch (permission.state) {
        case 'granted':
          setCamera(true)
          break
        case 'denied':
          setCamera(false)
          break
        default:
          getCamera()
      }
    },
    [getCamera]
  )

  useEffect(() => {
    const func = async () => {
      const cameraPermission = await navigator.permissions.query({
        //@ts-ignore
        name: 'camera',
      })
      handleCamera(cameraPermission)
      cameraPermission.onchange = (permissions) => {
        const permissionStatus = permissions.currentTarget as PermissionStatus
        handleCamera(permissionStatus)
      }
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return camera
}
