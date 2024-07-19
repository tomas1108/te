import React, { useState , Suspense, lazy } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import DashboardLayout from '../layouts/dashboard';




const Loadable = (Component) => (props) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

const InternalNavigation = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <GeneralApp />;
      case 'settings':
        return <SettingPage />;
      case 'group':
        return <GroupPage />;
      case 'call':
        return <CallPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <GeneralApp />;
    }
  };

  return (
    <DashboardLayout>
      <nav>
        <ul>
          <li><button onClick={() => setCurrentPage('home')}>Home</button></li>
          <li><button onClick={() => setCurrentPage('settings')}>Settings</button></li>
          <li><button onClick={() => setCurrentPage('group')}>Group</button></li>
          <li><button onClick={() => setCurrentPage('call')}>Call</button></li>
          <li><button onClick={() => setCurrentPage('profile')}>Profile</button></li>
        </ul>
      </nav>
      {renderPage()}
    </DashboardLayout>
  );
};

export default InternalNavigation;


const GeneralApp = Loadable(
    lazy(() => import("../pages/dashboard/GeneralApp")),
  );
  
  const GroupPage  = Loadable (
    lazy (() => import("../pages/dashboard/GeneralGroup"))
  );
  
  const CallPage  = Loadable (
    lazy (() => import("../pages/dashboard/Call"))
  );
  
  const ProfilePage  = Loadable (
    lazy (() => import("../pages/dashboard/Settings/Profile"))
  );
  
  
  const SettingPage = Loadable(
    lazy(() => import("../pages/dashboard/Settings")),
  );
  
  const LoginPage  = Loadable (
    lazy (() => import("../pages/auth/Login"))
  );
  
  const ResetPasswordPage  = Loadable (
    lazy (() => import("../pages/auth/ResetPassword"))
  );
  
  const NewPasswordPage  = Loadable (
    lazy (() => import("../pages/auth/NewPassword"))
  );
  
  
  const RegisterPage  = Loadable (
    lazy (() => import("../pages/auth/Register"))
  );
  
  
  const OTPPage  = Loadable (
    lazy (() => import("../pages/auth/OTP"))
  );
  
  const VerifyPage  = Loadable (
    lazy (() => import("../pages/auth/Verify"))
  );
  
  
  
  const Page404 = Loadable(
    lazy(() => import("../pages/Page404"))
  );
  