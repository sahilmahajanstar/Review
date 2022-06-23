import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Permission {
  location: boolean
  camera: boolean
}

export interface Images {
  size: number
  mimeType: string
  name: string
  folder: string
  geoPos: { lat: number; long: number }
}
interface State {
  permission: Permission
  currentLocation?: GeolocationPosition
  images: Images[]
}

const initialState: State = {
  permission: {
    location: false,
    camera: false,
  },
  images: [],
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
    setImages: (state: State, action: PayloadAction<Images[]>) => {
      state.images = action.payload
    },
  },
})

export const imageReducerAction = slice.actions
export default slice.reducer
