import React, { Component } from "react";

import { homeAnimations } from '../../animations/HomeAnimations'

export class Home extends Component {
  componentDidMount() {
    homeAnimations();
  }
  handleClick = (where) => {
    this.props.history.push(where);
  }
  render() {
    return (
      <div className="home">
        <div className="home-welcome">
          <div className="home-welcome-text">
            <div className="text">
              <h1>Online Library</h1>
            </div>
            <div className="buttons">
              <span className="login-button">
                <button className="btn btn-login" onClick={() => this.handleClick('login')}>Login</button>
              </span>
              <span className="register-button">
                <button className="btn btn-register" onClick={() => this.handleClick('register')}>Register</button>
              </span>
            </div>
          </div>
        </div>
        <div className="home-boxes">
          <div className="home-box box1">
            <h1 className="home-box-text">The largest resource of books in the Internet!</h1>
          </div>
          <div className="home-box box2">
            <h1 className="home-box-text">Top books from top authors for free!</h1>
          </div>
          <div className="home-box box3">
            <h1 className="home-box-text">The lowest pricing for premium books in the Internet!</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
