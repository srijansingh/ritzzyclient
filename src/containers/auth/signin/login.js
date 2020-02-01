import React, { Component } from "react";
// import axios from "axios";
import Logo from "../../../ritzzy.png";
import {Redirect, Link} from 'react-router-dom';
import "./login.css";

// import auth from "../auth";


class LoginPage extends Component{
    constructor()
    {
        
        super();
        this.state={
            authenticated: false,
            loading: false,
            email: null,
            password: null,
            token:null,
            store:null,
            userid:null,
            isSignup:false
        }
        // this.authenticated = false;
    }

    componentDidMount(){
        if(this.state.authenticated){
            const token = localStorage.getItem('token');
            const expiryDate = localStorage.getItem('expiryDate');
            if (!token || !expiryDate) {
                return;
            }
            if (new Date(expiryDate) <= new Date()) {
                this.logoutHandler();
                return;
            }
            if (token) {
                const userid = localStorage.getItem('userId');
                const remainingMilliseconds =
                    new Date(expiryDate).getTime() - new Date().getTime();
                this.setState({
                    authenticated: true,
                    token: token,
                    userid: userid
                });
                this.setAutoLogout(remainingMilliseconds);
            }
        }
       
       
    }


    logoutHandler = () => {
         this.setState({
             authenticated: false,
             token: null
         });
         localStorage.removeItem('token');
         localStorage.removeItem('expiryDate');
         localStorage.removeItem('userId');
     };


    login(){
        fetch('http://127.0.0.1:8000/login',
        {
            method:"POST",
            headers: {
            "Accept":"Application/json",
            "Content-Type" : "application/json"
        },
            body:JSON.stringify(this.state)
        }).then(res => {
            res.json().then(results => {
                console.log(results);
                localStorage.setItem('token', results.token);
                localStorage.setItem('userId', results.userId);
                if(results){
                    this.setState({
                        authenticated : true
                    })
                }
                 const remainingMilliseconds = 60*60*1000;
                 const expiryDate = new Date(
                     new Date().getTime() + remainingMilliseconds
                 );
                 localStorage.setItem('expiryDate', expiryDate.toISOString());
                 this.setAutoLogout(remainingMilliseconds)
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                authenticated: false,
                loading: false,
                error: err
            });
         });
    }


    setAutoLogout = milliseconds => {
         setTimeout(() => {
             this.logoutHandler();
         }, milliseconds);
     };

render() {
    const authToken = localStorage.getItem('token');
    return (
        <div>
            {
                authToken ? <Redirect to="/" /> 
                
                :

                <div className="login">
                    <img src={Logo} alt="ritzzy"/>
                    <h2>Login here</h2>
                    <div className='form'>
                        <form>
                            <div className="form-control">
                                <input type="email" placeholder="Enter email" onChange={(event)=> {this.setState({email:event.target.value})}} />
                            </div>
                            <div className="form-control">
                                <input type="password" placeholder="Enter password" onChange={(event)=>{this.setState({password:event.target.value})}} autoComplete="false" />
                            </div>
                            <div className = "form-control" >
                                <input type="submit" className="submit" value="Login" onClick={()=>{this.login()}} />
                                <Link to={{pathname:"/signup"}}>Switch to Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            }
                       
        </div>
        )
}
}

export default LoginPage; 