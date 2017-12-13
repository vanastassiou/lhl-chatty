import React, {Component} from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        content: ""
    }
  }

  enterMessage(input) {
    if (input.key == "Enter") {
      this.props.onNewMessage(input.target.value);
    }
  }

  handleChange = (input) => {
    if (input.target.value) {
      this.props.changename(input.target.value);
      return;
    }
  }

  render() {
    console.log("Rendering ChatBar.jsx");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.username.name} onBlur={this.handleChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.enterMessage.bind(this)} />
      </footer>
    )
  }
}


export default ChatBar;
