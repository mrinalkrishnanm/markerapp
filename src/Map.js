import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyBdgIVbcOGjr9mdjPZ0enDXUNqzKmur91w"

class Map extends Component{
	constructor() {
	    super();
	    this.state = {
	    	map: null
	    }
	  }
	
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
				        {...marker}>
				      </Marker>
				    ))}

				    <Marker>
				    	<InfoWindow  position={{ lat: 13.0827, lng: 80.2707 }}>
					  		<div>Chennai <br/>lat:13.0827 <br/>long: 80.2707</div>

						</InfoWindow>
					</Marker>
					
				  </GoogleMap>
				</div>
			);
	}
}

export default withGoogleMap(Map);