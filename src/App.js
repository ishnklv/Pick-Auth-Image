import React from 'react'
import ContentLoader from "react-content-loader";

const App = () => {
    const [file, setFile] = React.useState()
    const [preview, setPreview] = React.useState()
    const inputRef = React.useRef()

    const handleClick = (event) => {
        event.preventDefault()
        inputRef.current.click()
    }
    const handleChange = (event) => {
        const file = event.target.files[0]
        if(file && file.type.substr(0, 5) === "image") {
            setFile(file)
        } else {
            setFile(null)
        }
    }
    React.useEffect(() => {
        if(file) {
            const reader = new FileReader()
            reader.onloadend = event => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }
    }, [file])
  return(
      <div>
          {preview ? (<img style={{objectFit: 'cover'}} src={preview} onClick={() => setFile(null)}/>) :
              (
                  <div className={"circle"} onClick={handleClick}>
                      <i className="fas fa-images gallery"></i>
                      <i className={"fas fa-times remove"}></i>
                  </div>
              )
          }
        <input type={"file"} ref={inputRef} onChange={handleChange} />
      </div>
  )
}

export default App