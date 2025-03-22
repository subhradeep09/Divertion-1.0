// src/Layout.jsx
import React from 'react';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <main className="p-6 w-full max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
