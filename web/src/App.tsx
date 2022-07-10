import React, { useEffect } from 'react';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import AppRoutes from './router/routes';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
};

export default App;
