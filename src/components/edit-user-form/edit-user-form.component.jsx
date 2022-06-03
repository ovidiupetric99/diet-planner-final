import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  editUserDocumentFromAuth,
  currentUserData,
  currentUserSnapshot,
} from '../../utils/firebase/firebase.utils';

import {getAuth} from 'firebase/auth';

import './edit-user-form.styles.scss';
import {UserContext} from '../../contexts/user.context';

let defaultFormFields = {
  gender: '',
  wheight: '',
  height: '',
  activity: '',
};

const getAge = require ('get-age');

const EditUserForm = () => {
  //const auth = getAuth ();

  const navigate = useNavigate ();

  const [formFields, setFormFields] = useState (defaultFormFields);
  const {gender, wheight, height, activity} = formFields;
  const [genderSelected, setGenderSelected] = useState (null);
  const [activitySelected, setActivitySelected] = useState (null);
  const {currentUser} = useContext (UserContext);

  const user = currentUser;

  let age = 0;

  const resetFormFields = () => {
    setFormFields (formFields);
  };

  const navigateToConfigureMacros = () => {
    navigate ('/configure-macros');
  };

  const handleSubmit = async event => {
    event.preventDefault ();
    resetFormFields ();

    try {
      await editUserDocumentFromAuth (user, {
        gender,
        wheight,
        height,
        activity,
      });
      navigateToConfigureMacros ();
    } catch (error) {
      console.log ('user editing encountered an error', error);
    }
  };

  const handleChange = event => {
    const {name, value} = event.target;
    setFormFields ({...formFields, [name]: value});
  };

  const radioChangeGender = event => {
    const {name, value} = event.target;
    setFormFields ({...formFields, [name]: value});
    setGenderSelected (event.target.value);
  };

  const radioChangeActivity = event => {
    const {name, value} = event.target;
    setFormFields ({...formFields, [name]: value});
    setActivitySelected (event.target.value);
  };

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => {
        if (r) {
          setFormFields (r);
          currentUserSnapshot (user).then (r => setGenderSelected (r.gender));
          currentUserSnapshot (user).then (r => {
            setActivitySelected (r.activity);
            age = getAge (r.birthday);
            // console.log (age);
          });
        }
      });
    },
    [user]
  );

  return (
    <div className="edit-user-container">
      <h2>Edit user</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Choose Gender</h4>
          <FormInput
            label="Male"
            type="radio"
            onChange={radioChangeGender}
            name="gender"
            value="1"
            checked={genderSelected == 1 ? true : false}
          />
          <FormInput
            label="Female"
            type="radio"
            onChange={radioChangeGender}
            name="gender"
            value="2"
            checked={genderSelected == 2 ? true : false}
          />

        </div>

        <div>
          <h4>Choose Activity Level</h4>
          <FormInput
            label="Sedentary (little to no exercise + work a desk job)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="1.2"
            checked={activitySelected == 1.2 ? true : false}
          />
          <FormInput
            label="Lightly Active (light exercise 1-3 days / week)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="1.375"
            checked={activitySelected == 1.375 ? true : false}
          />
          <FormInput
            label="Moderately Active (moderate exercise 3-5 days / week)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="1.55"
            checked={activitySelected == 1.55 ? true : false}
          />
          <FormInput
            label="Very Active (heavy exercise 6-7 days / week) "
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="1.725"
            checked={activitySelected == 1.725 ? true : false}
          />
          <FormInput
            label="Extremely Active (strenuous training 2x / day) "
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="1.9"
            checked={activitySelected == 1.9 ? true : false}
          />
        </div>

        <FormInput
          label="Wheight (in Kg)"
          type="number"
          onChange={handleChange}
          name="wheight"
          value={wheight}
          required
        />
        <FormInput
          label="Height (in cm)"
          type="number"
          onChange={handleChange}
          name="height"
          value={height}
          required
        />

        <Button type="submit">
          Configure
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;
