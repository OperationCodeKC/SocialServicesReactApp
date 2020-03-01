import React, { Component } from 'react'
import NavBar from './components/NavBar.js'
import StartingPoint from './components/StartingPoint.js'
import { geolocated } from 'react-geolocated'
import './App.css'
import Map from './components/Map.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      geojson: {
        features: []
      },
      markerImage: null
    }
  }

  setSocialServicesResources = (geojson, markerImage) => {
    this.setState({
      geojson: geojson,
      markerImage: markerImage
    })
  }

  render () {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props

    return !isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : coords ? (
      <div className='App'>
        <h1 className='title'>Social Services WebApp</h1>
        <NavBar setSocialServicesResources={this.setSocialServicesResources} />
        <Map
          latitude={coords.latitude}
          longitude={coords.longitude}
          geojson={this.state.geojson}
          markerImage={this.state.markerImage}
        />

        <div className='footer'>
          <p>
            Current lat/long {coords.latitude},{coords.longitude}
          </p>
          <StartingPoint
            latitude={coords.latitude}
            longitude={coords.longitude}
          />
        </div>
      </div>
    ) : (
      <div className='_welcome'>Getting your current location...&hellip; </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App)
