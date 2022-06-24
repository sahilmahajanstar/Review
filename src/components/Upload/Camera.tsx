import '../../App.css'

import React, { useCallback, useRef } from 'react'

import Webcam from 'react-webcam'
import { useCamera } from '../../hooks/useCamera'

const videoConstraints = {
  width: 360,
  height: 360,
  facingMode: 'user',
}

interface Props {
  addImage: (images: any[]) => void
}

const WebcamCapture: React.FC<Props> = (props) => {
  const webcamRef = useRef<Webcam>(null)
  const camera = useCamera()
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getCanvas()
    imageSrc?.toBlob((blob) => {
      const file = new File([blob as BlobPart], `${new Date()}.jpeg`)
      props.addImage([file])
    })

    // new File(imageSrc, `${new Date()}.jpeg`)
  }, [props])
  if (!camera) return null
  return (
    <div style={{width:360, height: 360, position:'relative',marginTop:10}}>
      <Webcam
        audio={false}
        height={360}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={360}
        videoConstraints={videoConstraints}
      />
      <br />
      <button className="btn" style={{position:'absolute', bottom:'10px', left:'35%'  }} onClick={capture}>
        Capture photo
      </button>
    </div>
  )
}

export default React.memo(WebcamCapture)
