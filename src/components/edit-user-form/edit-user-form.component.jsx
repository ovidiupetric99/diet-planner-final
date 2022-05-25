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

const defaultFormFields = {
  age: '',
  gender: '',
  wheight: '',
  height: '',
  activity: '',
};

export const auth = getAuth ();
export const user = auth.currentUser;

const EditUserForm = () => {
  const [formFields, setFormFields] = useState (defaultFormFields);
  const {age, gender, wheight, height, activity} = formFields;

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
        <FormInput
          label="Age"
          type="number"
          required
          onChange={handleChange}
          name="age"
          value={age}
        />
        <FormInput
          label="Gender"
          type="text"
          required
          onChange={handleChange}
          name="gender"
          value={gender}
        />
        <FormInput
          label="Wheight (in Kg)"
          type="number"
          required
          onChange={handleChange}
          name="wheight"
          value={wheight}
        />
        <FormInput
          label="Height (in cm)"
          type="number"
          required
          onChange={handleChange}
          name="height"
          value={height}
        />
        <FormInput
          label="Activity"
          type="number"
          required
          onChange={handleChange}
          name="activity"
          value={activity}
        />
        <Button type="submit">Edit</Button>
      </form>
    </div>
  );
};

export default EditUserForm;
