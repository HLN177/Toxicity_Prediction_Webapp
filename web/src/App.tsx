import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import SignInPage from './pages/auth/signIn';
import SignUpPage from './pages/auth/signUp';
import DashboardPage from './pages/dashboard/dashboard';
import PredictionPage from './pages/dashboard/prediction';
import LogPage from './pages/dashboard/log';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />} />
        <Route path='signin' element={<SignInPage />} ></Route>
        <Route path='signup' element={<SignUpPage />}/>
        <Route path='dashboard' element={<DashboardPage />} >
          <Route path='prediction' element={<PredictionPage />}/>
          <Route path='log' element={<LogPage />}/>
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There is nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
