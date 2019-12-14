import React, { Component } from 'react';

class StartingPoint extends Component {
    render(){
        console.log (this.props);
        //console.log(latitude);
        const url = `https://www.google.com/maps/@${this.props.latitude},${this.props.latitude}`;
        return(
            <div>
            <a href={url} target="_blank" rel="noopener noreferrer">Google Maps</a>
            </div>
        )

    }
}

export default StartingPoint;