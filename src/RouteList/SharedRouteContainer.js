import React from 'react';
import firebase from 'firebase';
import RouteList from './RouteList';
import Topbar from '../Topbar/TopBar';


class SharedRouteContainer extends React.Component{
  constructor() {
    super();
    this.state = {
      routes: []
    }
  }
  
  componentDidMount() {
    // var config = {
    //   apiKey: "AIzaSyCr1Ueh6G7ZntNROySqkg2Nv2ARq76byfE",
    //   authDomain: "marker-app-95f36.firebaseapp.com",
    //   databaseURL: "https://marker-app-95f36.firebaseio.com",
    //   projectId: "marker-app-95f36",
    //   storageBucket: "",
    //   messagingSenderId: "734907452072"
    // };
    // firebase.initializeApp(config);

    let Route = firebase.database().ref('sharedroute/');
    Route.on('value', snapshot => {
      let myRoutes = snapshot.val().routes;
      var routes=[]
      for (var key in myRoutes) {
        if (myRoutes.hasOwnProperty(key)) {
          routes.push(myRoutes[key])
        }
      }
      console.log(routes)
      this.setState({routes:routes})
    })
  }

  render() {
    return(
      <div className="route-container">
        <Topbar />
        <div className="routes" >
          <h1>Shared Routes List</h1>
          <RouteList routes={this.state.routes} />
        </div>
      </div>
    )
  }
}

export default SharedRouteContainer;

