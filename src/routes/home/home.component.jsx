import {Outlet} from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const categories = [
    {
      title: 'create new user',
      imageUrl: 'https://wallpapercave.com/wp/wp4947084.jpg',
      id: 1,
      linkUrl: 'create-new-user',
    },
    {
      title: 'switch user',
      imageUrl: 'https://wallpapercave.com/wp/wp4947084.jpg',
      id: 2,
      linkUrl: '',
    },
    {
      title: 'edit users',
      imageUrl: 'https://wallpapercave.com/wp/wp4947084.jpg',
      id: 3,
      linkUrl: '',
    },
    {
      title: 'view diets',
      imageUrl: 'https://wallpapercave.com/wp/wp4947084.jpg',
      size: 'large',
      id: 4,
      linkUrl: '',
    },
    {
      title: 'user s data',
      imageUrl: 'https://wallpapercave.com/wp/wp4947084.jpg',
      size: 'large',
      id: 5,
      linkUrl: '',
    },
  ];

  return (
    <div>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
