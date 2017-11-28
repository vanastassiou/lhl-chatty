import React, {Component} from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        content: ""
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}


export default ChatBar;
