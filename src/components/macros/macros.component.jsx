import {currentUserSnapshot} from '../../utils/firebase/firebase.utils';

import {Chart, ArcElement, Legend, Title, Tooltip} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Pie} from 'react-chartjs-2';

import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './macros.styles.scss';
import {UserContext} from '../../contexts/user.context';

Chart.register (ArcElement, Title, Legend, ChartDataLabels, Tooltip);

const Macros = () => {
  const [userData, setUserData] = useState (0);
  const {currentUser} = useContext (UserContext);
  const user = currentUser;

  const data = {
    datasets: [
      {
        data: [
          Number (userData.protein),
          Number (userData.carbs),
          Number (userData.fats),
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
      },
    ],
    labels: [
      'Protein ' + `(${userData.protein}g)`,
      'Carbs ' + `(${userData.carbs}g)`,
      'Fats ' + `(${userData.fats}g)`,
    ],
    hoverOffset: 4,
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter: (value, context) => {
          const datapoints = context.chart.data.datasets[0].data;
          const totalSum = (total, datapoint) => {
            return total + datapoint;
          };
          const totalValue = datapoints.reduce (totalSum, 0);
          const percentageValue = (value / totalValue * 100).toFixed (0);

          return `${percentageValue}%`;
        },
        color: 'white',
        font: {
          size: 14,
        },
      },
    },
  };

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => {
        if (r) {
          setUserData (r);
        }
      });
    },
    [user]
  );

  return (
    <div>
      {userData
        ? <div className="data-container">
            <div className="user-data">
              <h1>
                Macronutrients goals for {userData.displayName.toUpperCase ()}
              </h1>
              <h2>Kcal goal: {userData.kcal} </h2>
              <h2>Protein goal: {userData.protein}g</h2>
              <h2>Carbs goal: {userData.carbs}g</h2>
              <h2>Fats goal: {userData.fats}g</h2>
            </div>
            <div className="chart">
              <h1>Macros</h1>
              <Pie data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
          </div>
        : null}
      <div className="link-buy">
        <Link className="buy" to="/buy-premium">Go buy premium account!</Link>
      </div>

    </div>
  );
};

export default Macros;
