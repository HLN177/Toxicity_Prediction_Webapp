import React, { useEffect } from 'react';
import SignInPage from '../pages/auth/signIn';
import SignUpPage from '../pages/auth/signUp';
import DashboardPage from '../pages/dashboard/dashboard';
import PredictionPage from '../pages/dashboard/prediction';
import LogPage from '../pages/dashboard/log';
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import history from '../services/history';

const AppRoutes = () => {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />}/>
        <Route path='signin' element={<SignInPage />}/>
        <Route path='signup' element={<SignUpPage />}/>
        <Route path='dashboard' element={<DashboardPage />}>
          <Route path='/dashboard' element={<Navigate to='prediction' />}/>
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
    </HistoryRouter>
  );
};

export default AppRoutes;