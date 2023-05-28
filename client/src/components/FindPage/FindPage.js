import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../Navbar/Navbar';
import {Form, Button} from 'react-bootstrap';
import './FindPage.css';
import axios from 'axios';
axios.withCredentials = true;


function FileUpload({onImageUpload}) {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const updatedImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...acceptedFiles, ...prevImages]);
    onImageUpload(updatedImages);
  }, [onImageUpload]);

  const onDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index,1);
    setImages(updatedImages);
    onImageUpload(updatedImages);
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
    const [images, setImages] = useState([]);
    const [title,setTitle] = useState('');
    const [capacity, setCapacity] = useState('');
    const [date, setDate] = useState('');
    const [going, setGoing] = useState('');
    const [coming, setComing] = useState('');

    const handleImageUpload = (selectedImages) => {
        setImages(selectedImages);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        var string_date = date.toString();
        var string_going_date = going.toString();
        var string_coming_date = coming.toString();
        formData.append('title', title);
        formData.append('capacity',capacity);
        formData.append('date',string_date);
        formData.append('goingDate',string_going_date);
        formData.append('comingDate',string_coming_date);

        images.forEach((image, index) => {
            formData.append(`image${index}`,image);
        })

         for(const entry of formData.entries()){
                        const [key,value] = entry;
                        console.log(`Key: ${key}, Value: ${value}`);
                    }

        axios.post('https://localhost:8080/api/find',formData,{
            withCredentials: true
        })
        .then((response) => {
            console.log(response);
            console.log(formData);

        });
    };

    return (
        <div className="Structure">
          <Navbar />
          <div className="Find">
          <h2>동행자 찾기</h2>
           <br />
           <h4>사진 업로드</h4>
           <FileUpload onImageUpload = {handleImageUpload} />
           {console.log(images)}
           <Form onSubmit={handleSubmit}>
           <Form.Group controlId="formTitle">
           <Form.Label>제목</Form.Label>
           <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
           </Form.Group>
           <Form.Group controlId="formCapacity">
           <Form.Label>모집인원</Form.Label>
           <Form.Control type="number" onChange={(e) => setCapacity(e.target.value)} />
           </Form.Group>
           <Form.Group controlId="formDate">
           <Form.Label>마감날짜</Form.Label>
           <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
           </Form.Group>
           <Form.Group controlId="formItinerary">
           <Form.Label>여행일정</Form.Label>
           <h5>가는 날</h5><Form.Control type="date" onChange={(e) => setGoing(e.target.value)} />
           <h5>오는 날</h5><Form.Control type="date" onChange={(e) => setComing(e.target.value)} />
           </Form.Group>

           <Button variant="primary" type="submit">
            제출
           </Button>
           </Form>



          </div>
        </div>
    )
}

export default FindPage;