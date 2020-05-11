import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
  };
  state = {
    message: ""
  };

  render() {
    return (
      <form
        action="."
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message);
          this.setState({ message: "" });
        }}
      >
        <input
          id="chatInput"
          type="text"
          placeholder={"Type your message to ENA..."}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
      </form>
    );
  }
}

export default ChatInput;
