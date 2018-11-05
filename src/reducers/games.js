import { SET_GAMES, ADD_GAME, GEMA_FETCHED } from '../constants';
const games = (state = [], action = {}) => {
  switch (action.type) {
    case SET_GAMES:
      return action.games
    case ADD_GAME:
      return [
        ...state,
        action.game
      ]
    default:
      return state;
  }
}
export default games;
