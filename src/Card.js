import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: null,
    };
  }

  componentDidMount() {
    this.setState({ style: this.style() });
  }

  randDeg() {
    let randDeg = Math.floor(Math.random() * 25) + 1;
    let chance = Math.random();
    return chance > 0.5 ? randDeg : randDeg * -1;
  }

  randXY() {
    return Math.floor(Math.random() * (70 - 50 + 1)) + 50;
  }

  style() {
    return {
      transform: `translate(${this.randXY()}px, ${this.randXY()}px) rotate(${this.randDeg()}deg)`,
      position: 'absolute',
    };
  }

  render() {
    let { value, suit, image } = this.props.card;
    let { style } = this.state;

    return <img src={image} alt={`${value}-OF-${suit}`} style={style} />;
  }
}

export default Card;
