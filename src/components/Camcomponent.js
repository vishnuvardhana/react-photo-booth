import React, { Component } from 'react';


class Camcomponent extends Component {
    componentDidMount() {
       
        window.Webcam.attach( '#web-cam' );
        
    }
    
    render() {
        return (
          <div id="web-cam" style={{'width': '800px', 'height':'300px'}}></div>
            
        );
    }
}

export default Camcomponent ;