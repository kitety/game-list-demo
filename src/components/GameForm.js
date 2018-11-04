import React, { Component } from 'react';

class GameForm extends Component {
  // 初始化数据
  state = {
    title: '',
    cover: ''
  }
  // 两种都可以
  handChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  // handChange = (e) => {
  //   console.log(e);
  //   this.setState({ [e.target.name]: e.target.value })
  // }
  handSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <form className="ui form" onSubmit={this.handSubmit}>
        <h1>Add new Game</h1>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={this.state.text}
            onChange={this.handChange}
          />
        </div>
        <div className="field">
          <label htmlFor="title">Cover URL</label>
          <input
            type="text"
            name="cover"
            value={this.state.cover}
            onChange={this.handChange}
          />
        </div>
        <div className="field">
          {/* 前面满足才做后面 */}
          {this.state.cover !== "" && <img alt="cover" className="ui small bordered image" src={this.state.cover} />}
        </div>
        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
  }
}

export default GameForm;
