import React, { Component } from 'react';
import "./singlePost.css";
import ReactHowler from 'react-howler';
import raf from 'raf';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faMusic, faStop} from '@fortawesome/free-solid-svg-icons';

class Singlepost extends Component{
    constructor(props){
        super(props)

        this.state = {
            playing: false,
            loaded: false,
            loop: false,
            mute: false,
            stop:false,
            volume: 1.0
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









    render() {
        return (
        <div>
            <ReactHowler
          src={this.props.songPlay}
          key={this.props.audioid}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
        />
    
            <section className={(this.state.playing ? 'play-singlepost' : 'singlepost')} onChange={this.handleStop} onClick={this.handleToggle}>
            
            </section>
        </div>
        )
    }
}

export default Singlepost;