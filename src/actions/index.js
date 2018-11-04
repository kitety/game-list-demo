import { SET_GAMES } from '../constants';
const setGames = (games) => {
  return {
    type: SET_GAMES,
    games
  }
}
const handleRequest = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    let error = new Error(response.StatusText)
    error.response = response
    throw error
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
    return fetch('/api/games', {
      method: 'POST',
      //数据序列化
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "appication/json"
      }
    }).then(handleRequest)
  }
}
