import React, { useEffect } from 'react'; // Added useEffect import
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { constant } from './baseData/globalData';

axios.defaults.withCredentials = true;

const ProtectedApp = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuthToken = async () => {
  //     const token = sessionStorage.getItem('authUserToken');
  //     if (token) {
  //       try {
  //         const user = jwtDecode(token);
  //         if (user) {
  //           if (user.role !== constant.ADMIN_SECERET_PASS ) {
  //             navigate('/');
  //           }
  //         } else {
  //           navigate('/');
  //         }
  //       } catch (error) {
  //         navigate('/');
  //       }  
  //     } else {
  //       navigate('/');
  //     }
  //   };
  //   checkAuthToken();
  // }, [navigate]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ProtectedApp />
    </Router>
  </React.StrictMode>
);
