import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import Chat from "./Chat";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
//import randomLetters from "random-letters";
import { render } from "react-dom";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state = { height: 0, width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    //var x = randomLetters(3).toUpperCase(); // contains 8 random letters
    console.log("width:", this.state.width, "height", this.state.height);
        
    return (  
      <Router>
        <Redirect to='/ena'/>;
        <Switch>
          <Route path="/ena">
            <div className="App">
              <Chat width={this.state.width} height={this.state.height} />
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

