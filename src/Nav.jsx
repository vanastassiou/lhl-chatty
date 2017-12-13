import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="user-counter">{this.props.onlineUsers} users currently chatting</div>
      </nav>
    )
  }
}


export default Nav;
