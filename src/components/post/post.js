import React, { Component } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';
import "./post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMusic, faStop} from '@fortawesome/free-solid-svg-icons';
import Logo from "../../avtar.jpeg";
import Ritzzy from "../../ritzzy.png";
import { faSpinner, faVolumeMute, faVolumeUp, faRedo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const currentUser = localStorage.getItem('userId');
const authToken = localStorage.getItem('token');
class Post extends Component{
    constructor(props){
        super(props)

        this.state = {
            playing: false,
            loaded: false,
            loop: false,
            mute: false,
            stop:false,
            volume: 1.0,
            userid:'',
            postid:'',
            like : 0,
            isLiked:false
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleOnLoad = this.handleOnLoad.bind(this)
        this.handleOnEnd = this.handleOnEnd.bind(this)
        this.handleOnPlay = this.handleOnPlay.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.renderSeekPos = this.renderSeekPos.bind(this)
        this.handleLoopToggle = this.handleLoopToggle.bind(this)
        this.handleMuteToggle = this.handleMuteToggle.bind(this)
    }

    componentWillUnmount () {
    this.clearRAF()
  }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }

  handleOnPlay () {
    this.setState({
      playing: true,
      stop: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.player.stop()
    this.setState({
      playing: false, // Need to update our local state so we don't immediately invoke autoplay
      stop:false
    })
    this.renderSeekPos()
  }

  handleLoopToggle () {
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    })
  }

  renderSeekPos () {
    this.setState({
      seek: this.player.seek()
    })
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  componentDidMount(){
    setInterval(()=>{
      axios.get('http://192.168.56.1:8000/posts/reacts/ ' + this.props.postids, {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
        .then(response => {
          console.log(response.data.data.length);
          this.setState({
            like: response.data.data.length
          });
        });


    }, 100)
     
  }

  handleLikes(){
    console.log(this.props.postids,  currentUser)
    fetch('http://127.0.0.1:8000/posts/react', {
            method : "POST",
            headers: {
            "Accept":"application/json",
            "Content-Type" : "application/json",
            Authorization : 'Bearer ' + authToken
        },
            body:JSON.stringify({userid:currentUser,postid:this.props.postids})
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


    render(){
        let loader = ""
        if(!this.state.loaded){
           loader = <FontAwesomeIcon className="spinner" icon={faSpinner}/>
        }

        
        return (
            <div>
            <ReactHowler
              src={this.props.songPlay}
              key={this.props.postid}
              playing={this.state.playing}
              onLoad={this.handleOnLoad}
              onPlay={this.handleOnPlay}
              onEnd={this.handleOnEnd}
              loop={this.state.loop}
              mute={this.state.mute}
              seek={this.renderSeekPos}
              volume={this.state.volume}
              ref={(ref) => (this.player = ref)}
            />
         
     <section className="posts">
    <div className="post">
        <div className="profile">
            <div className="image">
                <img src={Logo} alt="Avtar" />
            </div>
            <div className="name">@{this.props.username}</div>
        </div>
       {/* <progress value={(this.state.seek !== undefined) ? this.state.seek.toFixed(2) : '0.00'} max={(this.state.duration) ? this.state.duration.toFixed(2) : '100'}></progress> */}
       {/* <div className="times">
         <div>
           {(this.state.seek !== undefined) ? this.state.seek.toFixed(2) : '0.00'}
          </div>
          <div>
            {(this.state.duration) ?  this.state.duration.toFixed(2) : '0.00'}
            </div>
         </div> */}
        <div className="audios" >
            <div className={(this.state.playing ? 'avtar-active' : 'avtar')}>
                <img src={(this.state.playing) ? Ritzzy: Logo} alt="Avtar" onChange={this.handleStop} onClick={this.handleToggle} />
                 {
                     loader
                 }
            </div>
        </div>
        <div className="react">
           <div className="likes">
            
             <FontAwesomeIcon icon={faHeart} className="heart" onClick={()=>this.handleLikes()} /> 
             <input type="text" style={{display:'none'}} name="userid" value={currentUser} onChange={(event) =>{this.setState({userid : event.target.value})} } />
             <input type="text" style={{display:'none'}} name="postid" value={this.props.postids} onChange={(event) =>this.setState({postid : event.target.value})} />
               {this.state.like}
             </div>
             <div className="comments">
                 <FontAwesomeIcon icon={faStop} className={(this.state.stop ? 'icon-red' : 'icon-orange')} onClick={this.handleStop} />
                 <FontAwesomeIcon icon={(this.state.loop ? faMusic : faRedo)} onClick={this.handleLoopToggle}/>
                 <FontAwesomeIcon icon={(this.state.mute ? faVolumeMute : faVolumeUp)} onClick={this.handleMuteToggle}/>
             </div>
          
        </div>

    </div>
     </section>
     </div>
);
    }
}
export default Post;