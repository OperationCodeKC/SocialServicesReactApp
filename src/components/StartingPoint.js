import React, { Component } from 'react';

const StartingCoordinates = [39.0551638,-94.5881978]


class StartingPoint extends Component {
    
    render(){
        
        return(
            <div>
            <a href="www.google.com">test link to google</a>
            <br></br>
            <a href="https://www.google.com/maps/@{StartingCoordinates[0]},{StartingCoordinates[1]},15z">this test to StartingCoordinates</a>
            <h2>https://www.google.com/maps/@{StartingCoordinates[0]},{StartingCoordinates[1]},15z</h2>
            </div>
        )

    }
}

export default StartingPoint;
