/*global google*/
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

class ViewRoute extends Component{
	constructor() {
	    super();
	    this.state = {
	    	map: null,
	    	source: {},
	    	destination: {},
	    	directions: null

	    }
	  }

	componentDidMount(){
		var url = window.location.pathname.split('/');
		var sourceDestination = url[2].split(',')
		this.Route(sourceDestination);
	}

	Route(coordinates){
		const DirectionsService = new google.maps.DirectionsService();
		var latLngSource = new google.maps.LatLng(parseFloat(coordinates[0]), parseFloat(coordinates[1]));
		var latLngDestination = new google.maps.LatLng(parseFloat(coordinates[2]), parseFloat(coordinates[3]));
	    DirectionsService.route({
	      origin: latLngSource,
	      destination: latLngDestination,
	      travelMode: google.maps.TravelMode.DRIVING,
	    }, (result, status) => {
	      if (status === google.maps.DirectionsStatus.OK) {
	        this.setState({
	          directions: result,
	        });
	      } else {
	        console.error(`error fetching directions`);
	      }
	    });
	}

	render(){

		return(
			<div>
				<GoogleMap
				    defaultZoom={15}
				    defaultCenter={{ lat: 13.0827, lng: 80.2707 }}
				>
				{this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
				</GoogleMap>
			</div>
			);
	}
}

export default withGoogleMap(ViewRoute);