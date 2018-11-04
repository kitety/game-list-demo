import React, { Component } from 'react';
import classnames from 'classnames'
import { connect } from 'react-redux'
import { saveGame } from '../actions'

class GameForm extends Component {
  // 初始化数据
  state = {
    title: '',
    cover: '',
    errors: {},
    isLoading: null
  }
  handChange = (e) => {
    let errors = Object.assign({}, this.state.errors)
    if (!!errors[e.target.name]) {
      console.log(1);
      delete errors[e.target.name]
      this.setState({
        [e.target.name]: e.target.value,
        errors
      })
    } else {
      console.log(0)
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  handSubmit = (event) => {
    event.preventDefault();
    let errors = {}
    if (this.state.title === '') errors.title = "The title can't be empty"
    if (this.state.cover === '') errors.cover = "The image can't be empty"
    this.setState({
      errors
    })
    // no errors
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      const { cover, title } = this.state;
      this.setState({
        isLoading: true
      })
      this.props.saveGame({ cover, title });
    }
  };
  render() {
    return (
      <form className={classnames('ui', 'form', { 'loading': !!this.state.isLoading })} onSubmit={this.handSubmit} >
        <h1>Add new Game</h1>
        <div className={classnames("field", { 'error': !!this.state.errors.title })}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={this.state.text}
            onChange={this.handChange}
          />
          <span>{this.state.errors.title}</span>
        </div>
        <div className={classnames("field", { 'error': !!this.state.errors.cover })}>
          <label htmlFor="title">Cover URL</label>
          <input
            type="text"
            name="cover"
            value={this.state.cover}
            onChange={this.handChange}
          />
          <span>{this.state.errors.cover}</span>
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

export default connect(null, { saveGame })(GameForm);
