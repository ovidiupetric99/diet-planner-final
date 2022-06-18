import {Fragment, useContext, useEffect, useState} from 'react';

import {DietContext} from '../../contexts/diet.context';
import {UserContext} from '../../contexts/user.context';

import {
  getFirestore,
  query,
  collection,
  getDocs,
  deleteField,
  updateDoc,
  doc,
} from 'firebase/firestore';

import './diet-item.styles.scss';

const deleteItemFromDatabase = async (id, user) => {
  const db = getFirestore ();
  const q = query (collection (db, `users/${user.uid}/diet`));
  const listRef = doc (db, `users/${user.uid}/diet/diet`);

  const q2Snapshot = await getDocs (q);
  q2Snapshot.docs.map (async el => {
    await updateDoc (listRef, {
      [id]: deleteField (),
    });
  });
};

const DietItem = ({foodItem, handler}) => {
  const {name, quantity, kcal, protein, carbs, fat} = foodItem;
  const [food, setFood] = useState (foodItem);
  const {currentUser} = useContext (UserContext);
  const [itemToDelete, setItemToDelete] = useState (null);
  //let itemToDelete = null;
  const user = currentUser;
  const {clearFoodFromDiet, addFoodToDiet, removeFoodFromDiet} = useContext (
    DietContext
  );

  const clearFoodHandler = async () => {
    const db = getFirestore ();
    const q = query (collection (db, `users/${user.uid}/diet`));
    //const listRef = doc (db, `users/${user.uid}/diet/diet`);
    getDocs (q).then (r => {
      const querySnapshot = r;
      const queryData = querySnapshot.docs.map (detail => ({
        ...detail.data (),
        id: detail.id,
      }));
      const q2 = queryData[0];
      for (let i in q2) {
        if (q2[i].fdcId === foodItem.fdcId) {
          setItemToDelete (i);
          setFood (null);
        }
      }
    });
  };

  useEffect (
    () => {
      if (itemToDelete != null) {
        deleteItemFromDatabase (itemToDelete, user).then (r => {
          handler ();
        });
      }
    },
    [itemToDelete]
  );

  return (
    <Fragment>

      {food &&
        <div className="checkout-item-container">
          <div className="macros-data">
            <span>
              {name}{', '}{quantity * 100}G
            </span>
          </div>
          <div className="macros-data">
            <span>{(quantity * kcal).toFixed (0)}</span>
          </div>
          <div className="macros-data">
            <span>{(quantity * protein).toFixed (0)}</span>
          </div>
          <div className="macros-data">
            <span>{(quantity * carbs).toFixed (0)}</span>
          </div>
          <div className="macros-data">
            <span>{(quantity * fat).toFixed (0)}</span>
          </div>

          <div className="remove-button" onClick={clearFoodHandler}>
            &#10005;
          </div>
        </div>}
    </Fragment>
  );
};

export default DietItem;
