import React,{useState,useCallback} from 'react';
import Navbar from '../Navbar/Navbar';
import {useDropzone} from "react-dropzone";
import './FindPage.css';

function FileUpload(props)
{
    const [Images, setImages] = useState([])

    const onDrop = useCallback((acceptedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);

    },[]);

    const onDelete = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index,1);
            return updatedImages;
        });

    };

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const buttonstyle={
        'box-sizing':"boreder-box",
            'display': "flex",
            'justify-content':"center",
            'align-items': "center",
            'gap':"10px",
            'width':"165px",
            'height':"45px",
            'borderRadius': "4px",
            'font-family': "Roboto",
            'font-weight': 700,
            'font-size': "22px",
            'line-height': "18.75px",
            'color': "#FFFFFF",
            'background-color':"#AA0140",
            'border-width':"0",
            'line-height': "26px"

    };
    return(
        <div style={{display:'flex'}}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>이미지를 드래그하거나 클릭하여 업로드합니다.</p>
            </div>
            <div style={{display:'flex', width: '350px', height:'459px', overflowX: 'scroll' }}>
                {Images.map((image,index)=> (
                    <div key={index}>
                        <img style={{minWidth: '300px', width: '300px', height: '240px'}}
                         src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                         <button onClick={() => onDelete(index)}>삭제</button>
                    </div>
                ))}
            </div>

        </div>
    )
}




function FindPage(){

    return (
        <div className="Structure">
          <Navbar />
          <div className="Find">
          <h2>동행자 찾기</h2>
           <FileUpload />
          </div>
        </div>
    )
}

export default FindPage;