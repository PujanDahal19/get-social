import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthForm from './context/FormContext';
import Post from './context/PostContext';
import Comments from './context/CommentContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthForm>
      <Post>
        <Comments>
          <App />
        </Comments>
      </Post>
    </AuthForm>
  </BrowserRouter>


);

