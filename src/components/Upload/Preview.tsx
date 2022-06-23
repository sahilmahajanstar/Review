import React, { useEffect, useState } from 'react'

interface Props {
  images: string[]
}

function Image(props: { file: any }) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const reader = new FileReader()

    reader.addEventListener('load', (readerEvent) => {
      setUrl(reader.result?.toString() || '')
    })
    reader.readAsDataURL(props.file)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <img
      width={80}
      style={{ marginRight: 10 }}
      height={80}
      src={url}
      alt="alt"
    />
  )
}

function Preview(props: Props) {
  const { images } = props
  if(!images.length) return null
  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          width: 320,
          height: 360,
          overflowY:'scroll',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginLeft: 10,
          marginTop:50,
          flex:1,
          alignContent:'center',
          justifyContent: 'center',
        }}
      >
        {images.map((file) => (
          <Image file={file} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default React.memo(Preview)
