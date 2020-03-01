import React, { Component } from 'react'
import '../App.css'
import geojson from 'geojson'
import Button from '@material-ui/core/Button'
import geoFoodBanks from './geoBanks.json'
import geoShelters from './geoShelters.json'
import geoHealths from './geoHealth.json'

const geoFood = geojson.parse(geoFoodBanks, {
  Point: ['lat', 'lng'],
  include: ['Name']['Address']
})
const geoShelter = geojson.parse(geoShelters, {
  Point: ['lat', 'lng'],
  include: ['Name']['Address']
})
const geoHealth = geojson.parse(geoHealths, {
  Point: ['lat', 'lng'],
  include: ['Name']['Address']
})

class NavBar extends Component {
  render () {
    return (
      <div className='navBarCards'>
        <Button
          onClick={() =>
            this.props.setSocialServicesResources(geoFood, '/images/burger.jpg')
          }
        >
          <div className='column'>
            <h2>Food Resources</h2>
            <img
              src='/images/burger.jpg'
              alt='shelter'
              height='100vh'
              width='100vh'
            />
          </div>
        </Button>
        <Button
          onClick={() =>
            this.props.setSocialServicesResources(
              geoShelter,
              '/images/shelter.png'
            )
          }
        >
          <div className='column'>
            <h2>Shelters</h2>
            <img
              src='/images/shelter.png'
              alt='shelter'
              height='100vh'
              width='100vh'
            />
          </div>
        </Button>
        <Button
          onClick={() =>
            this.props.setSocialServicesResources(
              geoHealth,
              '/images/health.png'
            )
          }
        >
          <div className='column'>
            <h2>Medical/Health</h2>
            <img
              src='/images/health.png'
              alt='shelter'
              height='100vh'
              width='100vh'
            />
          </div>
        </Button>
      </div>
    )
  }
}
export default NavBar
