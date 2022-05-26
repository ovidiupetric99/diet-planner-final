import {Routes, Route} from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import EditUser from './routes/edit-user/edit-user.component';
import Food from './routes/food/food.component';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="food" element={<Food />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="edit-user" element={<EditUser />} />
      </Route>
    </Routes>
  );
};

export default App;
