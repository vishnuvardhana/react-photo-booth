import React, { Component } from 'react';
import './App.css';
import Timerandcapture from './components/Timerandcapture';

class App extends Component {
  constructor(props) {
    super(props);

    this.beepSound =  new Audio('https://s3.us-west-2.amazonaws.com/tempsounds/countdown-timer.mp3');
    this.shutterSound =  new Audio('https://s3.us-west-2.amazonaws.com/tempsounds/camera-shutter-click-01.mp3');

  }
  render() {
    return (
      <div className="App">
          <Timerandcapture beepSound= {this.beepSound} shutterSound = {this.shutterSound}/>
      </div>
    );
  }
}

export default App;
