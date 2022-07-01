import {useContext, useState, useEffect} from 'react';
import {
  userMealsNumber,
  userTotalMacrosFromDiet,
  userMacrosGoal,
} from '../../utils/firebase/firebase.utils';
import {UserContext} from '../../contexts/user.context';
import {Chart, ArcElement, Legend, Title, Tooltip} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Pie} from 'react-chartjs-2';

import Meal from '../../components/meal/meal.component';

import {Link} from 'react-router-dom';

import './diet.styles.scss';

Chart.register (ArcElement, Title, Legend, ChartDataLabels, Tooltip);

const Diet = () => {
  const {currentUser} = useContext (UserContext);
  const user = currentUser;
  const [mealsNumber, setMealsNumber] = useState (null);
  const [macrosGoal, setMacrosGoal] = useState ({
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [totalMacrosPerDay, setTotalMacrosPerDay] = useState ({
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const data = {
    datasets: [
      {
        data: [
          totalMacrosPerDay.protein,
          totalMacrosPerDay.carbs,
          totalMacrosPerDay.fat,
        ],
        backgroundColor: ['#B859C0', '#0ABFC8', '#E58B30'],
      },
    ],
    labels: ['Protein', 'Carbs', 'Fats'],
    hoverOffset: 4,
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: tooltipItem => {
            const datapoints = tooltipItem.dataset.data;
            const totalSum = (total, datapoint) => {
              return total + datapoint;
            };

            const totalValue = datapoints.reduce (totalSum, 0);
            const percentageValue = (tooltipItem.parsed /
              totalValue *
              100).toFixed (0);
            return `${tooltipItem.label}: ${percentageValue}%`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  const handleMealChange = () => {
    userTotalMacrosFromDiet (user).then (r => {
      if (r) {
        setTotalMacrosPerDay (r);
        userTotalMacrosFromDiet (user).then (r => {
          if (r) {
            setTotalMacrosPerDay (r);
          }
        });
      }
    });
  };
  useEffect (
    () => {
      userMealsNumber (user).then (r => {
        if (r) {
          setMealsNumber (r);
        }
      });

      userMacrosGoal (user).then (r => {
        if (r) {
          setMacrosGoal (r);
        }
      });

      userTotalMacrosFromDiet (user).then (r => {
        if (r) {
          setTotalMacrosPerDay (r);
        }
      });
    },
    [user]
  );

  return (
    <div className="checkout-container">
      {macrosGoal.kcal
        ? <div>
            <span style={{color: 'gray'}}>Calories remaining.</span>
            <div className="remaining-calories">
              <div className="calories-math">
                <h1>{macrosGoal.kcal}</h1>
                <span className="span-math">goal</span>
              </div>
              <h1>-</h1>
              <div className="calories-math">
                <h1>{totalMacrosPerDay.kcal.toFixed (0)}</h1>
                <span className="span-math">food</span>
              </div>
              <h1>=</h1>
              <div className="calories-math">
                <h1
                  style={{
                    color: `${macrosGoal.kcal - totalMacrosPerDay.kcal.toFixed (0) < 0 ? 'red' : '#03A678'}`,
                  }}
                >
                  {macrosGoal.kcal - totalMacrosPerDay.kcal.toFixed (0)}
                </h1>
                <span className="span-math">remaining</span>
              </div>
            </div>

            {mealsNumber &&
              [...Array (Number (mealsNumber))].map ((el, i) => (
                <Meal key={i} value={i + 1} handler={handleMealChange} />
              ))}

            <div className="total-per-day">
              <div className="remaining-container">
                <div className="macros-data-total">
                  <h3>Total per day:</h3>
                </div>
                <div className="macros-data-total">
                  <h3>{totalMacrosPerDay.kcal.toFixed (0)}</h3>
                </div>
                <div className="macros-data-total">
                  <h3 style={{color: '#B859C0'}}>
                    {totalMacrosPerDay.protein.toFixed (0)}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3 style={{color: '#0ABFC8'}}>
                    {totalMacrosPerDay.carbs.toFixed (0)}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3 style={{color: '#E58B30'}}>
                    {totalMacrosPerDay.fat.toFixed (0)}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <span />
                </div>
              </div>
              <div className="remaining-container">
                <div className="macros-data-total">
                  <h3>Daily goal:</h3>
                </div>
                <div className="macros-data-total">
                  <h3>{macrosGoal.kcal}</h3>
                </div>
                <div className="macros-data-total">
                  <h3>
                    {macrosGoal.protein}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3>
                    {macrosGoal.carbs}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3>
                    {macrosGoal.fat}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <span />
                </div>
              </div>
              <div className="remaining-container">
                <div className="macros-data-total">
                  <h3>Remaining:</h3>
                </div>
                <div className="macros-data-total">
                  <h3
                    style={{
                      color: `${(macrosGoal.kcal - totalMacrosPerDay.kcal).toFixed (0) < 0 ? 'red' : '#03A678'}`,
                    }}
                  >
                    {(macrosGoal.kcal - totalMacrosPerDay.kcal).toFixed (0)}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3
                    style={{
                      color: `${(macrosGoal.protein - totalMacrosPerDay.protein).toFixed (0) < 0 ? 'red' : '#03A678'}`,
                    }}
                  >
                    {(macrosGoal.protein - totalMacrosPerDay.protein).toFixed (
                      0
                    )}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3
                    style={{
                      color: `${(macrosGoal.carbs - totalMacrosPerDay.carbs).toFixed (0) < 0 ? 'red' : '#03A678'}`,
                    }}
                  >
                    {(macrosGoal.carbs - totalMacrosPerDay.carbs).toFixed (0)}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <h3
                    style={{
                      color: `${(macrosGoal.fat - totalMacrosPerDay.fat).toFixed (0) < 0 ? 'red' : '#03A678'}`,
                    }}
                  >
                    {(macrosGoal.fat - totalMacrosPerDay.fat).toFixed (0)}
                  </h3>
                </div>
                <div className="macros-data-total">
                  <span />
                </div>
              </div>
              <div className="total-container">
                <div className="macros-data" />
                <div className="macros-data">
                  <span style={{fontSize: '16px'}}>Kcal</span>
                </div>
                <div className="macros-data">
                  <span style={{fontSize: '16px'}}>
                    Protein
                  </span>
                </div>
                <div className="macros-data">
                  <span style={{fontSize: '16px'}}>
                    Carbs
                  </span>
                </div>
                <div className="macros-data">
                  <span style={{fontSize: '16px'}}>
                    Fat
                  </span>
                </div>
                <div className="macros-data">
                  <span />
                </div>
              </div>
            </div>
            {totalMacrosPerDay.kcal != 0 &&
              <div className="chart">
                <Pie data={data} options={options} />
              </div>}
          </div>
        : <Link className="go-config-user-link" to="/edit-user">
            <h1>Go configure user data first!</h1>
          </Link>}
    </div>
  );
};

export default Diet;
