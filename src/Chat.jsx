// Libraries
import React, { Component, useState, useEffect, useRef } from "react";
import Scroll, { Element, animateScroll, scroller } from "react-scroll";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
// Components
import P5Wrapper from "react-p5-wrapper";

import Eye from "./Eye";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import data from "./dummyData";

const URL = "wss://var-mar.info/";

class Chat extends Component {
  state = {
    name: "Bob",
    type: "viewer",
    sceneCount: null,
    messages: []
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    this.ws.onNewConnectedMessage = evt => {
      const data = JSON.parse(evt.data);
    };

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };

    this.ws.onENATyping = evt => {};

    this.ws.onNewScene = evt => {
      const newScene = JSON.parse(evt.data);
      this.addMessage(newScene.message);
      this.state.sceneCount = newScene.sceneCount;
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      });
    };

    var textWaiting = "IBM is speaking with ENA. Wait.";
    this.scrollToBottom();
  }

  addMessage = message => {
    //tempAr = tempAr.splite(tempAr.length-10,tempAr.length);
    this.setState(state => ({ messages: [...state.messages, message] }));
    // Reduce last messages

    this.scrollToBottom();
  };

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString };
    try {
      this.ws.send(JSON.stringify(message));
    } catch (err) {
      console.log("socket send: ", err);
    }
    this.addMessage(message);
  };

  scrollToBottom() {
    //console.log(this.refs.messagesEndRef.current);
    //var scroll = Scroll.animateScroll;
    //console.log(this.refs);
    //var refStr = "messagesEndRef_" + (this.state.messages.length - 3);
    //console.log(refStr);
    //this.refs[refStr].scrollIntoView({ block: "end" });
    //this.refs.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // Move scroll to bottom
    document.getElementById("chatMessage").lastChild.scrollIntoView();
  }

  putElementScroll(index) {
    return null;
  }

  render() {
    //this.state.messagesEndRef = useRef(null);
    //const messagesEndRef = useRef(null);

    return (
      <Jumbotron>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col md={3}>
            <Eye />
            <div id="title_container">
              <div id="title">
                <h1>ENA</h1>
                <h2>Nomen Nescio</h2>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <div id="chatMessage">
                  <div id="spacerMessages" />
                  {this.state.messages.map((message, index) => (
                    <div>
                      <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.name}
                        color={{ color: message.color }}
                      />
                    </div>
                  ))}
                  <div style={{ color: "black" }}>
                    <p>_</p>
                  </div>
                </div>
                <div id="scene" className="scene">
                  {this.state.sceneCount}
                </div>
              </Col>
              <Col>
                <div id="chatInputContainer">
                  <ChatInput
                    ws={this.ws}
                    onSubmitMessage={messageString =>
                      this.submitMessage(messageString)
                    }
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default Chat;

/* <P5Wrapper sketch={sketch} />
        </div>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={"name"}
            placeholder={"Enter your name..."}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          </label>
*/
