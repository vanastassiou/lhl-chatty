import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// Cannot pass props to grandchildren -- React limitation/"feature"

class App extends Component {

  constructor(props)  {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: []
    }
  }
  newMessageHandler(receivedContent) {
    const newMessage = {id: Math.random(), username: "Michelle", content: receivedContent};
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
      this.socket.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = { this.state.messages }/>
        <ChatBar onNewMessage = { this.newMessageHandler.bind(this) } />
      </div>
    )
  }
}


export default App;
