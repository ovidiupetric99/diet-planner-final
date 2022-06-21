import FoodElement from '../food-element/food-element.component';
import './food-container.styles.scss';

let sortedArray;

const FoodContainer = props => {
  if (props.foods) {
    sortedArray = props.foods.sort ((a, b) => a.score + b.score);
  }

  return (
    <div>
      <ul className="scrollable">
        {sortedArray &&
          sortedArray.map (el => <FoodElement key={el.fdcId} foodData={el} />)}
      </ul>
    </div>
  );
};

export default FoodContainer;
