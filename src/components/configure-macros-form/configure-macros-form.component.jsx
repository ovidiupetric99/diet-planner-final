import {useState, useEffect, useContext} from 'react';

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

const ConfigureMacrosForm = () => {
  const [formFields, setFormFields] = useState (defaultMacros);
  const {kcal, protein, carbs, fats} = formFields;
  const [goalSelected, setGoalSelected] = useState (2);
  const [userData, setUserData] = useState (null);
  const {currentUser} = useContext (UserContext);

  const user = currentUser;

  const handleSubmit = async event => {
    calculateProteinNecesar ();
    console.log (formFields);
    event.preventDefault ();
    try {
      await editUserDocumentFromAuth (user, {
        kcal,
        protein,
        carbs,
        fats,
      });
      console.log ('macros configured succesfully');
    } catch (error) {
      console.log ('macros configuring ecnountered and error', error);
    }
  };

  const calculateProteinNecesar = () => {
    if (goalSelected == 1) {
      setFormFields ({...formFields, protein: `${2 * userData.wheight}`});
      console.log ('protein' + formFields.protein);
    }
  };

  const radioChange = event => {
    setGoalSelected (event.target.value);
    currentUserSnapshot (user).then (r => setUserData (r));
  };

  return (
    <div className="configure-macros-container">
      <h2>What is your weight goal?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            label="Lose Wheight"
            type="radio"
            onChange={radioChange}
            name="goal"
            value="1"
            checked={goalSelected == 1 ? true : false}
          />
          <FormInput
            label="Maintain Wheight"
            type="radio"
            onChange={radioChange}
            name="goal"
            value="2"
            checked={goalSelected == 2 ? true : false}
          />
          <FormInput
            label="Gain Wheight"
            type="radio"
            onChange={radioChange}
            name="goal"
            value="3"
            checked={goalSelected == 3 ? true : false}
          />

          <Button type="submit">
            GET MACROS
          </Button>

        </div>
      </form>
    </div>
  );
};

export default ConfigureMacrosForm;
