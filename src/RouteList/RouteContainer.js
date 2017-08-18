import React from 'react';
import firebase from 'firebase';
import RouteList from './RouteList';
import Topbar from '../Topbar/TopBar';


class RouteContainer extends React.Component{
  constructor() {
    super();
    this.state = {
      routes: []
    }
  }
  
  componentDidMount() {

    var config = {
      apiKey: "AIzaSyCr1Ueh6G7ZntNROySqkg2Nv2ARq76byfE",
      authDomain: "marker-app-95f36.firebaseapp.com",
      databaseURL: "https://marker-app-95f36.firebaseio.com",
      projectId: "marker-app-95f36",
      storageBucket: "",
      messagingSenderId: "734907452072"
    };
    if (!firebase.apps.length) {
     firebase.initializeApp(config);
    }
   

    var user_id = 1;
    let Route = firebase.database().ref('route/' + user_id);
    Route.on('value', snapshot => {
      let myRoutes = snapshot.val().myRoutes;
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
          <h1>My Routes List</h1>
          <RouteList routes={this.state.routes} />
        </div>
      </div>
    )
  }
}

export default RouteContainer;

