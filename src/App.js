import Directory from './components/directory/directory.component';

const App = () => {
  const categories = [
    {
      title: 'create new user',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS60-b4CLmyxCYJfhqmN1nLhVh4PACmIzU9qg7spaVoRQ9KK566yGew-pXN1dwLo6GF30g&usqp=CAU',
      id: 1,
      linkUrl: 'create-new-user',
    },
    {
      title: 'switch user',
      imageUrl: 'https://media.istockphoto.com/vectors/update-profile-personal-account-icon-change-avatar-reset-settings-vector-id925175888?k=20&m=925175888&s=612x612&w=0&h=uXqQIFqr2vQdEZlgjZesclJA3yXvbnb9n-J_23C96Cw=',
      id: 2,
      linkUrl: '',
    },
    {
      title: 'edit user',
      imageUrl: 'https://www.iconbolt.com/preview/twitter/font-awesome-solid/user-edit.svg',
      id: 3,
      linkUrl: '',
    },
    {
      title: 'view diet',
      imageUrl: 'https://images.everydayhealth.com/images/what-is-the-dash-diet-1440x810.jpg',
      size: 'large',
      id: 4,
      linkUrl: '',
    },
    {
      title: 'user data',
      imageUrl: 'https://image.shutterstock.com/image-vector/account-settings-line-icon-260nw-1140725783.jpg',
      size: 'large',
      id: 5,
      linkUrl: '',
    },
  ];

  return <Directory categories={categories} />;
};

export default App;
