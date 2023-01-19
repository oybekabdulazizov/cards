import React, { Component } from 'react';

class Card extends Component {
  render() {
    let { value, suit, image } = this.props.card;

    return <img src={image} alt={`${value}-OF-${suit}`} />;
  }
}

export default Card;
