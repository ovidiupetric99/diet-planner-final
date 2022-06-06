import FoodElement from '../food-element/food-element.component';
import './food-container.styles.scss';

const FoodContainer = props => {
  return (
    <div>
      <ul className="scrollable">
        {props.foods &&
          props.foods.map (el => <FoodElement key={el.fdcId} foodData={el} />)}
      </ul>
    </div>
  );
};

export default FoodContainer;
