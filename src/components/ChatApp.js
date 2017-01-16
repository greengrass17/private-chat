import React, {Component} from 'react'
import io from 'react'

import Messages from './Messages'
import ChatInput from './ChatInput'

class ChatApp extends Component {
  constructor(props) {
    super(props);
    // set the initial state of messages so that it is not undefined on load
    this.state = { messages: [] };

    // Connect to the server
    this.socket = io(config.api).connect();
    this.sendHandler = this.sendHandler.bind(this)
    this.addMessage = this.addMessage.bind(this)

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
}

export default ChatApp
