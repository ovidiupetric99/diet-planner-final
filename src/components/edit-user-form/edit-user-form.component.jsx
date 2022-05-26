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

  const [formFields, setFormFields] = useState (defaultFormFields);
  const {age, gender, wheight, height, activity} = formFields;

  const resetFormFields = () => {
    setFormFields (defaultFormFields);
  };

  const handleSubmit = async event => {
    event.preventDefault ();
    resetFormFields ();
    try {
      // console.log (await currentUserData (user));
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
        <FormInput
          label="Age"
          type="number"
          required
          onChange={handleChange}
          name="age"
          value={age}
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
        <DropdownList
          defaultValue="Yellow"
          value={['Red', 'Yellow', 'Blue', 'Orange']}
        />
        {/*<label>
          Activity level per week:
          <input list="activity-level" name="activity" />
        </label>
        <datalist id="activity-level">
          <option value="1">1-3 times per week</option>
          <option value="2">3-4 times per week</option>
          <option value="3">4-6 times per week</option>
          <option value="4">6-7 times per week</option>
  </datalist>*/}
        <Button type="submit">Edit</Button>
      </form>
    </div>
  );
};

export default EditUserForm;
