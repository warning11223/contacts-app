import React from 'react';
import {Button} from "antd";

import styles from './Header.module.css'
import {RootState, useAppDispatch} from "../../store";
import {isLogout} from "../../store/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Error from "../Error/Error";

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentUser, status } = useSelector((state: RootState) => state.users)

    const logoutHandler = () => {
        try {
            dispatch(isLogout());
        } catch (e) {
            console.log(e)
        }
        navigate('/login');
    }

    if(status === 'rejected') {
        return <Error />
    }

    return (
        <header className={styles.header}>
            <h1>Hello, {currentUser}! </h1>
            <Button
                className={styles.header_button}
                onClick={logoutHandler}
            >Logout</Button>
        </header>
    );
};

export default Header;
