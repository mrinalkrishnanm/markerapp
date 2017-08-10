import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import firebaseDataBase from 'firebase/database'
import Map from './Map.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: [{
      // position: {
      //   lat: 13.0827,
      //   lng: 80.2707,
      // },
      // key: `Chennai`,
      // defaultAnimation: 2,
    }],
    }
  }

  componentWillMount(){  
    var config = {
      apiKey: "AIzaSyCr1Ueh6G7ZntNROySqkg2Nv2ARq76byfE",
      authDomain: "marker-app-95f36.firebaseapp.com",
      databaseURL: "https://marker-app-95f36.firebaseio.com",
      projectId: "marker-app-95f36",
      storageBucket: "",
      messagingSenderId: "734907452072"
    };
    firebase.initializeApp(config);

    let MarkerRef = firebase.database().ref('markers');
    MarkerRef.on('value', snapshot => {
      var markers = []
      let initialMarkers = snapshot.val().markers;
      for (var key in initialMarkers) {
        if (initialMarkers.hasOwnProperty(key)) {
          markers.push(initialMarkers[key])
        }
      }
      this.setInitialMarkers(markers)
    })
  }
  
  setInitialMarkers(markers){
    console.log(markers);
    var initialMarkers = []
    for(var i=0;i<markers.length;i++){
      initialMarkers.push(markers[i])
    }
    this.setState({markers:initialMarkers});
  }

  addMarker(){
    console.log(this.state.markers)
    var marker = this.state.markers;
    var lattitude = this.refs.lat.value;
    var newlattitude = parseFloat(lattitude);
    var longitude = this.refs.long.value;
    var newlongitude = parseFloat(longitude);
    var title = this.refs.key.value;
    marker.push({position:{lat: newlattitude,lng: newlongitude},key:title, defaultAnimation: 2});
    var MarkerRef = firebase.database().ref("markers/");
    var NewMarkerRef = MarkerRef.child("markers");
    NewMarkerRef.push ({
        position: {
          lat: newlattitude,
          lng: newlongitude,
        },
        key: title,
        defaultAnimation: 2,
    });

    var ref = firebase.database().ref("markers/");
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      var initialMarkers = snapshot.val();
    },function (error) {
      console.log("Error: " + error.code);
    });
    console.log(marker);
    this.setState({markers:marker});
  }

  render() {
    return (
      <div className="App">
        <Map containerElement={<div style={{ height: `100% `}} />} mapElement={<div style={{ height: `100%`}} />} markers={this.state.markers} />
        <div className="input-form">
          <input type="text" placeholder="enter lattitude" ref="lat" />
          <input type="text" placeholder="enter longitude" ref="long" />
          <input type="text" placeholder="key" ref="key" />
          <input type="submit" onClick={this.addMarker.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
