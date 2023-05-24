import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../Navbar/Navbar';
import './FindPage.css';


function FileUpload(props) {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...acceptedFiles, ...prevImages]);
  }, []);

  const onDelete = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dropzoneStyle = {
    width: '300px',
    height: '200px',
    border: '2px dashed #ccc',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const imageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    marginRight: '10px',
    marginLeft: '180px',
  };

  const buttonStyle = {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '50px',
    height: '45px',
    borderRadius: '4px',
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: '22px',
    lineHeight: '18.75px',
    color: '#FFFFFF',
    backgroundColor: '#AA0140',
    borderWidth: '0',
    lineHeight: '26px',
    marginLeft: '120px',
    marginTop: '-155px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {images.map((image, index) => (
                  <div key={index} style={imageContainerStyle}>
                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} style={imageStyle} />
                    <button style={buttonStyle} onClick={() => onDelete(index)}>
                      X
                    </button>
                  </div>
                ))}
      </div>

    </div>
  );
}

function FindPage(){

    return (
        <div className="Structure">
          <Navbar />
          <div className="Find">
          <h2>동행자 찾기</h2>
           <br />
           <FileUpload />
          </div>
        </div>
    )
}

export default FindPage;