// @ts-nocheck

import React, { useCallback, useState } from 'react'

import ImageView from './ImageView'
import Modal from 'react-modal'
import { useAppSelector } from '../config/redux/hooks'

//@ts-ignore




interface Props {
  isOpen: boolean
  onClose?: () => boolean
  src: string
}
function LargeView(props: Props) {
  const { isOpen, onClose, src } = props
  return (
    //@ts-ignore
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Image">
      <button style={{position:'absolute', top: 15, right:15  }} onClick={onClose}>
        close
      </button>
      <img
        src={src}
        alt="alt"
        width={900}
        height={600}
      />
    </Modal>
  )
}

export default function Gallery() {
  const images = useAppSelector((state) => state.image.images)
  const [selectedImage, setSelectedImage] = useState('')
  const [modal, setModal] = useState(false)
  const onClose = useCallback(()=> {
    setModal(false)
  }, [])
  const selectedImageCallback = useCallback((info: string)=> {
    setSelectedImage(info)
    setModal(true)
  },[])
  return (
    <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
      <LargeView src={selectedImage} isOpen={modal}  onClose={onClose} />
      {images.map((val, index) => (
        <ImageView setSelectedImage={selectedImageCallback} src={val} key={index} />
      ))}
    </div>
  )
}
