import React, { Component } from 'react';
import Table from './components/FoodBanks.js';
import data from './components/FoodBanks.json';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar.js';
import StartingPoint from './components/StartingPoint.js';
import './App.css';


class App extends Component {
  
  render(){
    const foodBanks = data
    
    return (
       <div className="App">
         
        <h1>Social Services WebApp</h1>
        <NavBar />
        <Table foodBankData={foodBanks}/>
        <br/>
        <Button variant="contained" color="primary">
          Nearest Food Bank
        </Button>
        <br/>
        <p>Here would be the map to show locations and nearest foodbank? </p>
        <br/>
        <StartingPoint />
        </div>
    );    
  }
 
}  
export default App;
