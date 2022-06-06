import './food-element.styles.scss';

const FoodElement = props => {
  return (
    <li
      className="food-element"
      onClick={() => {
        console.log (props.foodData);
      }}
    >
      <h1>
        {props.foodData.description}
      </h1>
      <h4>
        {props.foodData.brandName}
      </h4>
      <span>
        {props.foodData.foodNutrients[3].value}
        {' '}
        calories per serving
      </span>
    </li>
  );
};

export default FoodElement;
