import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages.map( message => {
      if (message) {
      }

      return <Message
        key = { message.id }
        username = { message.username }
        content = { message.content } />
    });
    return (
      <section className='message-list'>
        { messages }
      </section>
    )
  }
}

export default MessageList;
