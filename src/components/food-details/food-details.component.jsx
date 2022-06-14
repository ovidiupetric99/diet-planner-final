import './food-details.styles.scss';
import Button from '../button/button.component';
import FloatInput from 'react-float-input';
import Modal from '../Modal/modal.component';

import {useContext, useState, useEffect, useInsertionEffect} from 'react';
import {DietContext} from '../../contexts/diet.context';
import {FoodContext} from '../../contexts/food.context';
import {Doughnut} from 'react-chartjs-2';
import {Chart, Tooltip, Title, ArcElement, Legend} from 'chart.js';
Chart.register (Tooltip, Title, ArcElement, Legend);

const FoodDetails = ({food}) => {
  const {addFoodToDiet} = useContext (DietContext);
  const [servings, setServings] = useState ((1).toFixed (1));
  const [isOpen, setIsOpen] = useState (false);
  const [foodToAdd, setFoodToAdd] = useState (null);
  const [id, setId] = useState (-1);
  const data = {
    datasets: [
      {
        data: [
          food.foodNutrients[0].value,
          food.foodNutrients[2].value,
          food.foodNutrients[1].value,
        ],
        backgroundColor: ['#B859C0', '#0ABFC8', '#E58B30'],
      },
    ],
  };

  const options = {
    cutout: 33,
    width: '200px',
    plugins: {
      datalabels: {
        display: false,
      },
    },
    responsive: true,
  };

  const proteinPercentage = () => {
    return food.foodNutrients[0].value * 400 / food.foodNutrients[3].value;
  };

  const carbsPercentage = () => {
    return food.foodNutrients[2].value * 400 / food.foodNutrients[3].value;
  };

  const fatPercentage = () => {
    return food.foodNutrients[1].value * 900 / food.foodNutrients[3].value;
  };

  // const {setFood} = useContext (FoodContext);

  //   const closeWindow = () => {
  //     setTimeout (() => setFood (null), 1000);
  //   };

  const handleSubmit = event => {
    event.preventDefault ();
    if (foodToAdd != {})
      setFoodToAdd ({
        id: id,
        fdcId: food.fdcId,
        name: food.description,
        quantity: Number (servings),
        kcal: food.foodNutrients[3].value,
        protein: food.foodNutrients[0].value,
        carbs: food.foodNutrients[2].value,
        fat: food.foodNutrients[1].value,
      });
  };

  useEffect (
    () => {
      if (foodToAdd) {
        setId (id + 1);
        addFoodToDiet (foodToAdd);
      }
    },
    [foodToAdd]
  );

  const handleChange = event => {
    setServings (event.target.value);
  };

  return (
    <div className="food-information">
      <div className="title-container">
        <h2>Name: {food.description}</h2>
        {food.brandName && <h3>Brand name: {food.brandName}</h3>}
      </div>
      <div className="macros">
        <div className="chart">
          <Doughnut data={data} options={options} />
        </div>
        <div className="element">
          <span className="protein-percentage">
            {Math.round (proteinPercentage ())}%
          </span>
          <h4 className="calories">
            {Number.isInteger (servings * food.foodNutrients[0].value)
              ? servings * food.foodNutrients[0].value
              : (servings * food.foodNutrients[0].value).toFixed (1)}
            g
          </h4>
          <span>Protein</span>
        </div>
        <div className="element">
          <span className="carbs-percentage">
            {Math.round (carbsPercentage ())}%
          </span>
          <h4 className="calories">
            {Number.isInteger (servings * food.foodNutrients[2].value)
              ? servings * food.foodNutrients[2].value
              : (servings * food.foodNutrients[2].value).toFixed (1)}
            g
          </h4>
          <span>Carbs</span>
        </div>
        <div className="element">
          <span className="fat-percentage">
            {Math.round (fatPercentage ())}%
          </span>
          <h4 className="calories">
            {Number.isInteger (servings * food.foodNutrients[1].value)
              ? servings * food.foodNutrients[1].value
              : (servings * food.foodNutrients[1].value).toFixed (1)}
            g
          </h4>
          <span>Fat</span>
        </div>
        <div className="element">
          <h3 className="calories">
            {parseInt (servings * food.foodNutrients[3].value)}
          </h3>
          <span>kcal</span>
        </div>
      </div>

      <form className="serving-form" onSubmit={handleSubmit}>
        <div className="line">
          <span>Number of Servings</span>
          <div className="data">
            <input
              type="number"
              step="0.01"
              min="0"
              max="20"
              className="form-control"
              value={servings}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="line">
          <span>Servings of</span>
          <span className="data"> 100G</span>
        </div>
        <div className="button-template">
          <Button type="submit">ADD</Button>
        </div>
        <span className="info-button" onClick={() => setIsOpen (true)}>
          Additional Information
        </span>
      </form>

      <Modal open={isOpen} onClose={() => setIsOpen (false)}>
        {food}
      </Modal>
    </div>
  );
};

export default FoodDetails;
