import './App.css';
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  
  return (
    <>
    <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
    </Routes>
    <SpeedInsights/>
    </>
    
  );
}

export default App;
