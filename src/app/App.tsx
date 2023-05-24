import AppNavigate from './AppNavigate'
import modules from "../modules";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Suspense, useCallback } from 'react';
import Notification from "../main/components/Notification";
import Loader from "../main/components/Loader";
import ThemeSelector from "../main/theme/ThemeSelector";


const App = () => {

  const renderModules = useCallback(
    () => modules.map((module) => module()),
    []
  );
  
  return (
    <BrowserRouter>
      <AppNavigate />
      <ThemeSelector />
      <Notification />
      <Suspense fallback={<Loader />}>
        <Routes>{renderModules()}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
