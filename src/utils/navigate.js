// Navigate.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigate = ({ to, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(to); // Điều hướng đến đường dẫn được cung cấp
    };
  
    return (
      <button onClick={handleClick}>
        {children}
      </button>
    );
  };


export default Navigate;
