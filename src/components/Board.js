import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cardList: [],
    };
  }
  
  componentDidMount() {
    axios.get(`${this.props.url}${this.props.boardName}/cards`)
      .then((response) => {
        const cardlist = response.data.map((card) => {
          const newCard = {
            ...card,
          }
          return newCard
        })
        console.log(cardlist)
        this.setState({
          cardList: cardlist,
        });
      })
      .catch ((error) => {
      console.log(error);
      });
  }
  onDeleteCard =(cardId)=> {
    const newCardList = this.state.cardList.filter(card => card["card"].id !== cardId)
    console.log(newCardList)
    this.setState ({
      cardList : newCardList,
    })
    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)
    .then((response)=>{
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }



  render() {
    const cardcollection = this.state.cardList.map((card,i) => {
      return([
        <Card
        key={i}
        id={card["card"].id}
        text={card["card"].text}
        emoji={card["card"].emoji}
        onDeleteCard={this.onDeleteCard}
      /> ]
      )
    })
    return (
      <div>
        {cardcollection}
      </div>
    )
  }

}

Board.propTypes = {
  cards: PropTypes.array.isRequired,
  onDeleteCard: PropTypes.func

};

export default Board;
