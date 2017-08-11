import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
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
    //retrieving data from firebase
    let MarkerRef = firebase.database().ref('markers');
    MarkerRef.on('value', snapshot => {
      var markers = []
      let initialMarkers = snapshot.val().markers;
      for (var key in initialMarkers) {
        //marker data from firebase is converted to object
        if (initialMarkers.hasOwnProperty(key)) {
          markers.push(initialMarkers[key])
        }
      }
      this.setInitialMarkers(markers)
    })
  }
  

  setInitialMarkers(markers){
    //initial marker object is converted into array format which can be passed as props into Map component
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
    var unique = false
    var inputNodes = document.getElementsByTagName('input');
      for(var i =0;i<inputNodes.length;i++) {
        inputNodes[i].classList.remove("error");
    }
    //checking if title input box is empty
    if(!title){
      setTimeout(() => {
        document.getElementsByClassName("title")[0].classList.add("error")

      }, 50)
    }
    //checking if title is lattitude input box is empty
    if(!lattitude){
      setTimeout(() => {
        document.getElementsByClassName("lattitude")[0].classList.add("error")

      }, 50)
    }
    //checking if longitude input box is empty
    if(!longitude){
      setTimeout(() => {
        document.getElementsByClassName("longitude")[0].classList.add("error")

      }, 50)
    }

    else{
      var newlattitude = parseFloat(lattitude);
      var newlongitude = parseFloat(longitude);
      var uniqueTitle = title+Math.floor((Math.random() * 100000) + 1);
      console.log(uniqueTitle);
      marker.push({position:{lat: newlattitude,lng: newlongitude},key:uniqueTitle, defaultAnimation: 2});
      //new marked data is pushed into the firabase database
      var MarkerRef = firebase.database().ref("markers/");
      var NewMarkerRef = MarkerRef.child("markers");
      NewMarkerRef.push ({
          position: {
            lat: newlattitude,
            lng: newlongitude,
          },
          key: uniqueTitle,
          defaultAnimation: 2,
      });
      //To read the data after pushing, just for testing purposes
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
