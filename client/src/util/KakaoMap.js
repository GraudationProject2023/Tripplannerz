import React, {useEffect} from 'react';

const {kakao} = window;

function KakaoMap({width = '400px', height = '400px'}){

    useEffect(() => {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.552635722509, 126.92436042413),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);
    },[])

    return (
        <div id="map" style={{
              width: width,
              height: height,
              borderRadius: '10px',
              border: '2px solid skyblue'
        }}></div>
    )
}

export default KakaoMap;