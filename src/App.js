import React, { Component } from 'react';
import Table from './components/FoodBanks.js';
import Button from '@material-ui/core/Button';
import NavBar from './components/NavBar.js';
import StartingPoint from './components/StartingPoint.js';
import { geolocated } from "react-geolocated";
import './App.css';
import ReactMapboxGl, { Marker, ZoomControl, directions} from 'react-mapbox-gl';
import geojson from 'geojson';
import geoFoodBanks from './components/geoBanks.json';
import geoShelters from './components/geoShelters.json';
import geoHealths from './components/geoHealth.json';
import MarkerDetails from "./components/MarkerDetails.js";

class App extends Component {
  render(){
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const Map = ReactMapboxGl({
      accessToken:
      'pk.eyJ1IjoiY29saW5waGlsbGlwczY3IiwiYSI6ImNrMGZvd2MyaDAxdG8zbHJ6MmFnNnZpaTUifQ.tJ63Dty8f2DWdS1jenXPCA'
    },
    
    );

// const directions = new MapboxDirections

    const geoFood = geojson.parse(geoFoodBanks, {Point:['lat','lng'], include:['Name']['Address']});
    const geoShelter = geojson.parse(geoShelters, {Point:['lat','lng'], include:['Name']});
    const geoHealth = geojson.parse(geoHealths, {Point:['lat','lng'], include:['Name']});

    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
  ) : coords ? (
       <div className="App">
         
        <h1 className="title">Social Services WebApp</h1>
        <NavBar />
        
        
        <br/>
        <Button variant="contained" color="primary">
          Nearest Food Bank
        </Button>

        <div className="map">
{/* Map Function showing markers for all locations in json files. */}

          <Map className="mapbox"
            style={'mapbox://styles/mapbox/streets-v11'}      
            center={[coords.longitude, coords.latitude]}
            // for testing when outside of KC using line below for center
            // center = {[-94.6, 39.025]}
            containerStyle={{
            height: '80vh',
            width: '90vw'
          }}>
          
          <ZoomControl/>
          
          <Marker
          coordinates={[coords.longitude, coords.latitude]}
          anchor="bottom"
          >
          <img src= "/images/star.jpeg" alt="star" height='40px' width='50px'/>
          </Marker>
{/* markers may need their own component and refactored */}
          {geoFood.features.map(foodBankMarkers =>(
                <Marker
                key={foodBankMarkers.properties.Name}
                coordinates={[foodBankMarkers.geometry.coordinates[0],foodBankMarkers.geometry.coordinates[1]]}
                anchor="bottom"
                >
                  {/* <MarkerDetails next = {foodBankMarkers}> */}
                  <div className="tooltip">
                  <img src= "/images/burger.jpg" alt="food" height='30px' width='30px'/>
                  
  <span className="tooltiptext">{foodBankMarkers.properties.Name}<br></br>{foodBankMarkers.properties.Phone}<br></br>{foodBankMarkers.properties.Address}<br></br>
  <Button variant="contained" color="primary">
          Map
        </Button>
        </span>
                  </div>
                  {/* </MarkerDetails> */}
                </Marker>
          
          
              )
            )
          }

          {geoShelter.features.map(shelterMarkers =>(
                <Marker
                key={shelterMarkers.properties.Name}
                coordinates={[shelterMarkers.geometry.coordinates[0],shelterMarkers.geometry.coordinates[1]]}
                anchor="bottom"
                >
                  <Button onClick={console.log("hello")}>
                  <img src= "/images/shelter.png" alt="shelter" height='30px' width='30px'/>
                  </Button>
                </Marker>
          
          
              )
            )
          }

         {geoHealth.features.map(healthMarkers =>(
            <Marker
            key={healthMarkers.properties.Name}
            coordinates={[healthMarkers.geometry.coordinates[0],healthMarkers.geometry.coordinates[1]]}
            anchor="bottom"
            >
              <img src= "/images/health.png" alt="medical" height='30px' width='30px'/>
            </Marker>
      
      
          )
        )
      } 

          </Map>
        </div>

        <Table foodBankData={geoFoodBanks}/>
        <br/>
        <Map className="mapbox"
            style={'mapbox://styles/mapbox/streets-v11'}    
            center={[coords.longitude, coords.latitude]}
            // for testing when outside of KC using line below for center
            // center = {[-94.6, 39.025]}
            containerStyle={{
            height: '80vh',
            width: '90vw'
          }}>
        {/* for testing set state eventually  */}
        </Map>

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
