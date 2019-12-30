import React, { Component } from 'react';
import '../App.css';
import shelter from './shelter.png';
import food from './burger.jpg';
import medic from './health.png';
import { Button } from '@material-ui/core';

class NavBar extends Component {
    
    render(){
        const shelterp = shelter;
        const medicp = medic;
        const foodp = food;
    return(
        <div className="navBarCards">
  <Button>
  <div className="column">
    <h2>Food Resources</h2>
    <img src={foodp} alt="shelter" height='100vh' width="100vh"/>
  </div>
  </Button>
  <Button>
  <div className="column">
    <h2>Shelters</h2>
    <img src={shelterp} alt="shelter" height='100vh' width="100vh"/>
  </div>
  </Button>
  <Button onClick={console.log('Not Working')}>
  <div className="column">
    <h2>Medical/Health</h2>
    <img src={medicp} alt="shelter" height='100vh' width="100vh"/>
  </div>
  </Button>
</div>
    )
}
}
export default NavBar;