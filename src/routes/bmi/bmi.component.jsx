import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

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

  return (
    <div className="bmi-container">
      {height
        ? <div className="bmi">
            <div style={{display: 'flex'}}>
              <h2>Your body mass index is: </h2>
              <h2 style={{paddingLeft: '10px', color: '#198FFD'}}>
                {userBmi}
              </h2>
            </div>

            {userBmi > 15 && userBmi < 18.5
              ? <h3>Your result suggest that you are underweight.</h3>
              : userBmi >= 18.5 && userBmi <= 25
                  ? <h3>Your result suggest that your weight is optimal.</h3>
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
                <span
                  style={{
                    position: 'relative',
                    left: '93%',
                    marginLeft: '-8px',
                  }}
                >
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
            <h3>{`Healthy range weight for your height (${height} cm):`}</h3>
            <h3>
              {(18.5 * (height / 100 * height / 100)).toFixed (0)}
              {' '}
              -
              {' '}
              {(25 * (height / 100 * height / 100)).toFixed (0)} kg
            </h3>
            <h3 />

            <div style={{width: '40%', textAlign: 'center'}}>
              <h5>
                Procedure: BMI is calculated from body mass (M) and height (H). BMI = M / (H x H), where M = body mass in kilograms and H = height in meters. The higher the score usually indicating higher levels of body fat.
              </h5>
              <h5>
                *Disclaimer: in certain populations BMI can be inaccurate as a measure of body fatness, for example large and muscular though lean athletes may score high BMI levels which incorrectly rates them as overwheight or obese.
              </h5>

            </div>

          </div>
        : <Link className="go-config-user-link" to="/edit-user">
            <h1>Go configure user data first!</h1>
          </Link>}

    </div>
  );
};

export default Bmi;
