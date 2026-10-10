import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased">
      <Sidebar />
      <div className="pl-[280px]">
        <Header />
        <main className="w-full pt-16 min-h-screen">
          <div className="flex flex-col w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
