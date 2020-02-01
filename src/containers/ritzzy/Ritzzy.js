import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import ProtectedRoute from "../auth/protectedroutes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Posts from "../posts/posts";
import User from "../../components/users/user";
import Subscribe from "../../components/subscribe/subscribe";
import Add from "../../components/add/add";
import LoginPage from "../auth/signin/login";
import Signup from "../auth/signup/signup";
import errorpage from "../auth/error/errorpage";
import Logo from "../../ritzzy.png";
import "./Ritzzy.css";

class Ritzzy extends Component {
    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <Switch>
                        <ProtectedRoute path="/" exact component={Posts}/>
                        <ProtectedRoute path="/add" component={Add} />
                        <ProtectedRoute path="/profile" component={User} />
                        <ProtectedRoute path="/contact" component={Subscribe} />
                        <Route path = "/login" exact component = {LoginPage}/>
                        <Route path = "/signup" exact component = {Signup}/>
                        <Route path = "*" component={errorpage} />
                    </Switch>
                </div>
                <header>
                   <div className="logo">
                       <img src={Logo} alt="ritzzy" />
                   </div>
                   <div className="ritzzyradio">Ritzzy Radio</div>
                </header> 
                  <footer>
                    <NavLink to={{pathname:"/"}} exact > < FontAwesomeIcon icon = {faHome}/> </NavLink>
                    <NavLink to={{pathname:'/add'}}>< FontAwesomeIcon icon = {faPlus}/></NavLink>
                    <NavLink to={{pathname:'/contact'}}>< FontAwesomeIcon icon = {faUser}/></NavLink>
                    <NavLink to={{pathname:'/profile'}}>< FontAwesomeIcon icon = {faUserCircle}/></NavLink>
                </footer>
            </div>
        )
    }
}

export default Ritzzy;

