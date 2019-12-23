import React, { Component } from 'react';
import Table from './components/FoodBanks.js';
import data from './components/FoodBanks.json';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar.js';
import StartingPoint from './components/StartingPoint.js';
import { geolocated } from "react-geolocated";
import './App.css';
import ReactMapboxGl, { Layer, Feature, ZoomControl, GeoJSONLayer } from 'react-mapbox-gl';
import geojson from 'geojson'

class App extends Component {
  
  render(){
    const foodBanks = data
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const Map = ReactMapboxGl({
      accessToken:
      'pk.eyJ1IjoiY29saW5waGlsbGlwczY3IiwiYSI6ImNrMGZvd2MyaDAxdG8zbHJ6MmFnNnZpaTUifQ.tJ63Dty8f2DWdS1jenXPCA'
    });
    const newInfo = geojson.parse(data, {Point:['Latitude','Longitude'], include:['Name']});

    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : coords ? (
       <div className="App">
         
        <h1 className="title">Social Services WebApp</h1>
        <NavBar />
        
        <Table foodBankData={foodBanks}/>
        <br/>
        <Button variant="contained" color="primary">
          Nearest Food Bank
        </Button>
        
        <div className="map">
          <Map  className="mapbox" style={"mapbox://styles/mapbox/streets-v9"}
                center={[coords.longitude, coords.latitude]}
                containerStyle={{
                height: '60vh',
                width: '80vw'
                }}>
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[-94.5155052, 39.0551725]} />          
            </Layer>
          <ZoomControl/>
          </Map>
        </div>
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
