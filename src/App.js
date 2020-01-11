import React, { Component } from 'react';
import Table from './components/FoodBanks.js';
import NavBar from './components/NavBar.js';
import StartingPoint from './components/StartingPoint.js';
import { geolocated } from "react-geolocated";
import './App.css';
import Map from './components/Map.js';

class App extends Component {
    render(){
      const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
   
    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
      ) : coords ? (

      <div className="App">
        <h1 className="title">Social Services WebApp</h1>
          <NavBar />
          <Map coords = {coords}/>
          <Table/>
          <div className="footer">
            <p>Current lat/long {coords.latitude},{coords.longitude}</p>
            <StartingPoint latitude={coords.latitude} longitude={coords.longitude} />
          </div>
      </div>
      ) : (
      <div className="_welcome">Getting your current location...&hellip; </div>
  );
  }
 
}  

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
