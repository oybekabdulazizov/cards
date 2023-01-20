import axios from 'axios';
import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawnCards: [],
      dataLoaded: false,
      allCardsDrawn: false,
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

    try {
      if (!cardRes.data.success) {
        this.setState({ allCardsDrawn: true });
        throw new Error('All the cards have been drawn! Nothing left to draw.');
      }

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
    } catch (err) {
      alert(err);
    }
  }

  renderedCards() {
    return this.state.drawnCards.map((c) => {
      return <Card card={c} key={c.code} idx={c.code} />;
    });
  }

  render() {
    return (
      <div className='Deck'>
        {this.state.dataLoaded ? (
          <div className='Deck-wrapper'>
            <h1>Card Dealer</h1>
            <button onClick={this.drawCard} disabled={this.state.allCardsDrawn}>
              Gimme a card 😃
            </button>
            {this.state.allCardsDrawn ? (
              <h2>All cards drawn!</h2>
            ) : (
              <h2>Remaining cards: {this.state.deck.remaining}</h2>
            )}
            <div className='Cards'>{this.renderedCards()}</div>
          </div>
        ) : (
          <div className='loader'></div>
        )}
      </div>
    );
  }
}

export default Deck;
