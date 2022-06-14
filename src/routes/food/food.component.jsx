import {useContext, useState, useEffect} from 'react';

import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import FoodContainer
  from '../../components/food-container/food-container.component';
import FoodDetails from '../../components/food-details/food-details.component';

import './food.styles.scss';
import {FoodContext} from '../../contexts/food.context';

const defaultParams = {
  api_key: 'NCEtfwf5O4G1bGJoqMRWDJg44gc5oEmX28t4GBlE',
  querry: '',
};

const Food = () => {
  const {food, setFood} = useContext (FoodContext);
  const [value, setValue] = useState ('');

  const [allFoods, setAllFoods] = useState (null);

  const [params, setParams] = useState (defaultParams);

  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&query=${params.querry}`;

  const handleSubmit = async event => {
    event.preventDefault ();
    getDataHandler ();
  };

  const getData = async () => {
    return fetch (api_url).then (response => response.json ());
  };

  const getDataHandler = () => {
    getData ().then (data => {
      setAllFoods (data.foods);
    });
  };

  const inputChange = event => {
    setParams ({...params, querry: event.target.value});
    setValue (event.target.value);
  };

  useEffect (() => {
    setFood (null);
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

      {food && <FoodDetails food={food} />}
    </div>
  );
};

export default Food;
