import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import AuthProvider from './providers/AuthProvider.tsx';
import store from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
        {/* <ToastContainer position="top-right" autoClose={5000} /> */}
      </AuthProvider>
    </Provider>
  </BrowserRouter>
</React.StrictMode>
)
