import axios from 'axios';
import React, { Component } from 'react';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawnCards: [],
      dataLoaded: false,
    };
    this.drawCard = this.drawCard.bind(this);
  }

  async componentDidMount() {
    await axios.get(`${BASE_URL}/new/shuffle`).then((res) => {
      setTimeout(
        function () {
          this.setState({ deck: res.data, dataLoaded: true });
        }.bind(this),
        1000
      );
    });
  }

  async drawCard() {
    const cardRes = await axios.get(
      `${BASE_URL}/${this.state.deck.deck_id}/draw`
    );
    console.log(cardRes);

    const card = cardRes.data.cards[0];

    this.setState((currState) => ({
      deck: { ...currState.deck, remaining: cardRes.data.remaining },
      drawnCards: [
        ...currState.drawnCards,
        {
          code: card.code,
          value: card.value,
          suit: card.suit,
          image: card.image,
        },
      ],
    }));
  }

  loadingMessage() {
    return <h2>Loading...</h2>;
  }

  render() {
    return (
      <div>
        {this.state.dataLoaded ? (
          <div>
            <h2>Card Dealer</h2>
            <button onClick={this.drawCard}>Draw me a card!</button>
          </div>
        ) : (
          this.loadingMessage()
        )}
      </div>
    );
  }
}

export default Deck;
