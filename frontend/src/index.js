import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './component/Store';
import { PaymentStateProvider } from './component/StateStore';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <PaymentStateProvider>
        <HelmetProvider>
          <BrowserRouter>
            <PayPalScriptProvider deferLoading={true}>
              <App />
            </PayPalScriptProvider>
          </BrowserRouter>
        </HelmetProvider>
      </PaymentStateProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
