import React, { Component } from 'react';
import classnames from 'classnames'
import { connect } from 'react-redux'
import { saveGame, fetchGame } from '../actions'
import { Redirect } from 'react-router-dom'

class GameForm extends Component {
  // 初始化数据
  state = {
    title: '',
    cover: '',
    errors: {},
    isLoading: null,
    done: false
  }
  componentDidMount() {
    const { match } = this.props
    // /:_id 才会有 match.params._id
    if (match.params._id) {
      this.props.fetchGame(match.params._id)
    }
  }
  handChange = (e) => {
    let errors = Object.assign({}, this.state.errors)
    if (!!errors[e.target.name]) {
      delete errors[e.target.name]
      this.setState({
        [e.target.name]: e.target.value,
        errors
      })
    } else {
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
    this.setState({ errors })
    // no errors
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      const { cover, title } = this.state;
      this.setState({
        isLoading: true
      })
      this.props.saveGame({ cover, title }).then(
        () => { this.setState({ done: true }) },
        (err) => err.response.json().then(({ errors }) => {
          console.log(errors)
          this.setState({
            isLoading: false,
            errors
          })
        })
      )
    }
  };
  render() {
    const form = <form className={classnames('ui', 'form', { 'loading': !!this.state.isLoading })} onSubmit={this.handSubmit} >
      <h1>Add new Game</h1>
      {!!this.state.errors.global && <div className=" ui message negative">{this.state.errors.global}</div>}
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
    return (
      <div>
        {this.state.done ? <Redirect to="/games" /> : form}
      </div>
    );
  }
}

export default connect(null, { saveGame, fetchGame })(GameForm);
