import React from 'react';
import RouteItem from './RouteItem';

class RouteList extends React.Component {
  constructor() {
    super();

  }

  render() {
    var routes = this.props.routes
    var display = routes.map((route) => {
      return <RouteItem  route={route} />
    })
    return(
      <div className="route-list-container">
        {display}
      </div>
    )
  }
}
export default RouteList;
