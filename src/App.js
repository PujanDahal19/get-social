import Login from './components/Form/Login'
import Register from './components/Form/Register'
import {Route, Routes} from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes';
import Home from './components/Tabs/Home';
import Profile from './components/Profile/Profile'
import Comment from './components/Comments/Comment';

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/protected' element={<ProtectedRoutes />}>
          <Route path='/protected/home' element={<Home />} />
          <Route path='/protected/profile/:id' element={<Profile />} />
          <Route path='/protected/comment/:id' element={<Comment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
