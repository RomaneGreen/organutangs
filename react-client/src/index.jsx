import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';
import Map from './components/Map.jsx';
import MeetUpForm from './components/MeetUpForm.jsx';
import Title from './components/Title.jsx';
import LoginViewController from './components/LoginViewController.jsx';
import sampleData from './sampleData.js';
const io = require('socket.io-client');
const socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: sampleData,
      auth: true,
      meetingLocations: [{ id: 'tacos-y-quesadillas-mexico-manhattan',
        name: 'Tacos Y Quesadillas Mexico',
        image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/drLoFbH5OHpiptuadnXw_A/o.jpg',
        is_closed: false,
        url: 'https://www.yelp.com/biz/tacos-y-quesadillas-mexico-manhattan?adjust_creative=TuI7KPQ2iOcLaRBdE3LpMA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TuI7KPQ2iOcLaRBdE3LpMA',
        review_count: 37,
        categories: [ [Object] ],
        rating: 4.5,
        coordinates: { latitude: 40.7687515765429, longitude: -73.9850422739983 },
        transactions: [],
        price: '$',
        location:
        { address1: '924 9th Ave',
          address2: '',
          address3: '',
          city: 'Manhattan',
          zip_code: '10019',
          country: 'US',
          state: 'NY',
          display_address: [Array] },
        phone: '',
        display_phone: '',
        distance: 309.03863120119996 }]
    };
  }

  handleClick(item) {
    console.log(item);
  }

  componentDidMount() {
    socket.on('meeting locations', (data) => {
      console.log('data', data);
      this.setState({ meetingLocations: data });
    })
  }

  render () {

    return (
      <div>
        {/*<LoginViewController items={this.state.items} isLoggedIn={this.state.auth}/>*/}
        <Title /> 
        <MeetUpForm />
        <div style={{width:500, height:600, backgroundColor:'red', border: '2px solid black'}}>
          <Map
            markers={ this.state.meetingLocations }
            center={{ lat: 40.751094, lng: -73.987597 }}
            containerElement={<div style={{height:100+'%'}} />}
            mapElement={<div style={{height:100+'%'}} />}
          />
        <List items={ this.state.meetingLocations } />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));