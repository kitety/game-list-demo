import React from 'react';
import PropTypes from 'prop-types';
const GamesList = ({ games }) => {
  const emptyMessage = (
    <p>There is a empty Array.</p>
  )
  const gamesList = (
    <p>Games list.</p>
  )
  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  )
}
GamesList.propTypes = {
  games: PropTypes.array.isRequired
};

export default GamesList;
