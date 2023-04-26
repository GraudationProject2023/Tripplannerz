import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import {KAKAO_AUTH_URL, REST_API_KEY,REDIRECT_URI,SECRET} from './KakaoData';
import axios from 'axios';
import Kakaoimage from '../../Image/카카오톡.png';


function Loginpage(props){
    
    const query = queryString.parse(window.location.search);

    useEffect(() => {
        if(query.code){
            getKakaoTokenHandler(query.code.toString());
        }
    }, []);


    const getKakaoTokenHandler = async(code) => {

        const data = {
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri : REDIRECT_URI,
            code: code,
            client_secret: SECRET
        };

        const queryString = Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');

        axios.post(KAKAO_AUTH_URL, queryString, {
            withCredentials: true,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((res) => {
            console.log(res);
            sendKakaoTokenToServer(res.data.access_token)
        });
    }

    const sendKakaoTokenToServer = (token) => {
        axios.post('http://localhost:8080/users/login',{
            accessToken: token,
            vendor: 'kakao',
        })
        .then((res) => {
            const user = res.data.user;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const moving = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
    return(<>
       <div>

         <img className="kakaoimage" alt="Kakaoimage" onClick={moving} style={{marginTop: "65.8px",width:"62.4px", height:"62.4px"}} src={Kakaoimage} />

         <img className="kakaoimage" alt="Kakaoimage" onClick={moving} style={{marginTop: "65.8px", marginLeft: "255px",width:"62.4px", height:"62.4px"}} src={Kakaoimage} />

       </div>
    </>)
}

export default Loginpage;