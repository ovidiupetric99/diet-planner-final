import './set-macros.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import {useState, useContext, useEffect, useRef} from 'react';
import {UserContext} from '../../contexts/user.context';
import {
  currentUserSnapshot,
  editUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import {useNavigate} from 'react-router-dom';
import {Chart, ArcElement, Legend, Title, Tooltip} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Pie} from 'react-chartjs-2';

Chart.register (ArcElement, Title, Legend, ChartDataLabels, Tooltip);

const SetMacros = () => {
  const {currentUser} = useContext (UserContext);
  const user = currentUser;
  const [userData, setUserData] = useState (null);
  const [macros, setMacros] = useState ({
    Kcal: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  const {Kcal, protein, carbs, fats} = macros;
  const navigate = useNavigate ();
  let kcal = 0;

  const resetFormFields = () => {
    setMacros ({
      kcal: '',
      protein: '',
      carbs: '',
      fats: '',
    });
  };

  const data = {
    datasets: [
      {
        data: [Number (protein), Number (carbs), Number (fats)],
        backgroundColor: ['#B859C0', '#0ABFC8', '#E58B30'],
      },
    ],
    labels: [
      'Protein ' + `(${Number (protein)}g)`,
      'Carbs ' + `(${Number (carbs)}g)`,
      'Fats ' + `(${Number (fats)}g)`,
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

  const handleChange = event => {
    const {name, value} = event.target;
    setMacros ({
      ...macros,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault ();
    resetFormFields ();

    kcal = 4 * macros.protein + 4 * macros.carbs + 9 * macros.fats;

    try {
      await editUserDocumentFromAuth (user, {
        kcal,
        protein,
        carbs,
        fats,
      });
    } catch (error) {
      console.log ('Edit user macros encountered an error', error);
    }
  };

  const goHome = () => {
    navigate ('/');
  };

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => {
        if (r) {
          setUserData (r.premium);
        }
      });
    },
    [user]
  );

  useEffect (
    () => {
      if (userData == false) {
        goHome ();
      }
    },
    [userData]
  );

  return (
    <div className="set-macros-container">
      <h1 style={{textAlign: 'center'}}>Set macros however you want.</h1>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <form className="set-macros-form" onSubmit={handleSubmit}>
          <FormInput
            label="Protein"
            type="number"
            onChange={handleChange}
            name="protein"
            value={macros.protein}
            required
          />
          <FormInput
            label="Carbs"
            type="number"
            onChange={handleChange}
            name="carbs"
            value={macros.carbs}
            required
          />
          <FormInput
            label="Fat"
            type="number"
            onChange={handleChange}
            name="fats"
            value={macros.fats}
            required
          />
          <FormInput
            label="Kcal"
            type="number"
            disabled
            name="Kcal"
            value={
              macros.fats * 9 + macros.protein * 4 + macros.carbs * 4 === 0
                ? ''
                : macros.fats * 9 + macros.protein * 4 + macros.carbs * 4
            }
            readOnly
          />
          <Button>Set Macros</Button>
        </form>
        <div className="char-container">
          <Pie data={data} options={options} />
        </div>

      </div>
    </div>
  );
};

export default SetMacros;
