import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyBdgIVbcOGjr9mdjPZ0enDXUNqzKmur91w"

class Map extends Component{
	constructor() {
	    super();
	    this.state = {
	    	map: null,
	    	infoWindow: null,
	    	showInfo: false
	    }
	  }
	
	displayPosition(e){
		//displaying intowindow on the clicked marker
		console.log("clicked"+e.latLng);
		this.setState({infoWindow: e.latLng})
		if(this.state.showInfo){
			this.setState({showInfo:false})
		}
		if(!this.state.showInfo){
			this.setState({showInfo:true})
		}
	}
	render(){
		const markers = this.props.markers|| []
		var markerPosition = JSON.stringify(this.state.infoWindow);
		if(this.state.showInfo){
			var display = <Marker position={this.state.infoWindow} ><InfoWindow><div>{markerPosition}</div></InfoWindow></Marker>
		}
		else{
			var display = ""
		}
		return(
			<div>
				<GoogleMap
				    defaultZoom={15}
				    defaultCenter={{ lat: 13.0827, lng: 80.2707 }}
				 >
				    {markers.map((marker, index) => (
				      <Marker
				        {...marker} onClick={this.displayPosition.bind(this)}>
				        
				      </Marker>
				    ))}

				    
				    <Marker>
				    	<InfoWindow  position={{ lat: 13.0827, lng: 80.2707 }} >
					  		<div>Chennai <br/>lat:13.0827 <br/>long: 80.2707</div>

						</InfoWindow>
					</Marker>				
					{display}	
				</GoogleMap>
			</div>
			);
	}
}

export default withGoogleMap(Map);