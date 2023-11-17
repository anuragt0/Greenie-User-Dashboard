import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
    <Toaster toastOptions={{ duration: 4000 }} />
        <Routes>
            <Route exact path = '/create' element = {
            <>
                <Navbar/>
                <Register/>
            </> }/>
            <Route exact path = '/dashboard' element = {<>
                <Navbar/>
                <Dashboard/>
            </> }/>
        </Routes>
    </Router>
  );
}

export default App;
