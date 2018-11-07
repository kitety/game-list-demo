import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATE, GAME_DELETE } from '../constants';
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
const gameFetched = (game) => {
  return {
    type: GAME_FETCHED,
    game
  }
}
const AddGame = (game) => {
  return {
    type: ADD_GAME,
    game
  }
}
const updateGameHandler = (game) => {
  return {
    type: GAME_UPDATE,
    game
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
export const fetchGame = (id) => {
  return dispatch => {
    fetch(`/api/game/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data.game)))
  }
}
export const saveGame = (data) => {
  return dispatch => {
    return fetch('/api/games', {
      method: 'POST',
      //数据序列化
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleRequest).then(data => {
      dispatch(AddGame(data.games))
    })
  }
}
export const updateGame = (data) => {
  return dispatch => {
    return fetch(`/api/games/${data._id}`, {
      method: 'PUT',
      //数据序列化
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleRequest).then(data => {
      dispatch(updateGameHandler(data.game))
    })
  }
}
export const gameDelete = (gameId) => {
  return {
    type: GAME_DELETE,
    gameId
  }

}
export const deleteGame = (id) => {
  return dispatch => {
    return fetch(`/api/game/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleRequest).then(data => {
      dispatch(gameDelete(id))
    })
  }
}
