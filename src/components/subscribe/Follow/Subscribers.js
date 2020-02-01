import React, { Component } from 'react';
import Logo from "../../../avtar.jpeg";
import "./Subscribers.css";

class Sub extends Component{
    render() {
        return (
            <div className = "follow">
                <div className="profiles">
                    <div className="logo">
                        <img src={Logo} alt=""/>
                    </div>
                    <div className="user">
                        @{this.props.username}
                    </div>
                </div>
                <div className="btn" id={this.props.userid}>Follow</div>
            </div>
        )
    }
}

export default Sub;