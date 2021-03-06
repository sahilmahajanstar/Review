import './upload.css'

import { useAppDispatch, useAppSelector } from '../../config/redux/hooks'
import { useCallback, useState } from 'react'

import Camera from './Camera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Preview from './Preview'
import React from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { imageReducerAction } from '../../config/redux'
import { url } from '../../constants'

export default function Upload() {
  const [images, setImages] = useState<any>([])
  const [uploading, setUploading] = useState<any>(false)
  const coordinate = useAppSelector(
    (state) => state.image.currentLocation?.coords
  )
  const dispatch = useAppDispatch()
  const onUpload = useCallback(async () => {
    const form = new FormData()
    for (let i = 0; i < images.length; i++) {
      form.append('images', images[i])
    }
    form.set(
      'geoPos',
      JSON.stringify({ lat: coordinate?.latitude, long: coordinate?.longitude })
    )
    var xhr = new XMLHttpRequest()
    xhr.open('post', `${url}/upload`)
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://main--transcendent-mooncake-b69ba6.netlify.app')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(form)
    setUploading(true);
    xhr.onload = function (e: any) {
      if (e.currentTarget.status === 200) {
        const response = JSON.parse(e.currentTarget.response)
        if (response.status === 'success') {
          setImages([])
          setUploading(false)
          var xhrImg = new XMLHttpRequest()
          xhrImg.open('get', `${url}/read`)
          xhrImg.send()
          xhrImg.onload = function (e: any) {
            if (e.currentTarget.status === 200) {
              const response = JSON.parse(e.currentTarget.response)
              dispatch(imageReducerAction.setImages(response.data))
            }
          }
          alert(response.data.message)
        } else {
          console.log(response)
          alert(response.data.message)
        }
      }
    }
  }, [coordinate?.latitude, coordinate?.longitude, dispatch, images])

  const addImage = useCallback(
    (newImages: any[]) => {
      setImages(images.concat(newImages))
    },
    [images]
  )

  const onChange = useCallback(() => {
    const form = document.getElementById('form') as HTMLFormElement
    const formData = new FormData(form)
    const newImages = formData.getAll('images')
    console.log(newImages)

    addImage(newImages)
  }, [addImage])

  const onclick = useCallback((e: any) => {
    e.currentTarget.value = ''
  }, [])

  const onSubmit = useCallback((e: any) => {
    e.preventDefault()
  }, [])

  return (
    <React.Fragment>
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'center',
        }}
      >
        <form id="form" className="form" onSubmit={onSubmit}>
          <div>
            <input
              type="file"
              alt="noImage"
              id="images"
              name="images"
              onClick={onclick}
              onChange={onChange}
              accept=".jpg, .jpeg, .png"
              multiple={true}
            />
            <label htmlFor="images">
              <div className="uploadImage">
                <FontAwesomeIcon icon={faUpload} />
                <h6>Select Images</h6>
              </div>
            </label>
            <Camera addImage={addImage} />
          </div>
        </form>
        <Preview images={images} />
      </div>
      <button
        disabled={uploading}
        className="btn"
        style={{
          width: 'fit-content',
          alignSelf: 'center',
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 10,
        }}
        onClick={onUpload}
      >
        {uploading ? 'uploading' : 'upload'}
      </button>
    </React.Fragment>
  )
}
