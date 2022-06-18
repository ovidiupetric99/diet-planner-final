import {useContext, useEffect, useState} from 'react';

import {userMetrics} from '../../utils/firebase/firebase.utils';
import {UserContext} from '../../contexts/user.context';

import './bmi.styles.scss';

const Bmi = () => {
  const {currentUser} = useContext (UserContext);
  const user = currentUser;
  const [userBmi, setUserBmi] = useState (0);
  const [height, setHeight] = useState (0);
  const [wheight, setWheight] = useState (0);

  useEffect (
    () => {
      userMetrics (user).then (r => {
        if (r) {
          setUserBmi (
            (r.wheight / (r.height / 100 * r.height / 100)).toFixed (1)
          );
          setHeight (r.height);
          setWheight (r.wheight);
        }
      });
    },
    [user]
  );

  console.log ('inaltime', height);
  console.log ('greutate', wheight);

  return (
    <div className="bmi">
      <h2>Your body mass index is: {userBmi}</h2>
      {userBmi > 15 && userBmi < 18.5
        ? <h3>Your result suggest that you are underwheight.</h3>
        : userBmi >= 18.5 && userBmi <= 25
            ? <h3>Your result suggest that your wheight is optimal.</h3>
            : userBmi > 25 && userBmi < 30
                ? <h3>Your result suggest that you are overweight.</h3>
                : userBmi > 30
                    ? <h3>Your result suggest that you are obese.</h3>
                    : null}
      <div className="bar-container">
        <div className="arrow-container">
          <span
            style={{
              position: 'relative',
              left: `${(userBmi - 15) / 20 * 100}%`,
              marginLeft: '-8px',
            }}
          >
            &#x25BC;
          </span>
        </div>
        <div className="bar" />
        <div className="info">
          <span
            style={{
              position: 'relative',
              left: `${(18.5 - 15) / 20 * 100}%`,
              marginLeft: '-8px',
            }}
          >
            |
          </span>
          <span
            style={{
              position: 'relative',
              left: `${(25 - 15) / 20 * 100}%`,
              marginLeft: '-8px',
            }}
          >
            |
          </span>
          <span style={{position: 'relative', left: '93%', marginLeft: '-8px'}}>
            |
          </span>
        </div>
        <div className="info">
          <span
            style={{
              position: 'relative',
              left: `${(18.5 - 15) / 20 * 100 - 2}%`,
              marginLeft: '-8px',
            }}
          >
            18.5
          </span>
          <span
            style={{
              position: 'relative',
              left: `${(25 - 15) / 20 * 100 - 5.5}%`,
              marginLeft: '-8px',
            }}
          >
            25
          </span>
          <span
            style={{
              position: 'relative',
              left: `${(30 - 15) / 20 * 100 + 10}%`,
              marginLeft: '-8px',
            }}
          >
            30
          </span>
        </div>
      </div>
      <h3>{`Healthy range wheight for your height (${height} cm):`}</h3>
      <h3>
        {(18.5 * (height / 100 * height / 100)).toFixed (0)}
        {' '}
        -
        {' '}
        {(25 * (height / 100 * height / 100)).toFixed (0)} kg
      </h3>
      <h3 />
    </div>
  );
};

export default Bmi;
