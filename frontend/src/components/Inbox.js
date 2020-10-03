import React from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { Link } from "react-router-dom";
let socket = io("http://localhost:9000");

class Inbox extends React.Component {
  constructor() {
    super();
    let username = Cookies.get("username") || "";
    if (username.length < 1) {
      window.location.assign("/");
      return;
    }
    this.state = {
      username: Cookies.get("username"),
      messages: [],
      sendUsername: "",
      sendMessage: "",
    };
    socket.on("connect", () => {
      socket.emit("join", { username: this.state.username });
    });
    socket.on("message", (payload) => {
      console.log(payload);
      let from = payload.from || "";
      let message = payload.message || "";
      let messages = this.state.messages;
      messages.push({ username: from, message: message });
      this.setState({ messages: messages });
    });
    socket.on("disconnect", () => {
      alert("You are disconnected from the server");
    });
  }
  handleSendUsername = (e) => {
    let sendUsername = e.target.value;
    this.setState({ sendUsername: sendUsername });
  };
  handleSendMessage = (e) => {
    let sendMessage = e.target.value;
    this.setState({ sendMessage: sendMessage });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.sendUsername === this.state.username) {
      alert("Cannot send message to yourself");
      return;
    }
    if (this.state.sendMessage.length < 1 || this.state.sendUsername < 1) {
      alert("Username or message cannot be empty");
      return;
    }
    await socket.emit("message", {
      from: this.state.username,
      to: this.state.sendUsername,
      message: this.state.sendMessage,
    });
    this.setState({ sendUsername: "", sendMessage: "" });
  };
  logOut = async (e) => {
    // deleting username cookie
    await Cookies.remove('username');
    window.location.assign('/');
  }
  render() {
    return (
      <div style={style.main}>
        <div style={style.loginBox}>
          <h1>{this.state.username}'s Inbox</h1>

          <button style={style.button} onClick={this.logOut}>Logout</button>

          {this.state.messages.map((item) => (
            <ul style={style.message}>
              <li>
                <b>from:</b> {item.username}
              </li>
              <li>
                <b>message:</b> {item.message}
              </li>
            </ul>
          ))}
          <form style={style.form}>
            <input
              style={style.input}
              value={this.state.sendUsername}
              name="username"
              onChange={this.handleSendUsername}
              placeholder="Username"
            />
            <input
              style={style.input}
              value={this.state.sendMessage}
              name="message"
              onChange={this.handleSendMessage}
              placeholder="Message"
            />
            <input
              style={style.button}
              type="submit"
              onClick={this.handleSubmit}
              name="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Inbox;

const style = {
  main: {
    position: "absolute",
    backgroundColor: "#9900cc",
    width: "100%",
    fontWeight: 500,
  },
  loginBox: {
    position: "relative",
    backgroundColor: "white",
    width: "70%",
    color: "black",
    float: "none",
    marginTop: 100,
    marginRight: "auto",
    marginLeft: "auto",
    padding: 20,
  },
  message: {
    boxShadow: "box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);",
    position: "relative",
    padding: 10,
    width: "90%",
    borderStyle: "solid",
    borderWidth: "4",
    borderColor: "#9900cc",
    fontWeight: 100,
    listStyleType: "none",
  },
  form: {
    display: "inline-block",
    float: "none",
    position: "fixed",
    bottom: 0,
    left: "auto",
    right: "auto",
    width: "100vh",
  },
  input: {
    padding: 10,
    width: "32%",
    borderWidth: "4",
    borderColor: "#9900cc",
  },
  button: {
    width: "10%",
    backgroundColor: "#9900cc",
    padding: 10,
    color: "white",
  },
};
