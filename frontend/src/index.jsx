import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import './style.css';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Index from './routes/Index';
import { Profile } from './routes/Profile';
import Logout from './routes/Logout';
import Feed from './routes/Feed';
import MapFeed from './routes/MapFeed';
import Post from './routes/Post';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/mapfeed",
        element: <MapFeed />,
      },
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
