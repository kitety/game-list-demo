import { SET_GAMES } from '../constants';
const setGames = (games) => {
  return {
    type: SET_GAMES,
    games
  }
}
export const fetchGames = () => {
  // 返回函数 fetch不加参数默认get方法
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)))
  }
}
export const saveGame = (data) => {
  return dispatch => {
    fetch('/api/games', {
      method: 'POST',
      //数据序列化
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "appication/json"
      }
    })
  }
}
