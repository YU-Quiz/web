import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import Modal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement('#root');

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

