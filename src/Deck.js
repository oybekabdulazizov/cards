import React, { Component } from 'react';

const BASE_URL = 'https://deckofcardsapi.com/api/deck/';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawnDecks: [],
      dataLoaded: false,
    };
  }

  render() {
    return <div>Deck</div>;
  }
}

export default Deck;
