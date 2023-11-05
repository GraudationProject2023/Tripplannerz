import React, { useEffect, useRef } from 'react';

const { kakao } = window;

function KakaoMap({ width = '400px', height = '400px', searchKeyword }) {
  const container = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const disPlayMarker = (map, place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.place_y, place.place_x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    };

    const searchPlaces = (map, keyword) => {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            disPlayMarker(map, data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      });
    };

    const initializeMap = (latitude, longitude) => {
      const defaultOptions = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };


      const options = searchKeyword
        ? {
            ...defaultOptions,
          }
        : defaultOptions;


      map.current = new kakao.maps.Map(container.current, options);

    
      if (searchKeyword) {
        searchPlaces(map.current, searchKeyword);
      }
    };


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

    return () => {
    };
  }, [searchKeyword]);

  return (
    <div
      ref={container}
      style={{
        width: width,
        height: height,
        borderRadius: '10px',
        border: '2px solid skyblue',
      }}
    ></div>
  );
}

export default KakaoMap;
