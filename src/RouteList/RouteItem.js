import React from 'react';

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
      </div>
    )
  }
}


export default RouteItem;
