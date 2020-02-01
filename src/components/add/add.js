import React, { Component } from 'react';
import "./add.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMusic } from '@fortawesome/free-solid-svg-icons';
class Add extends Component{
    state = {
        selectedFile:null
    }
    fileChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile:URL.createObjectURL(event.target.files[0])
        })
    }
    render() {
        return(

            <div className="Add">
                <div className="new">
                    <div className="btnss">New Post</div>
                    <input type="file" style={{display:'none'}} onChange={this.fileChangeHandler} ref={chooseFile => this.chooseFile = chooseFile} accept="audio/mp3"/>
                    <div className="btnss" onClick={() => this.chooseFile.click()}><FontAwesomeIcon icon={faMusic}/></div>
                </div>
                <div className="audio">
                    <audio ref="audio_tag" src={this.state.selectedFile} controls autoPlay/>
                </div>
                <div className="audiodes">
                    <textarea className="textarea" />
                </div>
                <div className="upload">Post Now</div>
            </div>
        )
    }
}

export default Add;


               