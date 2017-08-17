import React from 'react';
import {Link} from 'react-router-dom'

class RouteItem extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    var route = this.props.route
    console.log(route)

    return(
      <div className="route-item-container">
        <p>{route.destination_address} to {route.source_address}</p>
        <Link  to={{ pathname: '/route/' + route.source.lat + ',' + route.source.lng + ',' + route.destination.lat + ',' + route.destination.lng , state: { source: route.source,destination: route.destination} }}><button>View </button></Link>
      </div>
    )
  }
}


export default RouteItem;
