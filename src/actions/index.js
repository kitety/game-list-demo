export const fetchGames = () => {
  // 返回函数
  return dispatch => {
    fetch('/api/games')
  }
}
