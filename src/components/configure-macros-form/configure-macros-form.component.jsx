import {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {UserContext} from '../../contexts/user.context';

import {
  editUserDocumentFromAuth,
  currentUserData,
  currentUserSnapshot,
} from '../../utils/firebase/firebase.utils';

import './configure-macros-form.styles.scss';

let defaultMacros = {
  kcal: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
};

const getAge = require ('get-age');

const ConfigureMacrosForm = () => {
  const [formFields, setFormFields] = useState (defaultMacros);
  let {kcal, protein, carbs, fats} = formFields;
  const [goalSelected, setGoalSelected] = useState (0);
  const [userData, setUserData] = useState (null);
  const {currentUser} = useContext (UserContext);
  const [deficit, setDeficit] = useState (0);
  let age = 0;
  const navigate = useNavigate ();

  const user = currentUser;

  const resetFormFields = () => {
    setFormFields (formFields);
  };

  const navigateToMealsNumber = () => {
    navigate ('/meals-number');
  };

  const handleSubmit = async event => {
    event.preventDefault ();
    resetFormFields ();

    if (goalSelected == 0) {
      alert ('Please select a goal!');
      return;
    }
    age = getAge (userData.birthday);
    calculateMacros ();

    try {
      await editUserDocumentFromAuth (user, {
        kcal,
        protein,
        carbs,
        fats,
      });
      navigateToMealsNumber ();
    } catch (error) {
      console.log ('macros configuring ecnountered an error', error);
    }
  };

  const calculateMacros = () => {
    kcal = parseInt (calculateKcal ());
    protein = parseInt (calculateProtein ());
    fats = parseInt (calculateFats ());
    carbs = parseInt (calculateCarbs ());
  };

  const calculateKcal = () => {
    const {gender, wheight, height, activity} = userData;
    let BMR = 0;
    if (gender == 1)
      BMR = parseInt (10 * wheight + 6.25 * height - 5 * age + 5);
    else BMR = parseInt (10 * wheight + 6.25 * height - 5 * age - 161);

    let TDEE = parseInt (BMR * activity);

    if (goalSelected == 1) return TDEE - deficit * 1000;
    if (goalSelected == 2) return TDEE;
    if (goalSelected == 3) return TDEE + deficit * 1000;
  };

  const calculateProtein = () => {
    const {gender, wheight, activity} = userData;
    if (goalSelected == 1)
      return gender == 1
        ? 1.5 * activity * wheight
        : 1.5 * activity * wheight * 0.9;
    if (goalSelected == 2)
      return gender == 1
        ? 1.3 * activity * wheight
        : 1.3 * activity * wheight * 0.9;
    if (goalSelected == 3)
      return gender == 1
        ? 1 * activity * wheight
        : 1 * activity * wheight * 0.9;
  };

  const calculateFats = () => {
    const {gender, wheight, activity} = userData;
    if (goalSelected == 1)
      return gender == 2
        ? 1 * wheight * (activity / 2) * 1.1
        : 1 * wheight * (activity / 2) * 1;

    if (goalSelected == 2)
      return gender == 2
        ? 1.3 * wheight * (activity / 2) * 1.1
        : 1.3 * wheight * (activity / 2) * 1;
    if (goalSelected == 3)
      return gender == 2
        ? 1.7 * wheight * (activity / 2) * 1.1
        : 1.7 * wheight * (activity / 2) * 1;
  };

  const calculateCarbs = () => {
    if (4 * protein - 9 * fats < kcal)
      return (kcal - 4 * protein - 9 * fats) / 4;
    else {
      protein = protein - (4 * protein - 9 * fats - kcal) * 4;
      return 0;
    }
  };

  const radioChange = event => {
    setGoalSelected (event.target.value);
  };

  const radioChangeSecond = event => {
    setDeficit (event.target.value);
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
    <div className="configure-macros-container">
      {userData
        ? userData.wheight
            ? <div>
                <h2>What is your weight goal?</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <FormInput
                      label="Lose Weight"
                      type="radio"
                      onChange={radioChange}
                      name="goal"
                      value="1"
                    />
                    <FormInput
                      label="Maintain Weight"
                      type="radio"
                      onChange={radioChange}
                      name="goal"
                      value="2"
                    />
                    <FormInput
                      label="Gain Weight"
                      type="radio"
                      onChange={radioChange}
                      name="goal"
                      value="3"
                    />

                  </div>
                  <div>
                    {goalSelected == 1
                      ? <div>
                          <h3>
                            How much weight do you want to lose per week?{' '}
                          </h3>
                          <FormInput
                            label="0.3 kg/week"
                            type="radio"
                            onChange={radioChangeSecond}
                            name="goal"
                            value="0.3"
                          />
                          <FormInput
                            label="0.5 kg/week"
                            type="radio"
                            onChange={radioChangeSecond}
                            name="goal"
                            value="0.5"
                          />
                          <FormInput
                            label="0.7 kg/week"
                            type="radio"
                            onChange={radioChangeSecond}
                            name="goal"
                            value="0.7"
                          />
                          <FormInput
                            label="1 kg/week"
                            type="radio"
                            onChange={radioChangeSecond}
                            name="goal"
                            value="1"
                          />
                        </div>
                      : null}
                  </div>
                  {goalSelected == 3
                    ? <div>
                        <h3>
                          How much weight do you want to gain per week?{' '}
                        </h3>
                        <FormInput
                          label="0.3 kg/week"
                          type="radio"
                          onChange={radioChangeSecond}
                          name="goal"
                          value="0.3"
                        />
                        <FormInput
                          label="0.5 kg/week"
                          type="radio"
                          onChange={radioChangeSecond}
                          name="goal"
                          value="0.5"
                        />
                        <FormInput
                          label="0.7 kg/week"
                          type="radio"
                          onChange={radioChangeSecond}
                          name="goal"
                          value="0.7"
                        />
                        <FormInput
                          label="1 kg/week"
                          type="radio"
                          onChange={radioChangeSecond}
                          name="goal"
                          value="1"
                        />
                      </div>
                    : null}
                  <Button type="submit">
                    SET GOAL
                  </Button>
                </form>
              </div>
            : <Link className="go-config-user-link" to="/edit-user">
                <h1>Go configure user data first!</h1>
              </Link>
        : null}
    </div>
  );
};

export default ConfigureMacrosForm;
