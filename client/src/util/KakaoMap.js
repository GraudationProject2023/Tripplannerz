import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';

const { kakao } = window;

export const kakaoSearchPlace = (keyword) => {
  const ps = kakao.maps.services.Places()
}

function KakaoMap({ width = '400px', height = '400px', searchKeyword }) {
  const container = useRef(null);
  const map = useRef(null);

  const [markers, setMarkers] = useState([])

  useEffect(() => {

    // 검색어를 적용한 Kakao Map 생성
    const initializeMap = (latitude, longitude) => {
      const defaultOptions = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const options = searchKeyword ? {...defaultOptions,} : defaultOptions;
      map.current = new kakao.maps.Map(container.current, options);
      if (searchKeyword) {
        searchPlaces(map.current, searchKeyword);
      }
    };

    // 초기에 GPS를 이용한 렌더링 
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        initializeMap(latitude, longitude);
      },
      (error) => {
        console.error('Error getting geolocation:', error);
        // 기본 위치(서울)로 초기화
        initializeMap(37.552635722509, 126.92436042413);
      }
    );
    } else {
      console.error('Geolocation is not supported in this browser');
      // 기본 위치(서울)로 초기화
      initializeMap(37.552635722509, 126.92436042413);
    }

    
    // 검색어를 적용하는 함수
    const searchPlaces = (map, keyword) => {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(keyword, 
        (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let searchMarkers = []

          for (let i = 0; i < data.length; i++) {
            disPlayMarker(map, data[i]);
            searchMarkers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x
              },
              content: data[i].place_name
            })
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          setMarkers(searchMarkers)

          map.setBounds(bounds);
        }
      });
    };

    // 검색어 입력 시, Marker 표출
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const disPlayMarker = (map, place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });

      const latitudeList = [];
      latitudeList.push(place.x, place.y);

      localStorage.setItem('latitude', latitudeList);
    };


  }, [searchKeyword]);

  return (
    <div>
      <div
      ref={container}
      style={{
        width: width,
        height: height,
        borderRadius: '10px',
        border: '2px solid skyblue',
      }}
    >
    </div>
      <div>
      {markers ? (
        <Table
          dataSource={markers.slice(0, 5)}
          columns={[
          {
            title: '여행하실 장소들',
            dataIndex: 'content',
            key: 'content',
            render: (text) => (
              <h6 style={{ margin: '0', fontSize: '20px', color: '#333' }}>{text}</h6>
            ),
          },
          ]}
          pagination={false}
        />
      ) : "검색어를 입력해주세요"}
    </div>
    </div>
  );
}

export default KakaoMap;
