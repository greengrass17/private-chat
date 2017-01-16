import React, { Component } from 'react';
import '../styles/App.css';

import ChatApp from './ChatApp'

class App extends Component {
  constructor() {
    this.state = {username: ''}
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this)
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
  }

  render() {
    if (this.state.submitted) {
      return (
        <ChatApp username={this.state.username} />
      );
    }

    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <h1>React Instant Chat</h1>
        <div>
          <input
            type="text"
            onChange={this.usernameChangeHandler}
            placeholder="Enter a username..."
            required />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  usernameChangeHandler(event) {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }
}

export default App;
