import {useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import FoodContainer
  from '../../components/food-container/food-container.component';
import FoodDetails from '../../components/food-details/food-details.component';

import './food.styles.scss';
import {FoodContext} from '../../contexts/food.context';
import {MealContext} from '../../contexts/meal.context';
import {Navigate} from 'react-router-dom';

const Food = () => {
  const {food, setFood} = useContext (FoodContext);
  const {meal} = useContext (MealContext);
  const [mealNr, setMealNr] = useState (0);
  const [value, setValue] = useState ('');
  let selectedFoods = [];
  let verifiedArray = [];

  const navigate = useNavigate ();

  const [allFoods, setAllFoods] = useState (null);

  const defaultParams = {
    api_key: 'NCEtfwf5O4G1bGJoqMRWDJg44gc5oEmX28t4GBlE',
    dataType: ['Branded'],
    querry: '',
  };

  const [params, setParams] = useState (defaultParams);

  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&query=${params.querry}`;

  //https://api.nal.usda.gov/fdc/v1/foods/search?api_key=NCEtfwf5O4G1bGJoqMRWDJg44gc5oEmX28t4GBlE&query=Cheddar

  const getData = async () => {
    return fetch (api_url).then (response => response.json ());
  };

  const handleSubmit = async event => {
    event.preventDefault ();
    getDataHandler ();
  };

  const getDataHandler = () => {
    getData ().then (data => {
      if (data.foods) {
        verifiedArray = data.foods.filter (
          el =>
            el.foodNutrients[0] &&
            el.foodNutrients[1] &&
            el.foodNutrients[2] &&
            el.foodNutrients[3]
        );
      }
      selectedFoods = verifiedArray.filter (
        el =>
          el.foodNutrients[0].nutrientName == 'Protein' &&
          el.foodNutrients[1].nutrientName == 'Total lipid (fat)' &&
          el.foodNutrients[2].nutrientName == 'Carbohydrate, by difference' &&
          el.foodNutrients[3].nutrientName == 'Energy'
      );
      setAllFoods (selectedFoods);
    });
  };

  const inputChange = event => {
    setParams ({...params, querry: event.target.value});
    setValue (event.target.value);
  };

  useEffect (() => {
    if (meal) {
      setMealNr (meal);
    } else {
      navigate ('/diet');
    }
    setFood (null);
    setAllFoods (null);
  }, []);

  return (
    <div className="products-container">
      <div>
        <form onSubmit={handleSubmit} className="food-form-input">
          <FormInput onChange={inputChange} label="Search" value={value} />
          <Button type="submit">
            search
          </Button>
        </form>

        <FoodContainer foods={allFoods} />
      </div>
      <div>
        <div className="meal-nr">
          <h2 className="meal-nr-text">You are adding food to Meal {mealNr}</h2>
        </div>
        {food && <FoodDetails food={food} />}
      </div>

    </div>
  );
};

export default Food;
