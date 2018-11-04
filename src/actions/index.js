import { SET_GAMES } from '../constants';
const setGames = (games) => {
  return {
    type: SET_GAMES,
    games
  }
}
export const fetchGames = () => {
  // 返回函数
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)))
  }
}
