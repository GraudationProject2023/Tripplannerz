import React, {useState, useEffect} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker,{ Calendar } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from '../Navbar/Navbar';
import Image from '../Image/새일정페이지 1.png';
import {Button, Form} from 'react-bootstrap';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Autocomplete = ({items}) => {
   const [inputValue, setInputValue] = useState('');
   const [suggestions, setSuggestions] = useState([]);

   const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      if(value.length > 0) {
         const filteredItems = items.filter((item) => 
           item.toLowerCase().startsWith(value.toLowerCase())
         );
         setSuggestions(filteredItems);

      } else {
         setSuggestions([]);
      }
   };

   const handleSelectSuggestion = (value) => {
      setInputValue(value);
      setSuggestions([]);
   };

   return (
      <div>
         <input type="text" value={inputValue} onChange={handleInputChange} placeholder = "Type member name" />
          {suggestions.length > 0 && (
            <ul>
               {suggestions.map((suggestion) => (
                  <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}
                  >
                     {suggestion}
                  </li>
               ))}
            </ul>
          )}
      </div>
   )
}

function InitPage(){

   useEffect(() => {
     localStorage.setItem("vest",1);
   },[])

   const [title, setTitle] = useState("");
   const [context, setContext] = useState("");
   const [currentMonth, setCurrentMonth] = useState(new Date(moment().startOf('day')));
   const [nextMonth, setNextMonth] = useState(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() +1 , 1)
   );

   const [modalVisible, setModalVisible] = useState(false);
   const members = ['John','Jane','Jacob','Josh','Jessie'];
   
   const openModal = () => {
      setModalVisible(true);
   }

   const closeModal = () => {
      setModalVisible(false);
   }

   const handleTitle = (title) => {
     setTitle(title.target.value);
   }

   const handleContext = (context) => {
     setContext(context.target.value);
   }

   const handleCurrentMonthChange = (date) => {
      setCurrentMonth(date);
   }

   const handleNextMonthChange = (date) => {
      setNextMonth(date);
   }

   const disabledNextMonthDates = (date) => {
      return  date > new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() -1 );
   };

   const handleSubmit = (event) => {
    event.preventDefault();

    const nextDay = moment(currentMonth).add(1,'day');
    const nextMonth = moment(currentMonth).add(1,'month');

    const start = new Date(nextDay);
    const startdate = start.toISOString().slice(0,10);

    const end = new Date(nextMonth);
    const enddate = end.toISOString().slice(0,10);

    const diff = (end - start)/(1000*60*60*24);
    const realDays = String(diff);

    var data ={
      title: title,
      content: context,
      startingdate: startdate,
      period: realDays
    };
    if(!title || !context || !currentMonth || !nextMonth)
    {
       alert('모든 항목을 입력하세요');
    }
    else {
    axios.post('http://localhost:8080/api/trip/create',data,{
        withCredentials: true
    })
    .then(
      res => {console.log(res);
        alert('일정이 생성되었습니다.');
    })
    .catch(error => console.log(error))
    }
   }

    //카카오지도
    const {kakao} = window;
    useEffect(() => {
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(37.552635722509,126.92436042413),
        level: 4,
    };
    var markers = [];
    var map = new kakao.maps.Map(mapContainer, mapOption);
//    var ps = new kakao.maps.services.Places();
//    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
//
//    function displayPlaces(places){
//       var listEl = document.getElementById('placesList');
//       var menuEl = document.getElementById('menu_wrap');
//       var fragment = document.createDocumentFragment();
//       var bounds = new kakao.maps.LatLngBounds();
//       var listStr = '';
//
//       removeAllChildNods(listEl);
//       removeMarker();
//
//       for(var i = 0; i<places.length; i++)
//       {
//          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
//          var marker = addMarker(placePosition, i);
//          var itemEl = getListItem(i,places[i]);
//          bounds.extend(placePosition);
//
//          (function(marker,title){
//             kakao.maps.event.addListener(marker, 'mouseover', function(){
//                displayInfowindow(marker,title);
//             });
//
//             itemEl.onmouseover = function() {
//                displayInfowindow(marker, title);
//             };
//
//             itemEl.onmouseout = function(){
//                infowindow.close();
//             };
//          })(marker,places[i].place_name);
//
//          fragment.appendChild(itemEl);
//       }
//       listEl.appendChild(fragment);
//       menuEl.scrollTop = 0;
//
//       map.setBounds(bounds);
//    }
//    function getListItem(index,places){
//         var el = document.createElement('li'),
//            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
//                        '<div class="info">' +
//                        '   <h5>' + places.place_name + '</h5>';
//
//            if (places.road_address_name) {
//                itemStr += '    <span>' + places.road_address_name + '</span>' +
//                            '   <span class="jibun gray">' +  places.address_name  + '</span>';
//            } else {
//                itemStr += '    <span>' +  places.address_name  + '</span>';
//            }
//
//              itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//                        '</div>';
//
//            el.innerHTML = itemStr;
//            el.className = 'item';
//
//            return el;
//    }
//
//    function placesSearchCB(data, status, pagination){
//        if(status === kakao.maps.services.Status.OK){
//            displayPlaces(data);
//            displayPagination(pagination);
//        }
//        else if(status === kakao.maps.services.Status.ZERO_RESULT){
//            alert('검색 결과가 존재하지 않습니다.');
//            return;
//        }
//        else if(status === kakao.maps.services.Status.ERROR){
//            alert('검색 결과 중 오류가 발생했습니다.');
//            return;
//        }
//    }
//
//    function searchPlaces(){
//        var keyword = document.getElementById('keyword').value;
//        if(!keyword.replace(/^\s+|\s+$/g, '')){
//          alert('키워드를 입력해주세요!');
//          return false;
//        }
//        ps.keywordSearch(keyword, placesSearchCB);
//    }
//
//    searchPlaces();
//
//    function displayInfowindow(marker, title) {
//        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
//
//        infowindow.setContent(content);
//        infowindow.open(map, marker);
//    }
//
//
//
//    function displayPagination(pagination) {
//        var paginationEl = document.getElementById('pagination'),
//            fragment = document.createDocumentFragment(),
//            i;
//
//        while (paginationEl.hasChildNodes()) {
//            paginationEl.removeChild (paginationEl.lastChild);
//        }
//
//        for (i=1; i<=pagination.last; i++) {
//            var el = document.createElement('a');
//            el.href = "#";
//            el.innerHTML = i;
//
//            if (i===pagination.current) {
//                el.className = 'on';
//            } else {
//                el.onclick = (function(i) {
//                    return function() {
//                        pagination.gotoPage(i);
//                    }
//                })(i);
//            }
//
//            fragment.appendChild(el);
//        }
//        paginationEl.appendChild(fragment);
//    }
//
//    function removeAllChildNods(el) {
//        while (el.hasChildNodes()) {
//            el.removeChild (el.lastChild);
//        }
//    }

    function addMarker(position)
    {
        var marker = new kakao.maps.Marker({
            position: position
        });

        marker.setMap(map);
        markers.push(marker);
    }

    kakao.maps.event.addListener(map, 'click', function(mouseEvent){
        addMarker(mouseEvent.latLng);
    })

    function setMarkers(map){
        for(var i = 0; i < markers.length; i++)
        {
           markers[i].setMap(map);
        }
    }

    function showMarkers(){
        setMarkers(map);
    }

    function hideMarkers(){
        setMarkers(null);
    }
    function removeMarker() {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    },[]);
   return(
      <div>
        <NavBar />
        <img src={Image} alt="새일정페이지" style={{width:"100%", height:"1000px", marginTop:"-300px"}} />
        <div style={{marginTop:"5%", border:"1px solid black", borderWidth:"5px"}}>
          <Form style={{marginLeft:"30%"}}>
           {/* <table>
            <td><Form.Label style={{fontSize:"20px"}}>팀 이름  &nbsp; &nbsp; </Form.Label></td>
            <td style={{padding:"10px"}}><Form.Control type="text" id="Team" placeholder="팀 이름을 입력하세요." style={{width: "430px"}} />
            </td>
            </table> */}
          </Form>
            <Form style={{marginLeft:"10%"}}>
                   <table>
                   <td>
                   <Form.Label style={{fontSize:"20px"}}>일정 날짜 &nbsp; &nbsp;</Form.Label>
                      </td>
                      <td>
                      <table>
                      <td>
                      <h5>가는 날 </h5>
                      <DatePicker
                         selected={currentMonth}
                         onChange={handleCurrentMonthChange}
                         placeholderText='가는 날 선택'
                         popperPlacement='bottom-start'
                      />
                      </td>
                      <td style={{padding:"50px"}}>
                      <h5>오는 날</h5>
                      <DatePicker
                         selected={nextMonth}
                         filterDate={disabledNextMonthDates}
                         onChange ={handleNextMonthChange}
                         placeholderText='오는 날 선택'
                         popperPlacement='bottom-start'
                      />
                      </td>
                   </table>
                   </td>
                   </table>
                </Form>
                 <Form style={{marginLeft:"10%"}}>
                 <table>
                    <td>
                    <Form.Label style={{fontSize:"20px"}}>일정 제목 &nbsp;</Form.Label>
                    </td>
                    <td>
                    <Form.Control type="text"  onChange={handleTitle} placeholder="일정의 제목을 입력해주세요." style={{width:"430px"}} />
                    </td>
                 </table>
                 </Form>
                 <Form style={{marginLeft:"10%"}}>
                   <table>
                   <td>
                   <Form.Label style={{fontSize:"20px"}}>일정 내용 &nbsp;</Form.Label>
                   </td>
                   <td>
                   <textarea class="form-control"  onChange={handleContext} placeholder ="일정 내용을 입력해주세요." style={{width:"430px", height:"200px"}} />
                   </td>
                   </table>
                 </Form>
                  <div class="map_wrap">
                     <div id="map" style={{marginLeft:"50%",marginTop:"-25%",width:"600px",height:"350px"}}>
                     </div>
                     <div id="menu_wrap" class="bg_white">
                        <div class="option">
                           <div>
                              <form onsubmit="searchPlaces(); return false;">
                                 키워드: <input type="text" value="이태원 맛집" id="keyword" size="15" />
                                 <button type="submit">검색하기</button>
                              </form>
                           </div>
                        </div>
                        <hr />
                        <ul id="placesList"></ul>
                        <div id="pagination"></div>
                     </div>
                  </div>
                   <br/>
                 </div>
                 <br />
                 <Button style={{width:"200px",marginLeft:"43%"}} onClick={handleSubmit}>일정 생성</Button>
        <br />
        <br />
      </div>
   );
}

export default InitPage;
