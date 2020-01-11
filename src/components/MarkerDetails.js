import React, { Component } from 'react';
import '../App.css';



class MarkerDetails extends Component {
    
    render(){
   
    return(
        
        <div className="tooltip">
            <img src= "/images/burger.jpg" alt="food" height='30px' width='30px'/> 
             
            <span className="tooltiptext"></span>
        </div>
            )
        }
}
export default MarkerDetails;