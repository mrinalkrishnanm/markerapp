import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import firebaseDataBase from 'firebase/database';
import Map from './Map.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      markers: [{
      
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
    var longitude = this.refs.long.value;
    var title = this.refs.key.value;

    var inputNodes = document.getElementsByTagName('input');
      for(var i =0;i<inputNodes.length;i++) {
        inputNodes[i].classList.remove("error");
    }

    if(!title){
      setTimeout(() => {
        document.getElementsByClassName("title")[0].classList.add("error")

      }, 50)
    }

    if(!lattitude){
      setTimeout(() => {
        document.getElementsByClassName("lattitude")[0].classList.add("error")

      }, 50)
    }

    if(!longitude){
      setTimeout(() => {
        document.getElementsByClassName("longitude")[0].classList.add("error")

      }, 50)
    }

    else{
      var newlattitude = parseFloat(lattitude);
      var newlongitude = parseFloat(longitude);
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
  }

  render() {
    return (
      <div className="App">
        <div className="map-container">
          <Map containerElement={<div style={{ height: `100% `}} />} mapElement={<div style={{ height: `100%`}} />} markers={this.state.markers} />
        </div>
        <div className="input-form">
          <h2>Enter Location</h2>
          <input type="text" placeholder="Enter Name" ref="key" className="title"/>
          <input type="text" placeholder="Enter Lattitude" ref="lat"  className="lattitude"/>
          <input type="text" placeholder="Enter Longitude" ref="long" className="longitude" />
          <input type="submit" onClick={this.addMarker.bind(this)} className="submit"/>
        </div>
      </div>
    );
  }
}

export default App;