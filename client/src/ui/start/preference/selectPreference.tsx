import { useDispatch} from 'react-redux';
import { setTripPreference } from '@/store/action/tripPreferenceAction';
import { preferenceList } from '@/lib/info/preferenceList';

export const SelectPreference = () => {
  const dispatch = useDispatch();

  const handleButtonClick = (preferenceName) => {
    console.log(preferenceName);
    dispatch(setTripPreference(preferenceName));
  };

  return (
    <div>
      <div>
        {preferenceList.map((preference) => (
          <div key={preference.id} className="button_table_btn_s" onClick={() => handleButtonClick(preference.name)}>
            <img style={{ width: "50px", height: "50px", marginTop: "5px" }} src={preference.image} alt={preference.name} className="card_image" />
            <div style={{ marginTop: "5px", fontSize: "18px" }} className="card_text">{preference.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
