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
  const {currentUser} = useContext (UserContext);
  const {isDietOpen} = useContext (DietContext);
  const navigate = useNavigate ();

  const handlerSignOut = () => {
    signOutUser ();
    navigate ('/auth');
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={DietPlannerLogo} alt="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser
            ? <Link className="nav-link" to="/configure-macros">
                SET GOAL
              </Link>
            : null}
          {currentUser
            ? <Link className="nav-link" to="/auth">
                SETTINGS
              </Link>
            : null}

          {currentUser
            ? <Link className="nav-link" to="/food">
                FOOD
              </Link>
            : null}

          {currentUser
            ? <span className="nav-link" onClick={handlerSignOut}>
                SIGN OUT
              </span>
            : <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>}

          {currentUser
            ? <Link className="nav-link" to="/edit-user">
                CONFIGURE USER
              </Link>
            : null}
          {currentUser &&
            <Link className="nav-link" to="/diet">
              <CartIcon />
            </Link>}

        </div>
        {isDietOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
