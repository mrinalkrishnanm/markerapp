/*global google*/
import React, { Component } from 'react';
import ViewRoute from './ViewRoute';
class ViewRouteContainer extends Component{
	constructor() {
	    super();
	    this.state = {
	    	map: null,

	    }
	  }

	render(){

		return(
			<div  className="route-view-container">
				<div className="route-view">
		          <ViewRoute containerElement={<div style={{ height: `1000px `}} />} mapElement={<div style={{ height: `1000px`}} />}/>
		        </div>
			</div>
			);
	}
}

export default ViewRouteContainer;