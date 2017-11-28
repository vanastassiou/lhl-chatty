import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// Cannot pass props to grandchildren -- React limitation/"feature"

class App extends Component {

  constructor(props)  {
    super(props);
    this.state = {
       currentUser: {name: ""},
       messages: [
         {
           username: "Bob",
           content: "Has anyone seen my marbles?",
         },
         {
           username: "Anonymous",
           content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
         }
       ]
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList/>
        <ChatBar/>
      </div>
    )
  }
}


export default App;
