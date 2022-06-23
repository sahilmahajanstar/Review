import './upload.css'

import { useCallback, useState } from 'react'

import Camera from './Camera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Preview from './Preview'
import React from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from '../../config/redux/hooks'

export default function Upload() {
  const [images, setImages] = useState<any>([])
  const coordinate = useAppSelector(
    (state) => state.image.currentLocation?.coords
  )
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
    xhr.open('post', 'http://localhost:5000/upload')
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.send(form)
    xhr.onload = function (e: any) {
      if(e.currentTarget.status === 200) {
        const response = JSON.parse(e.currentTarget.response)   
        if(response.status === 'success') {
          setImages([])
          alert(response.data.message)
        } else {
          console.log(response);
          alert(response.data.message)
        }
      }
    }
  }, [coordinate?.latitude, coordinate?.longitude, images])

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
        Upload
      </button>
    </React.Fragment>
  )
}
