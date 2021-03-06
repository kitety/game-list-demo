import React, { Component } from 'react';
import classnames from 'classnames'

class GameForm extends Component {
  // 初始化数据
  state = {
    title: this.props.game ? this.props.game.title : '',
    _id: this.props.game ? this.props.game._id : null,
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    isLoading: null
  }

  componentWillReceiveProps(nextProps) {
    // 这个很需要 因为刚开始的时候是异步的
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover
    })
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
      const { cover, title, _id } = this.state;
      this.setState({
        isLoading: true
      })
      this.props.saveGame({ cover, title, _id }).catch(
        (err) => err.response.json().then(({ errors }) => {
          this.setState({ isLoading: false, errors })
        }))
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
          value={this.state.title}
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
        {form}
      </div>
    );
  }
}

export default GameForm
