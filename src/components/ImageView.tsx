import React, { useCallback } from 'react'

interface Props {
  src: string
  setSelectedImage: (info: string) => void
}


export default function ImageView(props: Props) {
  const selectImage = useCallback(()=> {
    props.setSelectedImage(props.src)
  },[props])
  return (
    <div onClick={selectImage} style={{ marginRight: 10, marginLeft: 10, marginTop: 10 }}>
      <img
        src={props.src}
        alt="alt"
        width={200}
        height={150}
        style={{ cursor: 'pointer' }}
      />
      <h6 style={{ margin: 0 }}>Lat: 35.9 long:15.88 </h6>
    </div>
  )
}
