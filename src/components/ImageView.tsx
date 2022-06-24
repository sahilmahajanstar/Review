import React, { useCallback } from 'react'

import { Images } from '../config/redux/image'
import { url } from '../constants'

interface Props {
  src: Images
  setSelectedImage: (info: Images) => void
}


export default function ImageView(props: Props) {
  const selectImage = useCallback(()=> {
    props.setSelectedImage(props.src)
  },[props])
  const src = props.src
  
  console.log(url + '/' + src?.folder + '/' + src?.name);
  return (
    <div onClick={selectImage} style={{ marginRight: 10, marginLeft: 10, marginTop: 10 }}>
      <img
        src={url + '/' + src.folder + '/' + src.name}
        alt="alt"
        width={250}
        height={200}
        style={{ cursor: 'pointer' }}
      />
      <h6 style={{ margin: 0 }}>Lat: {props.src.geoPos.lat}</h6>
      <h6 style={{ margin: 0 }}>Long: {props.src.geoPos.long}</h6>
    </div>
  )
}
