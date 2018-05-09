import React, { Component } from 'react';
import {timerConstants} from '../constants/constants';


class Previewimages extends Component {

    render() {
        const MultipleChildren = props => props.children; // react 16 goodness

        const PreviewThumbImages = this.props.images.map((imgUrl, index)=>{
            return (<div key={index} className='preview-thumb'> 
                        <img src={imgUrl}/><br/> {'Image ' + (index + 1 )} 
                    </div>
                    )
        });

        return (
            <MultipleChildren>
                {PreviewThumbImages}
                <br/>
                <button onClick = {()=>{this.props.restartCapture()}}>Restart Capture</button>
            </MultipleChildren>
        )
    }
}

export default Previewimages;