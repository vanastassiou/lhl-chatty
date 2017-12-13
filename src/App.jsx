import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// Cannot pass props to grandchildren -- React limitation/"feature"

class App extends Component {

  constructor(props)  {
    super(props);
    this.state = {
      currentUser: {name: "Anon"},
      messages: []
    }
    this.changeName = this.changeName.bind(this);
  }
  newMessageHandler(userInput) {
    const newMessage = {
      id: Math.random(),
      username: this.state.currentUser.name,
      content: userInput,
      type: 'postMessage'
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
      this.socket.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }
  }

  changeName(newName) {
    const notification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} is now known as ${newName}`
      };
    console.log("Notification content =", notification.content);
    this.socket.send(JSON.stringify(notification));
    console.log("Changing name to", newName);
    this.setState({
      currentUser: {name: newName}
    })
  }

  render() {
    console.log("Rendering App.jsx");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          onNewMessage={this.newMessageHandler.bind(this)}
          username={this.state.currentUser}
          changename={this.changeName} />
      </div>
    )
  }
}


export default App;
