import {Outlet} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../contexts/user.context';

import Directory from '../../components/directory/directory.component';
import {currentUserSnapshot} from '../../utils/firebase/firebase.utils';
import Footer from '../../components/footer/footer.component';

const Home = () => {
  const {currentUser} = useContext (UserContext);
  const user = currentUser;
  const [userLogged, setUserLogged] = useState (null);
  const categories = [
    {
      title: 'CURRENT MACROS',
      imageUrl: 'https://www.mensjournal.com/wp-content/uploads/mf/1280-grilled-chicken-turkey.jpg?quality=40&strip=all',
      id: 1,
      linkUrl: '/user-data',
    },
    {
      title: 'CONFIGURE USER',
      imageUrl: 'https://www.merakilane.com/wp-content/uploads/2018/06/Plant-Based-Diet-Meal-Plan-for-Beginners_-21-Day-Kickstart-Guide-slider.jpg',
      id: 2,
      linkUrl: '/edit-user',
    },
    {
      title: 'CHANGE GOAL',
      imageUrl: 'https://loseitblog.com/wp-content/uploads/2019/09/Untitled-design-119.png',
      id: 3,
      linkUrl: '/configure-macros',
    },
    {
      title: 'SEE DIET',
      imageUrl: 'http://s3.amazonaws.com/img.mynetdiary.com/blog/diet-goals.jpeg',
      size: 'large',
      id: 4,
      linkUrl: '/diet',
    },
    {
      title: 'SEE YOUR BMI',
      imageUrl: 'https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-528072248.jpg',
      size: 'large',
      id: 5,
      linkUrl: '/bmi',
    },
  ];

  const signIn = [
    {
      title: 'GO SIGN IN OR SIGN UP',
      imageUrl: 'https://www.merakilane.com/wp-content/uploads/2018/06/Plant-Based-Diet-Meal-Plan-for-Beginners_-21-Day-Kickstart-Guide-slider.jpg',
      id: 1,
      linkUrl: '/auth',
    },
  ];

  useEffect (
    () => {
      currentUserSnapshot (user).then (r => {
        if (r) {
          setUserLogged (r);
        }
      });
    },
    [user]
  );

  return (
    <div style={{minHeight: '380px'}}>
      <Outlet />
      {currentUser
        ? <Directory categories={categories} />
        : <div style={{width: '40%', margin: 'auto'}}>
            <Directory categories={signIn} />
          </div>}
    </div>
  );
};

export default Home;
