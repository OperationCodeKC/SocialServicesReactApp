import React, { Component } from 'react';
import '../App.css';
import { Button } from '@material-ui/core';


class NavBar extends Component {
    
    render(){
   
    return(
        <div className="navBarCards">
  <Button>
  <div className="column">
    <h2>Food Resources</h2>
    <img src="/images/burger.jpg" alt="shelter" height='100vh' width="100vh"/>
  </div>
  </Button>
  <Button>
  <div className="column">
    <h2>Shelters</h2>
    <img src="/images/shelter.png" alt="shelter" height='100vh' width="100vh"/>
  </div>
  </Button>
  <Button>
  <div className="column">
    <h2>Medical/Health</h2>
    <img src="/images/health.png" alt="shelter" height='100vh' width="100vh"/>
  </div>
  </Button>
</div>
    )
}
}
export default NavBar;