import {useContext, useState, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

import {DietContext} from '../../contexts/diet.context';

import {ReactComponent as PlateIcon} from '../../assets/farfurieneagra.svg';
import {userTotalMacrosFromDiet} from '../../utils/firebase/firebase.utils';

import './cart-icon.styles.scss';
import {UserContext} from '../../contexts/user.context';

const CartIcon = () => {
  const {isDietOpen, setIsDietOpen, macrosCount} = useContext (DietContext);
  const {currentUser} = useContext (UserContext);
  const user = currentUser;
  const [dietKcal, setDietKcal] = useState (0);
  const navigate = useNavigate ();

  //const toggleIsDietOpen = () => setIsDietOpen (!isDietOpen);

  const goToDietHandler = () => {
    navigate ('/diet');
  };

  useEffect (
    () => {
      userTotalMacrosFromDiet (user).then (r => {
        setDietKcal (r.kcal);
      });
    },
    [user]
  );
  return (
    <div className="cart-icon-container">
      <PlateIcon className="plate-icon" onClick={goToDietHandler} />
      {dietKcal == 0
        ? <span className="item-count">
            {dietKcal} kcal
          </span>
        : <div className="item-count">
            <span>{dietKcal}</span>
          </div>}
    </div>
  );
};

export default CartIcon;
