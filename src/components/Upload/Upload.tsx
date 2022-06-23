import './upload.css'

import { FormEvent, useCallback, useState } from 'react'

import Camera from './Camera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Preview from './Preview'
import React from 'react'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

export default function Upload() {
  const [images, setImages] = useState<any>([])
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }, [])

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

  return (
    <React.Fragment>
      <div style={{flexWrap:'wrap', display: 'flex', flexDirection: 'row', alignSelf:'center' }}>
        <form id="form" onSubmit={onSubmit} className="form">
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
          paddingRight:20,
          paddingLeft:20,
          marginTop: 10
        }}
      >
        Upload
      </button>
    </React.Fragment>
  )
}
