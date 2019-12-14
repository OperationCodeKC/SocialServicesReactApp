import React, { Component } from 'react';
import Table from './components/FoodBanks.js';
import data from './components/FoodBanks.json';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar.js';
import StartingPoint from './components/StartingPoint.js';
import { geolocated } from "react-geolocated";
import './App.css';


class App extends Component {
  
  render(){
    const foodBanks = data
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : coords ? (
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
        <StartingPoint latitude={coords.latitude} longitude={coords.longitude} />
        <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{coords.longitude}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : (
      <div>Getting the location data&hellip; </div>
  );
  }
 
}  
export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
