import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import card from "./Component/card";
import {
  Widget,
  renderCustomComponent,
  handleNewUserMessage,
  addResponseMessage,
  toggleWidget
} from "react-chat-widget";
import "./styles.css";

const jsonOne = {
  rating: 4.3,
  distance: 8.110389670687223,
  poptime: 45,
  closingTime: "9 pm",
  name: "UR Medicine Urgent Care – Greece",
  mongoID: "5c4f49c120dd2e22a9065ba3",
  score: 0.16864259707498816,
  lat: 40.768286,
  lng: -73.968116,
  showMap: false
};
const jsonTwo = {
  rating: 2.5,
  distance: 6.065514763823993,
  poptime: 53,
  closingTime: "9 pm",
  name: "UR Medicine Urgent Care – Spencerport",
  mongoID: "5c4f4c5520dd2e22a9066826",
  score: 0.1675516687086668,
  lat: 40.768286,
  lng: -73.968116,
  showMap: false
};
class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    toggleWidget();
    renderCustomComponent(card, jsonOne);
    renderCustomComponent(card, jsonTwo);
  }

  handleNewUserMessage = message => {
    addResponseMessage(message);
    renderCustomComponent(card, jsonOne);
  };

  render() {
    return (
      <div className="App">
        <Widget
          addResponseMessage={this.addResponseMessage}
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  }
}

export default App;
