import React, { Component } from 'react';
import '../App.css';
import ReactMapboxGl, { Marker, ZoomControl} from 'react-mapbox-gl';
import geojson from 'geojson';
import Button from '@material-ui/core/Button';
import geoFoodBanks from './geoBanks.json';
import geoShelters from './geoShelters.json';
import geoHealths from './geoHealth.json';



const Map = ReactMapboxGl({
  accessToken:'pk.eyJ1IjoiY29saW5waGlsbGlwczY3IiwiYSI6ImNrMGZvd2MyaDAxdG8zbHJ6MmFnNnZpaTUifQ.tJ63Dty8f2DWdS1jenXPCA'
}, 
)

class TestMap extends Component {  
  
  constructor(props){
    super(props);
    this.state = {Mapper: <Map className="mapbox"
    style={'mapbox://styles/mapbox/streets-v11'}      
    center={[this.props.longitude, this.props.latitude]}
    containerStyle={{
    height: '80vh',
    width: '90vw'
  }}
  >  
  <ZoomControl/>
  </Map>, 
};
}
componentDidMount(){
    console.log("worked in testmap file");  
}
componentDidUpdate(){
  console.log("component updated")
}
componentWillUnmount(){
    console.log("will mount function");
}
Resources(e, MarkerImage){

  this.setState({Mapper: <Map className="mapbox"
  style={'mapbox://styles/mapbox/streets-v11'}      
  center={[this.props.longitude, this.props.latitude]}
  containerStyle={{
  height: '80vh',
  width: '90vw'
}}>
  <Marker coordinates={[this.props.longitude, this.props.latitude]} anchor="bottom">
    <img src= "/images/star.jpeg" alt="star" height='40px' width='50px'/>
  </Marker>

{e.features.map(Markers =>(
      <Marker
      key={Markers.properties.Name}
      coordinates={[Markers.geometry.coordinates[0],Markers.geometry.coordinates[1]]}
      anchor="bottom"
      >                 
        <div className="tooltip">
          <img src= {MarkerImage} alt={e.features[0].properties.Type} height='30px' width='30px'/>
          <span className="tooltiptext">{Markers.properties.Name}<br></br>{Markers.properties.Phone}<br></br>{Markers.properties.Address}<br></br>
        <Button variant="contained" color="primary">Map here?</Button>
        </span>
        </div>
      </Marker>  
          
    )
  )
}
</Map>})
}
  render(){
      const geoFood = geojson.parse(geoFoodBanks, {Point:['lat','lng'], include:['Name']['Address']});
      const geoShelter = geojson.parse(geoShelters, {Point:['lat','lng'], include:['Name']['Address']});
      const geoHealth = geojson.parse(geoHealths, {Point:['lat','lng'], include:['Name']['Address']});   
    return(
      
        <div className="map">   
          <Button onClick={()=>(this.Resources(geoFood, '/images/burger.jpg'))} variant="contained" color="primary">Link to Food Map Button</Button> 
          <Button onClick={()=>(this.Resources(geoHealth, '/images/health.png' ))} variant="contained" color="primary">Link to Medical Map Button</Button> 
          <Button onClick={()=>(this.Resources(geoShelter, '/images/shelter.png'))} variant="contained" color="primary">Link to Shelter Map Button</Button> 
        <div>{this.state.Mapper}</div>
     <br></br><br></br>
        </div>    
            
    );
  }
}
export default TestMap;

