// import React, {Component} from 'react';
// import axios from 'axios';
// import SinglePost from "./singlePost"
// const auth = JSON.parse(localStorage.getItem('authentication'));
// let userid = null;
// if (auth) {
//     userid = auth.userId
// }

// class SingleAudioPosts extends Component{
//     state = {
//     posts: []
//   }

//   componentDidMount(){
//     axios.get('http://192.168.56.1:8000/posts/users/' + userid)
//     .then(response => {
//         console.log(response)
//         this.setState({
//             posts: response.data.data
//         });
//     });
  
//   }

  

//     render() {
        
//         const posts = this.state.posts.map(post => {
//             return <SinglePost key={post.id} 
//             singleaudiolink={post.audioLink} 
//             singlesongPlay={post.audioLink}/>
//         });
//         return(
//             <div>
//                 {posts}
//             </div>
//         )
//     }
// }

// export default SingleAudioPosts;