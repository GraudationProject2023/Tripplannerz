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

        //카테고리
        const [selectedMainCategory, setSelectedMainCategory] = useState('');
        const [selectedCategory, setSelectedCategory] = useState('');
        const [selectedSubCategory, setSelectedSubCategory] = useState('');

        const mainCategories = ['특별시/도','광역시','도'];

        const categories = {
         '특별시/도' :['서울','세종','제주'],
         '광역시':['인천','대전','대구','광주','울산','부산'],
         '도':['경기','강원','충북','충남','전북','전남','경북','경남']
        }

        const subCategories = {
                '서울' : ['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
                '인천' : ['계양구','남동구','동구','미추홀구','부평구','서구','연수구','중구','강화군','옹진군'],
                '세종' : ['세종'],
                '대전' : ['대덕구','동구','서구','유성구','중구'],
                '대구' : ['남구','동구','달서구','북구','서구','수성구','중구','달성군'],
                '광주' : ['광산구','남구','동구','북구','서구'],
                '울산' : ['남구','동구','북구','중구','울주군'],
                '부산' : ['강서구','금정구','남구','동구','동래구','북구','부산진구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구','기장군'],
                '제주' : ['제주','서귀포']
            };
            const handleMainCategoryChange = (category) => {
                if(selectedMainCategory === category){
                    setSelectedMainCategory('');
                    setSelectedCategory('');
                }
                else {
                    setSelectedMainCategory(category);
                    setSelectedCategory('');
                }
            }

            const handleCategoryChange = (category) => {
              if(selectedCategory === category){
                setSelectedCategory('');
                setSelectedSubCategory('');
              }
              else{
                setSelectedCategory(category);
                setSelectedSubCategory('');
            }
            }

            const handleSubCategoryChange = (subCategory) => {
                setSelectedSubCategory(subCategory);
            };



        return (
            <div className="Structure">
              <Navbar />
              <div className="Find">
              <div className="Title">
              <h2>동행자 모집하기</h2>
              </div>
               <br />
              <Form style={{ marginLeft: "10%" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ width: "100px" }}>
                          {mainCategories.map((category) => (
                            <div
                              key={category}
                              style={{
                                marginRight: '10px',
                                padding: '5px',
                                border: '1px solid #ccc',
                                cursor: 'pointer'
                              }}
                              onClick={() => handleMainCategoryChange(category)}
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div style={{ width: "100px" }}>
                          {selectedMainCategory && (
                            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                              {categories[selectedMainCategory].map((category) => (
                                <div
                                  key={category}
                                  style={{
                                    width: '80px',
                                    marginRight: '10px',
                                    padding: '5px',
                                    border: '1px solid #ccc',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleCategoryChange(category)}
                                >
                                  {category}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ width: "300px" }}>
                          {selectedCategory && (
                            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                              {subCategories[selectedCategory].map((subCategory) => (
                                <div
                                  key={subCategory}
                                  style={{
                                    width: '80px',
                                    marginRight: '10px',
                                    padding: '5px',
                                    border: '1px solid #ccc',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleSubCategoryChange(subCategory)}
                                >
                                  {subCategory}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
                <hr />
                <div className="image-title">
               <h4>사진 업로드</h4>
               <FileUpload onImageUpload = {handleImageUpload} />
               {console.log(images)}
               </div>
               <Form onSubmit={handleSubmit}>
               <div className="form-Title">
               <Form.Group controlId="formTitle">
               <Form.Label>제목</Form.Label>
               <Form.Control style={{width:"300px"}} type="text" onChange={(e) => setTitle(e.target.value)} />
               </Form.Group>
               </div>
               <div className="form-Number">
               <Form.Group controlId="formCapacity">
               <Form.Label>모집인원</Form.Label>
               <Form.Control style={{width:"300px"}} type="number" onChange={(e) => setCapacity(e.target.value)} />
               </Form.Group>
               </div>
               <div className="form-Date">
               <Form.Group controlId="formDate">
               <Form.Label>마감날짜</Form.Label>
               <Form.Control style={{width:"300px"}} type="date" onChange={(e) => setDate(e.target.value)} />
               </Form.Group>
               </div>
               <div className = "form-Itinerary">
               <Form.Group controlId="formItinerary">
               <Form.Label>가는 날</Form.Label>
               <Form.Control style={{width: "300px"}} type="date" onChange={(e) => setGoing(e.target.value)} />
                <br />
               <Form.Label>오는 날</Form.Label>
               <Form.Control style={{width: "300px"}} type="date" onChange={(e) => setComing(e.target.value)} />

               </Form.Group>
               </div>
                <hr />
               <Button style={{width: "200px",marginLeft: "45%"}} variant="primary" type="submit">
                제출
               </Button>
               </Form>



              </div>
            </div>
        )
}

export default FindPage;