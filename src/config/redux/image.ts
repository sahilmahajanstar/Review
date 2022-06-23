import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Permission {
  location: boolean
  camera: boolean
}
interface State {
  permission: Permission
  currentLocation?: GeolocationPosition
  images: string[]
}

const initialState: State = {
  permission: {
    location: false,
    camera: false,
  },
  images: [
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
    
  ]
}

const slice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    setPermission: (
      state: State,
      action: PayloadAction<{ key: keyof Permission; val: boolean }>
    ) => {
      const data = action.payload
      state.permission[data.key] = data.val
    },
    setCurrentLocation: (
      state: State,
      action: PayloadAction<GeolocationPosition>
    ) => {
      const data = action.payload
      const locationPermission = state.permission.location
      if (!locationPermission) state.permission.location = true
      state.currentLocation = data
    },
    setImages: (
      state: State,
      action: PayloadAction<string[]>
    ) => {
      state.images = state.images.concat(action.payload)
    },
  },
})

export const imageReducerAction = slice.actions
export default slice.reducer
