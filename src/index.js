import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Footer from './components/Footer'
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);