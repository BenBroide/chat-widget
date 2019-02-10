import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import cards from "./Component/cards";
import {
  Widget,
  renderCustomComponent,
  handleNewUserMessage,
  addResponseMessage,
  toggleWidget
} from "react-chat-widget";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.devMode();
  }

  // Dev mode, chat open and resutls loaded on mount
  devMode() {
    toggleWidget();

    renderCustomComponent(cards, { url: "api.json" });
  }

  handleNewUserMessage = message => {
    renderCustomComponent(cards, { url: "api.json" });
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
