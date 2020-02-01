import React, { Component } from 'react';
import Singlepost from "../post/singlePost";
import axios from "axios";
import "./user.css";
import Logo from "../../avtar.jpeg";
const authToken = localStorage.getItem('token');
const userid = localStorage.getItem('userId');
class User extends Component{
     state = {
         users: [],
         singleposts: []
     }

     componentDidMount() {

         axios.get('http://192.168.56.1:8000/users/' + userid, {
             headers : {
                 Authorization: 'Bearer ' + authToken
             }

         }).then(response => {
                 console.log(response.data.data)
                 this.setState({
                     users: response.data.data
                 })     
             });


        axios.get('http://192.168.56.1:8000/posts/users/' + userid, {
            headers: {
                Authorization: 'Bearer ' + authToken
            }

        }).then(response => {
                console.log(response.data.data);
                this.setState({
                    singleposts: response.data.data,
                    // countPost : response.data.data.length
                })
            })
     }

    render(){
        const usersname = this.state.users.username;
        const singleposts = this.state.singleposts.map((posts,index) => {
            return <Singlepost key={index} 
            audioid={posts.pid} 
            songPlay={posts.audioLink}/>
        });
        const countPost = singleposts.length
        
        return (
    <div className="User">
        <div className="header">
            <div className="head">
                <img src={Logo} alt="User"/>
            </div>
        </div>
        <div className="specification">
            <div className="username">
                @{usersname}
            </div>
            < div className = "follower">
            <div className="followers">
            <div className="count">{countPost}</div>
                <div className="specific">Posts</div>
            </div>
            <div className="followers">
                <div className="count">11</div>
                <div className="specific">Followers</div>
            </div>
            <div className="followers">
                <div className="count">11</div>
                <div className="specific">Following</div>
            </div>
            </div>
        </div>
        <div className="Posts">
            {singleposts}
        </div>
    </div>
);
    }
} 

export default User;