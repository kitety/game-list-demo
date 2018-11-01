import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GamesPage from './components/GamesPage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger)))
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink exact activeClassName="active" className="item" to="/">Home</NavLink>
          <NavLink exact activeClassName="active" className="item" to="/games">Games</NavLink>
          <NavLink exact activeClassName="active" className="item" to="/games/new">Add New Games</NavLink>
          {/*   <a href="#" className="item">Home</a>
          <a href="#" className="item">Games</a>
          <a href="#" className="item">Add New Games</a> */}
        </div>
        <Route exact path="/" component={App} />
        <Route exact path="/games" component={GamesPage} />
        <Route path="/games/new" component={GamesPage} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
