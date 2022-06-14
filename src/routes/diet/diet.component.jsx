import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {DietContext} from '../../contexts/diet.context';

import Button from '../../components/button/button.component';
import DietItem from '../../components/diet-item/diet-item.component';

import './diet.styles.scss';

const Diet = () => {
  const {foodItems, dietCount} = useContext (DietContext);
  const navigate = useNavigate ();

  const goToFoodHandler = () => {
    navigate ('/food');
  };

  return (
    <div className="checkout-container">
      <span>Calories remaining.</span>
      <div className="remaining-calories">
        <div className="calories-math">
          <h1>2300</h1>
          <span className="span-math">goal</span>
        </div>
        <h1>-</h1>
        <div className="calories-math">
          <h1>{dietCount.toFixed (0)}</h1>
          <span className="span-math">food</span>
        </div>
        <h1>=</h1>
        <div className="calories-math">
          <h1>{2300 - dietCount.toFixed (0)}</h1>
          <span className="span-math">remaining</span>
        </div>

      </div>
      <div className="checkout-header">
        <div className="header-block">
          <span>Meal 1</span>
        </div>
        <div className="header-block">
          <span>Kcal</span>
        </div>
        <div className="header-block">
          <span>Protein</span>
        </div>
        <div className="header-block">
          <span>Carbs</span>
        </div>
        <div className="header-block">
          <span>Fat</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {foodItems.map ((foodItem, i) => {
        return <DietItem key={i} foodItem={foodItem} />;
      })}
      <br />
      <div className="add-food-btn-container">
        <Button onClick={goToFoodHandler}>Add Food</Button>
      </div>

    </div>
  );
};

export default Diet;
