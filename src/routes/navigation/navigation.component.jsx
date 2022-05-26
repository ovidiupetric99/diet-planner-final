import {Fragment, useContext} from 'react';
import {Outlet, Link} from 'react-router-dom';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

import {ReactComponent as DietPlannerLogo} from '../../assets/diet-planner.svg';
import {UserContext} from '../../contexts/user.context';

import {signOutUser} from '../../utils/firebase/firebase.utils.js';
import {intializeDefaultFormFields} from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser} = useContext (UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <DietPlannerLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/auth">
            SETTINGS
          </Link>
          <Link className="nav-link" to="/food">
            FOOD
          </Link>
          {currentUser
            ? <span className="nav-link" onClick={signOutUser}>
                SIGN OUT
              </span>
            : <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>}

          {currentUser
            ? <Link className="nav-link" to="/edit-user">
                EDIT USER
              </Link>
            : null}

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
