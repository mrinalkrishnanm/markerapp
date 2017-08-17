import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import firebase from 'firebase';

class AutoComplete extends Component{
	
	constructor(props) {
    	super(props)
    	this.state = { addressSource: 'Chennai, Tamil Nadu, India',addressDestination: 'Chennai, Tamil Nadu, India',Source:{ lat: 13.0827, lng: 80.2707 },Destination:{ lat: 13.0827, lng: 80.2707 } }
    	this.onChangeSource = (addressSource) => this.setState({ addressSource })
    	this.onChangeDestination = (addressDestination) => this.setState({ addressDestination })

  	}

	  handleFormSubmit(){

	   	geocodeByAddress(this.state.addressSource)
	      .then(results => getLatLng(results[0]))
	      .then(latLng => this.setState({Source:latLng}))
	      .catch(error => console.error('Error', error))
	    
	    geocodeByAddress(this.state.addressDestination)
	      .then(results => getLatLng(results[0]))
	      .then(latLng => this.setState({Destination:latLng}))
	      .catch(error => console.error('Error', error))

	    setTimeout(() => {
	    this.props.updateRoute(this.state.Source,this.state.Destination)
	    this.saveFireBase(this.state.Source,this.state.Destination)
	 	}, 400)
	 }
	
	saveFireBase(source,destination){
		var user_id = 1;
		var Route = firebase.database().ref("route/"+user_id);
      	var NewRouteRef = Route.child("route");
	     NewRouteRef.push ({
	        source: source,
	        destination: destination,
	        source_address: this.state.addressSource,
	        destination_address: this.state.addressDestination
	          
	    });

	}

	render(){
		const inputPropsSource = {
      		value: this.state.addressSource,
      		onChange: this.onChangeSource,
    	}
    	const inputPropsDestination = {
      		value: this.state.addressDestination,
      		onChange: this.onChangeDestination,
    	}

		return(
			<div className="input-form autocomplete-container">
		        	<PlacesAutocomplete inputProps={inputPropsSource} />
		      		<PlacesAutocomplete inputProps={inputPropsDestination} />
		        	<button type="submit" onClick={this.handleFormSubmit.bind(this)}>Submit</button>
			</div>
			);
	}
}

export default AutoComplete;

