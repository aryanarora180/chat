import React from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import $ from "jquery";
import { TextField, PrimaryButton } from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import Contacts from "./Contacts.js";
let socket = io("http://localhost:9000");

class Inbox extends React.Component {
  constructor() {
    super();
    let username = null
    try {
      username = Cookies.get("username") || "";
    } catch (e) {
      console.log(e);
      alert('Error in getting cookie, make sure cookies are on in your browser');
      return;
    }
    if (username.length < 1) {
      window.location.assign("/");
      return;
    }
    this.state = {
      username: username,
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
    await Cookies.remove("username");
    window.location.assign("/");
  };
  render() {
    return (
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm3 ms-xl3">
            <Contacts />
          </div>
          <div className="ms-Grid-col ms-sm9 ms-xl9">
            <div className="ms-Grid-row">
              <div
                className="main-element ms-Grid-col ms-sm11 ms-xl11"
                style={{ backgroundColor: "white" }}
              >
                Brief info about the user
              </div>
            </div>
            <div className="ms-Grid-row">
              <div
                className="main-element ms-Grid-col ms-sm11 ms-xl11"
                style={{ backgroundColor: "white", height: "100vh" }}
              >
                <form style={style.form}>
                  <div className="ms-Grid-col ms-sm9 ms-xl9">
                    <TextField
                      style={{ display: "inline", width: "70%" }}
                      type="text"
                      placeholder="Type your message"
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm2 ms-xl2">
                    <PrimaryButton
                      style={{ display: "inline", margin: 0, width: "20%" }}
                    >
                      Send
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inbox;

const style = {
  main: {
    position: "fixed",
    backgroundColor: "white",
    width: "auto",
    margin: "auto",
    fontWeight: 500,
    height: "100vh",
    float: "none",
  },
  form: {
    display: "inline-block",
    float: "none",
    bottom: 0,
    left: "25%",
    right: "-7%",
    margin: "auto",
    // width: "800",
    overflow: "hidden",
    zIndex: 10,
    position: "fixed",
  },
};
