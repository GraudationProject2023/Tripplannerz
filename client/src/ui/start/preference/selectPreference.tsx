import {useState, useEffect} from 'react'
import type { Preference } from '@/domain/Preference';
import { preferenceList } from '@/lib/info/preferenceList';

export const SelectPreference = () => {
    const [selectedPreferenceList, setSelectedPreferenceList] = useState<Preference[]>([]);
    const [ranking, setRanking] = useState([]);
    const [show, setShow] = useState([]);
  
    const handleButtonClick = (preferenceId) => {
      if (selectedPreferenceList.includes(preferenceId)) {
        setSelectedPreferenceList(selectedPreferenceList.filter((button) => button !== preferenceId));
      } else if (selectedPreferenceList.length < 3) {
        setSelectedPreferenceList((list) => [...list, preferenceId]);
      }
    };
  
    const setRankingText = () => {
      const rankingText = [];
      const rankingShow = [];
      for (let i = 0; i < selectedPreferenceList.length; i++) {
        const button = preferenceList.find((item) => item.id === selectedPreferenceList[i]);
        rankingShow.push(`${i + 1}순위`);
        rankingText.push(`${button.code}`);
      }
      setShow(rankingShow);
      setRanking(rankingText);
    };
  
    useEffect(() => {
      setRankingText();
    }, [selectedPreferenceList]);
  
    return (
      <div>
        <div>
          {preferenceList.map((preference) => (
            <div key={preference.id} className={selectedPreferenceList.includes(preference.id) ? "button_table_btn_ns": "button_table_btn_s"} onClick={() => handleButtonClick(preference.id)}>
              <img style={{ width: "50px", height: "50px", marginTop: "5px" }} src={preference.image} alt={preference.name} className="card_image" />
              <div style={{ marginTop: "5px", fontSize: "18px" }} className="card_text">{preference.name}</div>
              {selectedPreferenceList.includes(preference.id) && (<div className="rank_text">{show[selectedPreferenceList.indexOf(preference.id)]}</div>)}
            </div>
          ))}
        </div>
      </div>
    );
  };