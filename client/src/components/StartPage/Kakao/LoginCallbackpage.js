import React,{useState,useEffect} from 'react';
import {KAKAO_AUTH_URL,REST_API_KEY,REDIRECT_URI, SECRET} from './KakaoData';
import axios from 'axios';

function LoginCallbackpage(){

    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');

    useEffect(() => {
        console.log(code);
    })

    const getKakaoTokenHandler = async(code)=>{
        const data = {
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: SECRET
        };

        const queryString = Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');
        axios.post(`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`, queryString, {
            headers:{
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((res) => {
            console.log(res);
        });
    }

    useEffect(() => {
        var accessToken = code;
        var kakao = 'kakao';
        console.log(accessToken);
        const data = {
            accessToken: accessToken,
            vendor: kakao
        };

        getKakaoTokenHandler(accessToken);

        axios.post('http://localhost:8080/user/login',data,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>console.log(response))
        .catch(error=>console.log(error));

    },[])

    return(
        <div>
            <h2>카카오 로그인 성공</h2>
        </div>
    )

}
   

export default LoginCallbackpage;