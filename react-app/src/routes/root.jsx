
import {
    Outlet,
    NavLink,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { useState, useEffect, useContext, createContext } from 'react';

export default function Root() {
    const navigation = useNavigation();
    const submit = useSubmit();

    return (
        <div className="app">
            <div className="side">
                <div className="side-liner">
                    <h1>Tasks!</h1>
                    <nav className="global-nav">
                        <NavLink to={``} className={({ isActive }) => isActive ? "active" : ""} >Home</NavLink>
                        <NavLink to={`tasks`} className={({ isActive }) => isActive ? "active" : ""} >Tasks</NavLink>
                        <NavLink to={`completed-tasks`} className={({ isActive }) => isActive ? "active" : ""} >Completed Tasks</NavLink>
                        <NavLink to={`about`} className={({ isActive }) => isActive ? "active" : ""} >About</NavLink>
                    </nav>
                </div>
            </div>
            <div className="main">
                <div className="content">
                    <Outlet />
                </div>
                <div className="footer">
                    Steven Soblo
                </div>
            </div>
        </div>
    );
}