import './App.css'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './config/redux/hooks'

import Gallery from './components/Gallery'
import Upload from './components/Upload/Upload'
import { imageReducerAction } from './config/redux'
import { useLocation } from './hooks/useLocation'

function App() {
  const dispatch = useAppDispatch()
  const [location] = useLocation()
  useEffect(() => {
    if (location.status && location.geoPosition)
      dispatch(imageReducerAction.setCurrentLocation(location.geoPosition))
    else {
      dispatch(
        imageReducerAction.setPermission({ key: 'location', val: false })
      )
    }
  }, [dispatch, location])

  return (
    <div className="App">
      <Upload />
      <Gallery />
    </div>
  )
}

export default App
