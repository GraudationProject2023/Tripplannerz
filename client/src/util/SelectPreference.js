import React,{useState, useEffect} from 'react'
import sight from '../Image/관광지.png';
import culture from "../Image/문화시설.png";
import festival from "../Image/축제.png";
import surfing from "../Image/서핑.png";
import hotel from "../Image/호텔.png";
import shopping from "../Image/쇼핑.png";
import restaurant from "../Image/레스토랑.png";

export const SelectPreference = () => {
    const arr = [
      { id: 1, name: "관광지", code: "SIGHTSEEING", image: sight },
      { id: 2, name: "문화시설", code: "CULTURE", image: culture },
      { id: 3, name: "축제 • 공연", code: "FESTIVAL", image: festival },
      { id: 4, name: "레포츠", code: "LEISURE", image: surfing },
      { id: 5, name: "호캉스", code: "VACATION", image: hotel },
      { id: 6, name: "쇼핑", code: "SHOPPING", image: shopping },
      { id: 7, code: "RESTAURANT", name: "맛집탐방", image: restaurant },
    ];
    const [pick1, setPick1] = useState(arr);
    const [select1, setSelect1] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [show, setShow] = useState([]);
  
    const handleButtonClick = (itemId) => {
      if (select1.includes(itemId)) {
        setSelect1(select1.filter((button) => button !== itemId));
      } else if (select1.length < 3) {
        setSelect1((select1) => [...select1, itemId]);
      }
    };
  
    const setRankingText = () => {
      const rankingText = [];
      const rankingShow = [];
      for (let i = 0; i < select1.length; i++) {
        const button = pick1.find((item) => item.id === select1[i]);
        rankingShow.push(`${i + 1}순위`);
        rankingText.push(`${button.code}`);
      }
      setShow(rankingShow);
      setRanking(rankingText);
      if (rankingText.length === 0) {
        localStorage.setItem("rank", -1);
      } else {
        localStorage.setItem("rank", rankingText);
      }
    };
  
    useEffect(() => {
      setRankingText();
    }, [select1]);
  
    return (
      <div>
        <div>
          {pick1.map((item) => (
            <div
              key={item.id}
              className={
                select1.includes(item.id)
                  ? "button_table_btn_ns"
                  : "button_table_btn_s"
              }
              onClick={() => handleButtonClick(item.id)}
            >
              <img
                style={{ width: "50px", height: "50px", marginTop: "5px" }}
                src={item.image}
                alt={item.name}
                className="card_image"
              />
              <div
                style={{ marginTop: "5px", fontSize: "18px" }}
                className="card_text"
              >
                {item.name}
              </div>
              {select1.includes(item.id) && (
                <div className="rank_text">{show[select1.indexOf(item.id)]}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };