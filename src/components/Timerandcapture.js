import React, { Component } from 'react';
import {timerConstants} from '../constants/constants';
import Camcomponent from './Camcomponent';
import Previewimages from './Previewimages';

class Timerandcapture extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
                        timerValue: 7,
                        numberOfSecondsToTakeAPic: timerConstants.numberOfSecondsToTakeAPic,
                        playBeebFromSeconds: timerConstants.playBeebFromSeconds, 
                        infoText: timerConstants.infoText,
                        totalNumberOfPicsToBeTaken: timerConstants.totalNumberOfPicsToBeTaken,
                        capturedImages: [],
                        showPreview: false,
                        previewImageUrl: '',
                    };

        this.state.timerValue = this.state.numberOfSecondsToTakeAPic;

        this.beepSound =  new Audio('https://s3.us-west-2.amazonaws.com/tempsounds/countdown-timer.mp3');
        this.shutterSound =  new Audio('https://s3.us-west-2.amazonaws.com/tempsounds/camera-shutter-click-01.mp3');

        this.startTimer = this.startTimer.bind(this);
        this.playShutterSound = this.playShutterSound.bind(this);
        this.playBeepSound = this.playBeepSound.bind(this);
        this.proceedForNextPicture = this.proceedForNextPicture.bind(this);
        this.restartCapture = this.restartCapture.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    playShutterSound() {
        let shutter  = this.shutterSound;
        shutter.autoplay = false;
        shutter.play();
    }

    playBeepSound() {
        let beepSound = this.beepSound;
        beepSound.autoplay = false;
        beepSound.play();
    }

    restartCapture() {
        this.setState({
            showPreview: false,
            totalNumberOfPicsToBeTaken: timerConstants.totalNumberOfPicsToBeTaken,
            numberOfSecondsToTakeAPic: timerConstants.numberOfSecondsToTakeAPic,
            timerValue:  timerConstants.numberOfSecondsToTakeAPic,
        });

        this.startTimer();
    }

    proceedForNextPicture(timer) {
        let self = this;

        // play shutter sound
        self.playShutterSound();

        // this timeout is for capturing image
        setTimeout(()=>{
             // capture images using webcamjs
            window.Webcam.snap( function(data_uri) {

                self.setState({
                    infoText: timerConstants.processingText,
                    timerValue: '',
                });

                // pushing data into a state variable
                self.state.capturedImages.push(data_uri);

            // this timeout is for displaying preview image
            setTimeout(()=>{

                    // changing values for preview
                    self.setState({
                        infoText: timerConstants.onShowPreviewText,
                        showPreview: true,
                        previewImageUrl: data_uri,
                    });

                    // this timeout is for starting timer backagain
                    setTimeout(()=>{
                        //restarting timer with new values
                        self.setState({
                            showPreview: false,
                            timerValue: 4,
                            infoText: 'Ok, Get Ready!',
                            totalNumberOfPicsToBeTaken: self.state.totalNumberOfPicsToBeTaken - 1,
                            numberOfSecondsToTakeAPic: 4,
                        });

                        // after number of totalNumberOfPicsToBeTaken is done clear the process.
                        if(self.state.totalNumberOfPicsToBeTaken === 0) {
                            clearInterval(timer);

                        }
                    }, 1000);
                }, 1000);
            });
        }, 1000)
    }

    startTimer() {
        const timer = setInterval(()=>{
            if(!this.state.timerValue) {
                return;
            }

            let currentTimerValue = this.state.timerValue;
            

             // decreasing timer value
            currentTimerValue -= 1;

            // resetting timervalue
            this.setState({
                timerValue: currentTimerValue,
            });

            // checking if we need to show beep sound
            if(currentTimerValue> 0 && currentTimerValue <=3) {
                this.playBeepSound();
            }   

            // 1. audio sound when picture is taken, 2. proceed for next picture
            if(currentTimerValue === 0) {
                const self = this;

                this.proceedForNextPicture(timer);
            }
        }, 1000) 
    }

    render() {
        let textToDisplay = this.state.timerValue === 0 ? timerConstants.onCaptureText : this.state.timerValue ;
        let applyThisStyle = this.state.timerValue === 0 ? {opacity: '0.9', background: '#FFF'} : {};

        if(this.state.totalNumberOfPicsToBeTaken === 0) {

            return (<Previewimages images = {this.state.capturedImages} restartCapture = {this.restartCapture}/>)
        }

        return (
                <div>
                <Camcomponent/>
                {this.state.showPreview ? 
                    <div className ='show-preview' id='preview-captured-image'>
                        <div className='image-preview-text'>{this.state.infoText}</div>
                        <img src={this.state.previewImageUrl}/>
                    </div> 
                    : 
                    <div className = 'info-text' style = {applyThisStyle}>
                        <p>{this.state.infoText}</p>
                        <br/><h2>{textToDisplay}</h2>
                    </div>
                }
                </div>
            );
    }

}

export default Timerandcapture;