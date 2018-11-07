import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const GameCard = ({ game, deleteGame }) => {
  return (
    <div className="ui card">
      <div className="image">
        <img src={game.cover} alt="Game Cover"></img>
      </div>
      <div className="content">
        <div className="header">{game.title}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/game/${game._id}`} className="ui basic button green">Edit</Link>
          {/* 函数调用后面不加括号,想想常规的点击事件  onClick={deleteGame}*/}
          <div className="ui basic button red" onClick={deleteGame}>Delete</div>
        </div>
      </div>
    </div>
  )
}
GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
};
export default GameCard;
