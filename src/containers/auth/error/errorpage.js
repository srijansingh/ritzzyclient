import React, {Component} from 'react';
import Logo from "../../../ritzzy.png";
import "./error.css";
class errorpage extends Component{
    render() {
        return (
            <div className="errorpage">
                <img src={Logo} alt="ritzzy" />
                <div className="notfound">This path is not available</div>
            </div>
        )
    }
}

export default errorpage;