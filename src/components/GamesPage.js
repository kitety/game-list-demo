import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import GamesList from './GamesList';
import { fetchGames, deleteGame } from '../actions'

// 这里的函数引用是放在this.props中,跟后面的组件的是不一样.那个是传值,这个是引用.打印一下就知道
class GamesPage extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.fetchGames()
  }
  render() {
    return (
      <div >
        <GamesList games={this.props.games}  deleteGame={this.props.deleteGame}/>
      </div>
    );
  }
}
GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
};
// state传进来
const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}
// fetchGames 是直接import的
export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage);
