import React, { Component } from "react";
import axios from "axios";

import Card from "./card";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: {} };
    this.getJson();
  }

  getJson() {
    let data = this.fetchJson();
    data.then(data => {
      console.log(data);
      this.setState({
        loading: false,
        data: data
      });
    });
  }

  fetchJson() {
    return axios
      .get(this.props.url)
      .then(
        response =>
          new Promise(resolve => setTimeout(() => resolve(response.data), 3000))
      )
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Card {...this.state.data.jsonOne} loading={this.state.loading} />
        <Card {...this.state.data.jsonTwo} loading={this.state.loading} />
      </div>
    );
  }
}

export default Cards;
