import {useState, useEffect} from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  editUserDocumentFromAuth,
  currentUserData,
  currentUserSnapshot,
} from '../../utils/firebase/firebase.utils';

import {getAuth} from 'firebase/auth';

import './edit-user-form.styles.scss';

let defaultFormFields = {
  age: '',
  gender: '',
  wheight: '',
  height: '',
  activity: '',
};

const EditUserForm = () => {
  const auth = getAuth ();
  const user = auth.currentUser;

  const [verify, setVerify] = useState (false);

  const [formFields, setFormFields] = useState (defaultFormFields);
  const {age, gender, wheight, height, activity} = formFields;
  const [genderSelected, setGenderSelected] = useState (null);
  const [activitySelected, setActivitySelected] = useState (null);

  const resetFormFields = () => {
    setFormFields (defaultFormFields);
  };

  const handleSubmit = async event => {
    event.preventDefault ();
    resetFormFields ();
    try {
      await editUserDocumentFromAuth (user, {
        age,
        gender,
        wheight,
        height,
        activity,
      });
      console.log ('edited succesfully');
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
      currentUserData (user).then (r => setVerify (r));
    },
    [verify]
  );

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => setFormFields (r));
    },
    [currentUserData]
  );

  useEffect (() => {
    currentUserSnapshot (user).then (r => setGenderSelected (r.gender));
    currentUserSnapshot (user).then (r => setActivitySelected (r.activity));
  }, []);

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
            label="1-3 times per week (low)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="1"
            checked={activitySelected == 1 ? true : false}
          />
          <FormInput
            label="3-4 times per week (medium)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="2"
            checked={activitySelected == 2 ? true : false}
          />
          <FormInput
            label="4-5 times per week (high)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="3"
            checked={activitySelected == 3 ? true : false}
          />
          <FormInput
            label="6-7 times per week (verry high)"
            type="radio"
            onChange={radioChangeActivity}
            name="activity"
            value="4"
            checked={activitySelected == 4 ? true : false}
          />
        </div>

        <FormInput
          label="Age"
          type="number"
          onChange={handleChange}
          name="age"
          value={age}
          required
        />
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
          {`${verify ? 'Edit' : 'Configure'}`}
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;
