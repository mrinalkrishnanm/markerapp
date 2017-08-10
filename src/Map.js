import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyBdgIVbcOGjr9mdjPZ0enDXUNqzKmur91w"

class Map extends Component{
	
	render(){
		const markers = this.props.markers|| []
		return(
			<div>
				<GoogleMap
				    defaultZoom={15}
				    defaultCenter={{ lat: 13.0827, lng: 80.2707 }}
				 >
				    {markers.map((marker, index) => (
				      <Marker
				        {...marker}/>
				    ))}
				  </GoogleMap>
				</div>
			);
	}
}

export default withGoogleMap(Map);