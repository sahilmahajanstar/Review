// @ts-nocheck

import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../config/redux/hooks'

import ImageView from './ImageView'
import Modal from 'react-modal'
import { imageReducerAction } from '../config/redux'
import { url } from '../constants'

//@ts-ignore

interface Props {
  isOpen: boolean
  onClose?: () => boolean
  src: Image
}
function LargeView(props: Props) {
  const { isOpen, onClose, src } = props
  return (
    //@ts-ignore
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Image">
      <button
        style={{ position: 'absolute', top: 15, right: 15 }}
        onClick={onClose}
      >
        close
      </button>
      <img
        src={url + '/' + src?.folder + '/' + src?.name}
        alt="alt"
        width={600}
        height={400}
      />
      
      <h6 style={{ margin: 0 }}>Lat: {src?.geoPos.lat}</h6>
      <h6 style={{ margin: 0 }}>Long: {src?.geoPos.long}</h6>
    </Modal>
  )
}

export default function Gallery() {
  const images = useAppSelector((state) => state.image.images)
  const dispatch = useAppDispatch()
  const [selectedImage, setSelectedImage] = useState(null)
  const [modal, setModal] = useState(false)
  const onClose = useCallback(() => {
    setModal(false)
  }, [])

  useEffect(() => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', `${url}/read`)
    xhr.send()
    xhr.onload = function (e: any) {
      if (e.currentTarget.status === 200) {
        const response = JSON.parse(e.currentTarget.response)
        dispatch(imageReducerAction.setImages(response.data))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedImageCallback = useCallback((info: string) => {
    setSelectedImage(info)
    setModal(true)
  }, [])
  return (
    <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
      <LargeView src={selectedImage} isOpen={modal} onClose={onClose} />
      {images.map((val, index) => (
        <ImageView
          setSelectedImage={selectedImageCallback}
          src={val}
          key={index}
        />
      ))}
    </div>
  )
}
