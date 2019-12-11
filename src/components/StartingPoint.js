import React, { Component } from 'react';

const StartingCoordinates = [39.0551638,-94.5881978]

// const coordset = https://www.google.com/maps/@{StartingCoordinates[0]},{StartingCoordinates[1]},15z

class StartingPoint extends Component {
    render(){
        const url = `https://www.google.com/maps/@${StartingCoordinates[0]},${StartingCoordinates[1]},15z`
        // const otherurl = "https://www.google.com/maps/@" + StartingCoordinates[0] + "," + StartingCoordinates[1] + ",15z"
    
        return(
            <div>
            <a href="www.google.com">test link to google</a>
            <br></br>
            <a href={url}> this test to StartingCoordinates</a>
            <h2>https://www.google.com/maps/@{StartingCoordinates[0]},{StartingCoordinates[1]},15z</h2>
           
            </div>
        )

    }
}

export default StartingPoint;
