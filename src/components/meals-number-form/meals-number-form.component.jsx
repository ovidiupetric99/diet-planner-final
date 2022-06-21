import {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {MealContext} from '../../contexts/meal.context';
import {UserContext} from '../../contexts/user.context';

import {
  collection,
  query,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

import {
  editUserDocumentFromAuth,
  currentUserData,
  currentUserSnapshot,
} from '../../utils/firebase/firebase.utils';

import './meals-number-form.styles.scss';
import {DietContext} from '../../contexts/diet.context';

const MealsNumberForm = () => {
  const {currentUser} = useContext (UserContext);
  const user = currentUser;
  const [mealsNumber, setMealsNumber] = useState (0);
  const [mealsNumberSelected, setMealsNumberSelected] = useState (null);
  const navigate = useNavigate ();
  const {removeFoodFromDiet} = useContext (DietContext);

  const navigateToUserData = () => {
    navigate ('/user-data');
  };

  const handleSubmit = async event => {
    event.preventDefault ();

    const db = getFirestore ();
    const q = query (collection (db, 'users'));
    const querySnapshot = await getDocs (q);
    const queryData = querySnapshot.docs.map (detail => ({
      ...detail.data (),
      id: detail.id,
    }));

    const q2 = query (collection (db, `users/${user.uid}/diet`));
    const q2Snapshot = await getDocs (q2);
    q2Snapshot.docs.map (async el => {
      await deleteDoc (doc (db, `users/${user.uid}/diet/diet`));
    });

    await setDoc (doc (db, `users/${user.uid}/diet/diet`), {});

    if (mealsNumber == 0) {
      alert ('Please select an option!');
      return;
    }

    try {
      await editUserDocumentFromAuth (user, {
        mealsNumber,
      });
      navigateToUserData ();
    } catch (error) {
      console.log ('setings meals number encountered an error', error);
    }
    await removeFoodFromDiet ();
  };

  const radioChange = event => {
    setMealsNumber (event.target.value);
    setMealsNumberSelected (event.target.value);
  };

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => {
        if (r) {
          setMealsNumberSelected (r.mealsNumber);
          setMealsNumber (r.mealsNumber);
        }
      });
    },
    [user]
  );

  return (
    <div className="meal-number-container">
      <div>
        <h2>How many meals do you want to eat in a day?</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <FormInput
              label="One meal (not recommended!)"
              type="radio"
              onChange={radioChange}
              name="mealNr"
              value="1"
              checked={mealsNumberSelected == 1 ? true : false}
            />
            <FormInput
              label="Two meals"
              type="radio"
              onChange={radioChange}
              name="mealNr"
              value="2"
              checked={mealsNumberSelected == 2 ? true : false}
            />
            <FormInput
              label="Tree meals (recommended)"
              type="radio"
              onChange={radioChange}
              name="mealNr"
              value="3"
              checked={mealsNumberSelected == 3 ? true : false}
            />
            <FormInput
              label="Four meals"
              type="radio"
              onChange={radioChange}
              name="mealNr"
              value="4"
              checked={mealsNumberSelected == 4 ? true : false}
            />
            <FormInput
              label="Five meals"
              type="radio"
              onChange={radioChange}
              name="mealNr"
              value="5"
              checked={mealsNumberSelected == 5 ? true : false}
            />
          </div>
          <Button type="submit">
            SET MEALS NUMBER
          </Button>

        </form>
      </div>
    </div>
  );
};

export default MealsNumberForm;
