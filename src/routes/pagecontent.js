import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const usePage = () => {
  return useContext(PageContext);
};

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState('login');

  const changePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <PageContext.Provider value={{ page, changePage }}>
      {children}
    </PageContext.Provider>
  );
};
