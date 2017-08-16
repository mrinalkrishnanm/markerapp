import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class AutoComplete extends Component{
	
	constructor(props) {
    	super(props)
    	this.state = { addressSource: 'San Francisco, CA',addressDestination: 'San Francisco, CA' }
    	this.onChangeSource = (addressSource) => this.setState({ addressSource })
    	this.onChangeDestination = (addressDestination) => this.setState({ addressDestination })

  	}

	  handleFormSubmit = (event) => {
	    event.preventDefault()

	    geocodeByAddress(this.state.addressSource)
	      .then(results => getLatLng(results[0]))
	      .then(latLng => console.log('Success', latLng))
	      .catch(error => console.error('Error', error))

	    geocodeByAddress(this.state.addressDestination)
	      .then(results => getLatLng(results[0]))
	      .then(latLng => console.log('Success', latLng))
	      .catch(error => console.error('Error', error))
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
				<form onSubmit={this.handleFormSubmit}>
		        	<PlacesAutocomplete inputProps={inputPropsSource} />
		      		<PlacesAutocomplete inputProps={inputPropsDestination} />
		        	<button type="submit">Submit</button>
		      	</form>
				
			</div>
			);
	}
}

export default AutoComplete;

