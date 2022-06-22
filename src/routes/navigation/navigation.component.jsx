import {Fragment, useContext, useState, useEffect} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown
  from '../../components/cart-dropdown/cart-dropdown.component';

import {UserContext} from '../../contexts/user.context';
import {DietContext} from '../../contexts/diet.context';

import DietPlannerLogo from '../../assets/oviboss.png';
import {
  currentUserSnapshot,
  signOutUser,
} from '../../utils/firebase/firebase.utils.js';

import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext (UserContext);
  const {isDietOpen} = useContext (DietContext);
  const [userName, setUserName] = useState ('');
  const navigate = useNavigate ();
  const [premium, setPremium] = useState (false);

  const user = currentUser;

  const handlerSignOut = () => {
    setCurrentUser (null);
    setUserName ('');
    setPremium (false);
    signOutUser ();
    navigate ('/auth');
  };

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => {
        if (r) {
          setUserName (r.displayName.toUpperCase ());
        }
      });
    },
    [user]
  );

  useEffect (
    () => {
      if (userName) {
        currentUserSnapshot (user).then (r => {
          if (r) {
            setPremium (r.premium);
          }
        });
      }
    },
    [userName]
  );

  useEffect (() => {
    currentUserSnapshot (user).then (r => {
      if (r) {
        setUserName (r.displayName.toUpperCase ());
        setPremium (r.premium);
      }
    });
  });

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={DietPlannerLogo} alt="logo" />
        </Link>
        <div className="nav-links-container">
          {userName
            ? <Link className="nav-link" to="/user-data">
                {userName}
              </Link>
            : null}
          {premium
            ? <Link className="nav-link" to="/set-macros">
                SET MACROS *PREMIUM*
              </Link>
            : null}

          {currentUser
            ? <Link className="nav-link" to="/edit-user">
                CONFIGURE USER
              </Link>
            : null}

          {currentUser
            ? <Link className="nav-link" to="/configure-macros">
                CHANGE GOAL
              </Link>
            : null}

          {currentUser
            ? <Link className="nav-link" to="/meals-number">
                EDIT MEALS NUMBER
              </Link>
            : null}

          {currentUser
            ? <Link className="nav-link" to="/bmi">
                BMI
              </Link>
            : null}
          {currentUser
            ? <span className="nav-link" onClick={handlerSignOut}>
                SIGN OUT
              </span>
            : <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>}

          {currentUser &&
            <div className="nav-link-icon">
              <CartIcon />
            </div>}

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
