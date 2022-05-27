import {useState, useEffect} from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  editUserDocumentFromAuth,
  currentUserData,
} from '../../utils/firebase/firebase.utils';

import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

import './edit-user-form.styles.scss';
import {initializeApp} from 'firebase/app';

const defaultFormFields = {
  age: '',
  gender: '',
  wheight: '',
  height: '',
  activity: '',
};

let verify = false;

const EditUserForm = () => {
  const auth = getAuth ();
  const user = auth.currentUser;

  const [formFields, setFormFields] = useState (defaultFormFields);
  const {age, gender, wheight, height, activity} = formFields;

  // verify = verificare ();

  //aici apelez functia pt verify

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
    } catch (error) {
      console.log ('user editing encountered an error', error);
    }
  };

  const handleChange = event => {
    const {name, value} = event.target;
    setFormFields ({...formFields, [name]: value});
  };

  return (
    <div className="edit-user-container">
      <h2>Edit user</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Choose Gender</h4>
          <FormInput
            label="Male"
            type="radio"
            onChange={handleChange}
            name="gender"
            value="male"
          />
          <FormInput
            label="Female"
            type="radio"
            onChange={handleChange}
            name="gender"
            value="female"
          />
        </div>

        <div>
          <h4>Choose Activity Level</h4>
          <FormInput
            label="1-3 times per week (low)"
            type="radio"
            onChange={handleChange}
            name="activity"
            value="1"
          />
          <FormInput
            label="3-4 times per week (medium)"
            type="radio"
            onChange={handleChange}
            name="activity"
            value="2"
          />
          <FormInput
            label="4-5 times per week (high)"
            type="radio"
            onChange={handleChange}
            name="activity"
            value="3"
          />
          <FormInput
            label="6-7 times per week (verry high)"
            type="radio"
            onChange={handleChange}
            name="activity"
            value="4"
          />
        </div>

        <FormInput
          label="Age"
          type="number"
          onChange={handleChange}
          name="age"
          value={age}
        />
        <FormInput
          label="Wheight (in Kg)"
          type="number"
          onChange={handleChange}
          name="wheight"
          value={wheight}
        />
        <FormInput
          label="Height (in cm)"
          type="number"
          onChange={handleChange}
          name="height"
          value={height}
        />

        <Button type="submit">
          Edit
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;
