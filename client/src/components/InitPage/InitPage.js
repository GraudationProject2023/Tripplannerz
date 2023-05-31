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
import './InitPage.css';
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
        window.location.href="/main";
    })
    .catch(error => console.log(error))
    }
   }

    //카카오지도
    const {kakao} = window;
    const [area, setArea] = useState("");
    const handleArea = (e) => {
        setArea(e.target.value);
    }
    useEffect(() => {
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(37.552635722509,126.92436042413),
        level: 4,
    };
    var markers = [];
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var ps = new kakao.maps.services.Places();
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    function displayPlaces(places){
       var listEl = document.getElementById('placesList');
       var menuEl = document.getElementById('menu_wrap');
       var fragment = document.createDocumentFragment();
       var bounds = new kakao.maps.LatLngBounds();
       var listStr = '';

       removeAllChildNods(listEl);
       removeMarker();

       for(var i = 0; i<places.length; i++)
       {
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
          var marker = addMarker(placePosition, i);
          var itemEl = getListItem(i,places[i]);
          bounds.extend(placePosition);


          fragment.appendChild(itemEl);
       }
       listEl.appendChild(fragment);
       menuEl.scrollTop = 0;

       map.setBounds(bounds);
    }
    function getListItem(index,places){
         var el = document.createElement('li'),
            itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                        '<div class="info">' +
                        '   <h5>' + places.place_name + '</h5>';

            if (places.road_address_name) {
                itemStr += '    <span>' + places.road_address_name + '</span>' +
                            '   <span class="jibun gray">' +  places.address_name  + '</span>';
            } else {
                itemStr += '    <span>' +  places.address_name  + '</span>';
            }

              itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                        '</div>';

            el.innerHTML = itemStr;
            el.className = 'item';

            return el;
    }

    function placesSearchCB(data, status, pagination){
        if(status === kakao.maps.services.Status.OK){
            displayPlaces(data);
            displayPagination(pagination);
        }
//        else if(status === kakao.maps.services.Status.ZERO_RESULT){
//            alert('검색 결과가 존재하지 않습니다.');
//            return;
//        }
        else if(status === kakao.maps.services.Status.ERROR){
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }

    function searchPlaces(){
        var keyword = document.getElementById('keyword').value;
        if(!keyword.replace(/^\s+|\s+$/g, '')){
          return false;
        }
        ps.keywordSearch(keyword, placesSearchCB);
    }

    searchPlaces();

    function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    }



    function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

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

    },[area]);

    //카테고리
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');


    const categories = ['서울','인천','세종','대전','대구','광주','울산','부산','제주','경기','강원','충북','충남','전북','전남','경북','경남']

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

    const handleCategoryChange = (category) => {
      if(selectedCategory === category){
        setSelectedCategory('');
        setSelectedCategory('');
      }
      else{
        setSelectedCategory(category);
        setSelectedSubCategory('');
    }
    }

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };


   return(
      <div>
        <NavBar />
        <img src={Image} alt="새일정페이지" style={{width:"100%", height:"5%", marginTop:"-15%"}} />
        <div style={{marginTop:"5%"}}>
            <Form style={{marginLeft: "10%"}}>
                    <table>
                    <td>
                    <div style={{width:"100px"}}>
                    {categories.map((category) => (
                        <div key={category} style={{marginRight: '10px', padding: '5px', border:'1px solid #ccc', cursor : 'pointer'}} onClick={() => handleCategoryChange(category)}
                        >
                        {category}
                        </div>
                    ))}
                    </div></td>
                    <td>
                    <div style={{width:"300px"}}>
                    {selectedCategory && (
                            <div style={{ marginTop: '10px' }}>
                              {subCategories[selectedCategory].map((subCategory) => (
                                <div
                                  key={subCategory}
                                  style={{
                                    marginRight: '10px',
                                    padding: '5px',
                                    border: '1px solid #ccc',
                                    backgroundColor: 'white',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {subCategory}
                                </div>
                              ))}
                            </div>
                          )}
                          </div>
                          </td>
                          </table>
            </Form>
            <Form style={{marginLeft:"10%"}}>
                   <table>
                   <td>
                   <Form.Label style={{fontSize:"20px"}}>일정 날짜 &nbsp; &nbsp;</Form.Label>
                      </td>
                      <td>
                      <table>
                      <td style={{padding: "10px"}}>
                      <h5>가는 날 </h5>
                      <DatePicker
                         selected={currentMonth}
                         onChange={handleCurrentMonthChange}
                         placeholderText='가는 날 선택'
                         popperPlacement='bottom-start'
                         className="goingDate"
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
                         className="comingDate"
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
                    <Form.Control type="text"  onChange={handleTitle} placeholder="일정의 제목을 입력해주세요." style={{width:"500%"}} />
                    </td>
                 </table>
                 </Form>
                 <Form style={{marginLeft:"10%"}}>
                   <table>
                   <td>
                   <Form.Label style={{fontSize:"20px"}}>일정 내용 &nbsp;</Form.Label>
                   </td>
                   <td>
                   <textarea class="form-control"  onChange={handleContext} placeholder ="일정 내용을 입력해주세요." style={{width:"530%", height:"200px"}} />
                   </td>
                   </table>
                 </Form>

                   <br/>
                 </div>

                 <br />
                 <Button style={{width:"200px",marginLeft:"43%"}} onClick={handleSubmit}>일정 생성</Button>
        <br />
        <br />
        <div class="map_wrap" style={{width:"500px",height:"500px"}}>
                             <div id="menu_wrap" class="bg_white">
                                <div class="option">
                                   <div>
                                      <form onsubmit="searchPlaces(); return false;">
                                         키워드: <input type="text" onChange={handleArea} value={area} id="keyword" size="15" />
                                         {/*<button type="submit">검색하기</button>*/}
                                      </form>
                                   </div>
                                </div>
                                <div id="map" style={{width:"500px",height:"350px"}}>
                                </div>
                                <hr />
                                <ul id="placesList" hidden></ul>
                               <div id="pagination" hidden></div>
                             </div>
                          </div>
      </div>
   );
}

export default InitPage;
