import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

const App=()=>{
    const {user}=useAuthContext();
    return(
        <div className="App">
            <BrowserRouter>
            <Navbar></Navbar>
                <div className="pages">
                    <Routes>
                        <Route path='/' 
                        element={user?<Home/>:<Navigate to='/signin'></Navigate>}></Route>
                        <Route path='/signin' 
                        element={!user?<Signin/>:<Navigate to='/'></Navigate>}></Route> 
                        <Route path='/signup' 
                        element={!user?<Signup/>:<Navigate to='/'></Navigate>}></Route>  
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;