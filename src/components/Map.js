import React, { Component } from 'react'
import '../App.css'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const MapBoxMap = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiY29saW5waGlsbGlwczY3IiwiYSI6ImNrMGZvd2MyaDAxdG8zbHJ6MmFnNnZpaTUifQ.tJ63Dty8f2DWdS1jenXPCA'
})

class Map extends Component {
  render () {
    return (
      <div className='map'>
        <div>
          <MapBoxMap
            className='mapbox'
            style={'mapbox://styles/mapbox/streets-v11'}
            center={[this.props.longitude, this.props.latitude]}
            containerStyle={{
              height: '80vh',
              width: '90vw'
            }}
          >
            <Marker
              coordinates={[this.props.longitude, this.props.latitude]}
              anchor='bottom'
            >
              <img
                src='/images/star.jpeg'
                alt='star'
                height='40px'
                width='50px'
              />
            </Marker>

            {this.props.geojson.features.map(markers => (
              <Marker
                key={markers.properties.Name}
                coordinates={[
                  markers.geometry.coordinates[0],
                  markers.geometry.coordinates[1]
                ]}
                anchor='bottom'
              >
                <div className='tooltip'>
                  <img
                    src={this.props.markerImage}
                    alt={this.props.geojson.features[0].properties.Type}
                    height='30px'
                    width='30px'
                  />
                  <span className='tooltiptext'>
                    {markers.properties.Name}
                    <br></br>
                    {markers.properties.Phone}
                    <br></br>
                    {markers.properties.Address}
                    <br></br>
                  </span>
                </div>
              </Marker>
            ))}
          </MapBoxMap>
        </div>
        <br></br>
        <br></br>
      </div>
    )
  }
}
export default Map
