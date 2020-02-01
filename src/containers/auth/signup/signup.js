import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Logo from "../../../ritzzy.png";
import "./signup.css";

class Signup extends Component {

    constructor(){
        super();
        this.state = {
            name: null,
            email: null,
            password: null,
            loader:false
        }
    }

    signup(){
        fetch('http://127.0.0.1:8000/users', {
            method : "POST",
            headers: {
            "Accept":"application/json",
            "Content-Type" : "application/json"
        },
            body:JSON.stringify(this.state)
        }).then(result => {
            result.json().then(response => {
                console.log(response);
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false,
                error: err
            });
        });
    }

    render() {
        return (
            <div>
                <div className="signup">
                    <img src={Logo} alt="ritzzy"/>
                    <h2>Signup here</h2>
                    <div className='form'>
                        <form>
                            <div className="form-control">
                                <input type="text" placeholder="Enter your name" onChange={(event)=> {this.setState({name:event.target.value})}} />
                            </div>
                            <div className="form-control">
                                <input type="email" placeholder="Enter your email" onChange={(event)=> {this.setState({email:event.target.value})}} />
                            </div>
                            <div className="form-control">
                                <input type="password" placeholder="Enter your password" onChange={(event)=>{this.setState({password:event.target.value})}} autoComplete="false" />
                            </div>
                            <div className = "form-control" >
                                <input type="submit" className="submit" value="Signup" onClick={() => {this.signup()}} />
                                <Link to={{pathname:"/login"}}>Switch to Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;