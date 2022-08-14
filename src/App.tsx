import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Page404 from "./pages/Page404";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import Header from "./components/Header/Header";

function App() {
    const { isAuth } = useSelector((state: RootState) => state.auth)

  return (
    <div >
        {isAuth && <Header />}
        <Routes>
            <Route path='/' element={isAuth ? <Navigate to='/main' /> : <Navigate to='/login' />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/main' element={<MainPage />}/>
            <Route path='*' element={<Page404 />}/>
        </Routes>
    </div>
  );
}

export default App;
