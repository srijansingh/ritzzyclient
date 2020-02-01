import React, {Component} from 'react';
import axios from 'axios';
import "./subscribe.css";
import Sub from "./Follow/Subscribers";
const authToken = localStorage.getItem('token');
class Subscribe extends Component{
    state = {
        loading : false,
        users : []
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/users', {
            headers: {
                Authorization : 'Bearer ' + authToken
            }
        }).then(response => {
            console.log(response);
            this.setState({
                users : response.data.data
            })
        })
    }

    render() {
        const users = this.state.users.map((user,index) => {
            return <Sub 
            key={index} 
            username={user.username} 
            images={user.images} 
            userid={user.id}
            />
        })
        return (
            <div className="Subscribe">
                {users}
            </div>
        );
    }
}

export default Subscribe;