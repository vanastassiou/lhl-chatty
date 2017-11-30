import React, {Component} from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        content: ""
    }
  }

  // inputMessage(input)

  enterMessage(input) {
    if (input.key == "Enter") {
      this.props.onNewMessage(input.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onKeyPress={this.enterMessage.bind(this)} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}


export default ChatBar;
