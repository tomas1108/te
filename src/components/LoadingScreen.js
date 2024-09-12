import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      width: '100vw', // Full viewport width
      position: 'fixed', // Ensure it stays in place
      top: 0,
      left: 0,
      backgroundColor: '#fff', // Optional: background color
      zIndex: 1000 // Optional: ensure it appears above other content
    }}>
     <CircularProgress />
    </div>
  );
};

export default LoadingScreen;
