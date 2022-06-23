import {getDocs, getFirestore, query, collection} from 'firebase/firestore';
import {Fragment, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import DietItem from '../../components/diet-item/diet-item.component';

import {DietContext} from '../../contexts/diet.context';
import {MealContext} from '../../contexts/meal.context';
import {UserContext} from '../../contexts/user.context';
import {
  userMealsNumber,
  totalDietKcal,
} from '../../utils/firebase/firebase.utils';

import './meal.styles.scss';

const Meal = props => {
  const navigate = useNavigate ();
  const {foodItems} = useContext (DietContext); //aici era foodItems
  const {currentUser} = useContext (UserContext);
  const [foods, setFoods] = useState (null);
  const user = currentUser;
  const [test, setTest] = useState (0);
  let meals = [];
  const [mealsNumber, setMealsNumber] = useState (0);
  const {meal, setMeal} = useContext (MealContext);
  const [querySnapshot, setQuerySnapshot] = useState (null);
  const [totalPerMeal, setTotalPerMeal] = useState ({
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [totalPerDay, setTotalPerDay] = useState ({
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const db = getFirestore ();
  const q = query (collection (db, `users/${user.uid}/diet`));

  const handleDietItemDeleted = () => {
    getDocs (q).then (r => {
      if (r) {
        r.docs.map ((el, i) => (meals[i] = el.data ()));
        setFoods (meals[0]);
      }
    });
  };

  const goToFoodHandler = () => {
    setMeal (props.value);
    navigate ('/food');
  };

  const addFoodHandler = () => {
    goToFoodHandler ();
  };

  const getFoodsContent = elements => {
    let content = [];
    for (let i in elements) {
      const item = elements[i];
      if (props.value == item.mealNr)
        content.push (
          <DietItem
            key={i}
            id={i}
            foodItem={item}
            mealNumber={props.value}
            test={test}
            handler={handleDietItemDeleted}
          />
        );
    }
    return content;
  };

  const getTotalMacrosPerMeal = () => {
    let total = {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
    if (foods == null) return total;
    for (let i in foods) {
      const item = foods[i];
      if (item.mealNr == props.value) {
        total = {
          kcal: total.kcal + item.kcal * item.quantity,
          protein: total.protein + item.protein * item.quantity,
          carbs: total.carbs + item.carbs * item.quantity,
          fat: total.fat + item.fat * item.quantity,
        };
      }
    }
    return total;
  };

  const getTotalMacrosPerDay = () => {
    let total = {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    if (foods == null) return total;
    for (let i in foods) {
      const item = foods[i];
      total = {
        kcal: total.kcal + item.kcal * item.quantity,
        protein: total.protein + item.protein * item.quantity,
        carbs: total.carbs + item.carbs * item.quantity,
        fat: total.fat + item.fat * item.quantity,
      };
    }
    return total;
  };

  useEffect (
    () => {
      getDocs (q).then (r => {
        if (r) {
          r.docs.map ((el, i) => (meals[i] = el.data ()));
          setFoods (meals[0]);
        }
      });

      userMealsNumber (user).then (r => {
        if (r) {
          setMealsNumber (r);
        }
      });
    },
    [user]
  );

  useEffect (
    () => {
      props.handler ();
      setTotalPerDay (getTotalMacrosPerDay ());
      setTotalPerMeal (getTotalMacrosPerMeal ());
    },
    [foods]
  );

  return (
    <div className="meal-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Meal {props.value}</span>
        </div>
        {props.value === 1
          ? <Fragment>
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
            </Fragment>
          : null}
      </div>
      {getFoodsContent (foods)}
      <br />
      <div className="total-container">
        <div className="macros-data">
          <h4>Total per meal {props.value}</h4>
          <h4
            className="add-food-button"
            onClick={addFoodHandler}
            id={props.value}
          >
            Add food
          </h4>
        </div>
        <div className="macros-data">
          <h4>{totalPerMeal.kcal.toFixed (0)}</h4>
        </div>
        <div className="macros-data">
          <h4 style={{color: '#B859C0'}}>{totalPerMeal.protein.toFixed (0)}</h4>
        </div>
        <div className="macros-data">
          <h4 style={{color: '#0ABFC8'}}>{totalPerMeal.carbs.toFixed (0)}</h4>
        </div>
        <div className="macros-data">
          <h4 style={{color: '#E58B30'}}>{totalPerMeal.fat.toFixed (0)}</h4>
        </div>
        <div className="macros-data">
          <span />
        </div>
      </div>
    </div>
  );
};

export default Meal;
