import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATE, GAME_DELETE } from '../constants';
const games = (state = [], action = {}) => {
  switch (action.type) {
    case SET_GAMES:
      return action.games
    case ADD_GAME:
      return [
        ...state,
        action.game
      ]
    case GAME_FETCHED:
      const index = state.findIndex(item => item._id === action.game._id)
      // index大于-1 找得到
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.game._id) {
            return action.game
          } else {
            return item
          }
        })
      } else {
        // 本地找不到 获取到的是最新的 合并
        return [
          ...state,
          action.game
        ]
      }
    case GAME_UPDATE:
      return state.map(item => {
        if (item._id === action.game._id) {
          return action.game
        } else {
          return item
        }
      })
    case GAME_DELETE:
      return state.filter(item => {
        return item._id !== action.gameId
      })
    default:
      return state;
  }
}
export default games;
