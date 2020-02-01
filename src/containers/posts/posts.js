import React, {Component} from 'react';
import axios from 'axios';
import Post from "../../components/post/post";

const authToken = localStorage.getItem('token');

class Posts extends Component{
    state = {
    posts: []
  }

    componentDidMount(){
        axios.get('http://192.168.56.1:8000/posts/', {
            headers : {
                Authorization : 'Bearer ' + authToken
            }
        })
        .then(response => {
            console.log(response)
            this.setState({
                posts: response.data.data
            });
        });


       
    
    }

  

    render() {
        const posts = this.state.posts.map((post,index) => {
            return <Post key={index} 
            postids = {post.pid}
            username={post.username}
            audiolink={post.audioLink} 
            songPlay={post.audioLink}/>
        });
        return(
            <div>
                {posts}
            </div>
        )
    }
}

export default Posts;