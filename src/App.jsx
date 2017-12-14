import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import NavBar from "./NavBar.jsx";

// Cannot pass props to grandchildren -- React limitation/"feature"

class App extends Component {

  constructor(props)  {
    super(props);
    this.state = {
      currentUser: {name: "Anon"},
      messages: [],
      usersInChat: 0
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
    console.log("New message handler:", newMessage.content);
    this.socket.send(JSON.stringify(newMessage));
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
      this.socket.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);
      if (newMessage.type == 'updateUsersInChat') {
        this.setState({usersInChat: newMessage.userNumber});
        console.log("Users in chat", newMessage.userNumber);
      } else {
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
      }
    }
  }


  changeName(newName) {
    const notification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} is now known as ${newName}`
      };
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
        <NavBar usersInChat={this.state.usersInChat}/>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          onNewMessage={this.newMessageHandler.bind(this)}
          username={this.state.currentUser}
          changename={this.changeName} />
      </div>
    )
  }
}


export default App;
