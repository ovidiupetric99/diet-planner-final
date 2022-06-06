import {useContext, useState} from 'react';

import {ProductsContext} from '../../contexts/products.context';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import FoodContainer
  from '../../components/food-container/food-container.component';

import './food.styles.scss';

const defaultParams = {
  api_key: 'NCEtfwf5O4G1bGJoqMRWDJg44gc5oEmX28t4GBlE',
  querry: '',
  //  dataType: ['Foundation'],
};

const Food = () => {
  const {products} = useContext (ProductsContext);
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
      <div />
    </div>
  );
};

export default Food;
