import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

class TopBar extends Component{
	
	render(){
		return(
			<div className="TopBar">
				<h1 className="Title">Marker App</h1>
				<Link to='/list'><div className="My-List"><h2>My List</h2></div></Link>
				<Link to='/sharedlist'><div className="Shared-List"><h2>Shared List</h2></div></Link>

			</div>
			);
	}
}

export default TopBar;